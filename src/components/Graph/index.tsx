import React from "react";
import ForceGraph from "react-force-graph-3d";
import { makeStyles, Typography } from "@material-ui/core";
import { IProps } from "./interfaces";

const useStyles = makeStyles({
  info: {
    position: "absolute",
    bottom: 25,
    left: "50%",
    transform: "translate(-50%)",
  },
  text: {
    color: "#fff",
  },
});

export const Graph: React.FC<IProps> = ({ graph, onNodeClick }) => {
  const classes = useStyles();

  return (
    <>
      <ForceGraph
        graphData={graph}
        nodeId="publicKey"
        onNodeClick={onNodeClick}
        linkSource="node1"
        linkTarget="node2"
        nodeResolution={8}
        cooldownTime={3000}
        rendererConfig={{
          powerPreference: "high-performance",
        }}
        enableNodeDrag={false}
      />
      <div className={classes.info}>
        <Typography className={classes.text}>
          Rendering {graph.nodes.length} nodes and {graph.links.length} channels
        </Typography>
      </div>
    </>
  );
};
