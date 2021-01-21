import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button, makeStyles, Typography } from "@material-ui/core";
import lightningGraph from "../../assets/lightning_graph.json";
import {
  IAdjacencyList,
  IEdgesFunc,
  IGraph,
  IGraphFunc,
  INodesFunc,
} from "./interfaces";
import { Graph } from "../../components/Graph";

/*
Importing directly from file. Usually this would be an API call.
Also, I decided to remove some unnecessary info from the graph file,
since I only need some attributes. I chose to save the result of the
map function in an useMemo hook, so the function is only executed once,
even if the component remounts. Since the visualization of all nodes was
a bit laggy, I decided to create an adjacency list, so I can control how
many channels each node has, and then display only nodes with x or more
channels. I created a function to show more nodes, so whenever you clicks
a node and it has more channels, its node's and channels are displayed
*/

const adjacencyList: IAdjacencyList = {};

const leanLightningGraph = () => {
  const nodes: INodesFunc[] = (lightningGraph as IGraph).nodes.map((node) => {
    adjacencyList[node.pub_key] = [];
    return {
      publicKey: node.pub_key,
      alias: node.alias || node.pub_key,
      color: node.color === "#000000" ? "#808080" : node.color,
      visible: false,
    };
  });

  const links: IEdgesFunc[] = (lightningGraph as IGraph).edges.map((edge) => {
    const {
      node1_pub: node1,
      node2_pub: node2,
      channel_id: channelId,
      capacity,
    } = edge;
    const color = ["red", "white", "blue", "green"][
      Math.round(Math.random() * 3)
    ];
    const edgeNode = {
      channelId,
      node1,
      node2,
      capacity,
      color,
    };
    adjacencyList[edge.node1_pub].push(edgeNode);
    adjacencyList[edge.node2_pub].push(edgeNode);
    return edgeNode;
  });

  return { nodes, links };
};

// add property visible to nodes with min number of channels
const showNodes = (nodes: INodesFunc[], edges: number) =>
  nodes.map((node) => ({
    ...node,
    visible: adjacencyList[node.publicKey].length >= edges,
  }));

// styles
const useStyles = makeStyles({
  buttons: {
    margin: "5px 0",
  },
  loaderContainer: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  info: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    bottom: "10%",
    left: 15,
  },
  text: {
    color: "white",
  },
});

export const GraphPage: React.FC = () => {
  const classes = useStyles();

  // minimum amount of channels to show on graph
  const [minEdges, setMinEdges] = useState(30);

  // graph state
  const [prunedTree, setPrunedTree] = useState<IGraphFunc | undefined>();

  const graph = useMemo(() => {
    const { nodes, links } = leanLightningGraph();
    const visibleNodes = showNodes(nodes, minEdges);
    return { nodes: visibleNodes, links };
  }, [minEdges]);

  // create a dic of nodes to faster access
  const nodesById = useMemo(
    () => Object.fromEntries(graph.nodes.map((node) => [node.publicKey, node])),
    [graph]
  );

  // function to return the nodes and channels
  const getPrunedTree = useCallback(() => {
    const visibleLinks: IEdgesFunc[] = [];
    const visibleNodes: INodesFunc[] = [];
    graph.nodes.forEach((node) => {
      if (node.visible) {
        Object.assign(node, { links: adjacencyList[node.publicKey] });
        visibleNodes.push(node);
      }
    });
    graph.links.forEach((link) => {
      if (nodesById[link.node1].visible && nodesById[link.node2].visible) {
        visibleLinks.push(link);
      }
    });
    return { nodes: visibleNodes, links: visibleLinks };
  }, [nodesById, graph]);

  // update state when changing pruned tree
  useEffect(() => {
    setPrunedTree(getPrunedTree());
  }, [getPrunedTree]);

  // show node channels with smaller nodes
  const handleNodeClick = useCallback((node: INodesFunc) => {
    if (adjacencyList[node.publicKey].length <= 1) {
      nodesById[node.publicKey].visible = false;
      setPrunedTree(getPrunedTree());
      return;
    }
    adjacencyList[node.publicKey].forEach((nodeId) => {
      nodesById[nodeId.node1].visible = true;
      nodesById[nodeId.node2].visible = true;
    });
    setPrunedTree(getPrunedTree());
    // eslint-disable-next-line
  }, []);

  // show all nodes/channels or return to default
  const handleButtonClick = () => {
    if (minEdges === 0) {
      setMinEdges(30);
      return;
    }
    setMinEdges(0);
  };

  // while graph is loading
  if (!prunedTree) {
    return (
      <div className={classes.loaderContainer}>
        <Typography align="center">Loading</Typography>
      </div>
    );
  }

  return (
    <>
      <Graph
        graph={prunedTree}
        onNodeClick={(node: any) => handleNodeClick(node)}
      />
      <div className={classes.info}>
        <Typography className={classes.text} gutterBottom>
          Rendering {prunedTree.nodes.length} nodes and{" "}
          {prunedTree.links.length} channels
        </Typography>
        <Typography className={classes.text} gutterBottom>
          Click on a node to expand channels to smaller nodes
        </Typography>
        <Typography className={classes.text} gutterBottom>
          Hover on a node to get more info
        </Typography>
        {minEdges === 0 ? (
          <Typography className={classes.text} gutterBottom>
            Showing all nodes and channels
          </Typography>
        ) : (
          <Typography className={classes.text} gutterBottom>
            Initially showing nodes with {minEdges} or more channels
          </Typography>
        )}
        <Button
          className={classes.buttons}
          color="secondary"
          variant="outlined"
          disabled={minEdges === 0}
          onClick={() =>
            setMinEdges((prevEdges) => (prevEdges - 5 < 0 ? 0 : prevEdges - 5))
          }
        >
          Show more nodes
        </Button>
        <Button
          className={classes.buttons}
          color="secondary"
          variant="outlined"
          onClick={() => setMinEdges((prevEdges) => prevEdges + 5)}
        >
          Show less nodes
        </Button>
        <Button
          className={classes.buttons}
          color="secondary"
          variant="outlined"
          onClick={handleButtonClick}
        >
          {minEdges === 0
            ? "Show only nodes with 30 or more channels"
            : "Show all nodes and channels"}
        </Button>
      </div>
    </>
  );
};
