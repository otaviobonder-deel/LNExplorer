import React, { useCallback, useMemo, useState } from "react";
import lightningGraph from "../../assets/lightning_graph.json";
import { IAdjacencyList, IEdgesFunc, IGraph, INodesFunc } from "./interfaces";
import { Graph } from "../../components/Graph";

/*
Importing directly from file. Usually this would be an API call.
Also, I decided to remove some unnecessary info from the graph file,
since I only need some attributes. I chose to save the result of the
map function in an useMemo hook, so the function is only executed once,
even if the component remounts. Since the visualization of all nodes was
a bit laggy, I decided to create an adjacency list, so I can control how
many channels each node has, and then display only nodes with x or more
channels
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
    adjacencyList[edge.node1_pub].push(edge.node2_pub);
    adjacencyList[edge.node2_pub].push(edge.node1_pub);
    return {
      channelId: edge.channel_id,
      node1: edge.node1_pub,
      node2: edge.node2_pub,
      capacity: edge.capacity,
      color: ["red", "white", "blue", "green"][Math.round(Math.random() * 3)],
    };
  });

  return { nodes, links };
};

const showNodes = (nodes: INodesFunc[], edges: number) =>
  nodes.map((node) => ({
    ...node,
    visible: adjacencyList[node.publicKey].length >= edges,
  }));

export const GraphPage: React.FC = () => {
  const [minEdges, setMinEdges] = useState(60);

  const graph = useMemo(() => {
    const { nodes, links } = leanLightningGraph();
    const visibleNodes = showNodes(nodes, minEdges);
    return { nodes: visibleNodes, links };
  }, [minEdges]);

  const nodesById = useMemo(
    () => Object.fromEntries(graph.nodes.map((node) => [node.publicKey, node])),
    [graph]
  );

  const getPrunedTree = useCallback(() => {
    const visibleLinks: IEdgesFunc[] = [];
    const visibleNodes = graph.nodes.filter((node) => node.visible);
    graph.links.forEach((link) => {
      if (nodesById[link.node1].visible && nodesById[link.node2].visible) {
        visibleLinks.push(link);
      }
    });
    return { nodes: visibleNodes, links: visibleLinks };
  }, [nodesById, graph]);

  const [prunedTree, setPrunedTree] = useState(getPrunedTree());

  const handleNodeClick = useCallback((node: INodesFunc) => {
    if (adjacencyList[node.publicKey].length <= 1) {
      node.visible = false; // eslint-disable-line no-param-reassign
      setPrunedTree(getPrunedTree());
      return;
    }
    adjacencyList[node.publicKey].forEach((nodeId) => {
      nodesById[nodeId].visible = true;
    });
    setPrunedTree(getPrunedTree());
  }, []);

  return (
    <Graph
      graph={prunedTree}
      onNodeClick={(node: any) => handleNodeClick(node)}
    />
  );
};
