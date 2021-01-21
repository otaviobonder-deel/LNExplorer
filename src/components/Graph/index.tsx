import React, { useRef, useState } from "react";
import ForceGraph, { ForceGraphMethods } from "react-force-graph-3d";
import { makeStyles, Paper, Typography } from "@material-ui/core";
import { IProps, INodes } from "./interfaces";

const useStyles = makeStyles({
  info: {
    position: "absolute",
    padding: 5,
  },
});

export const Graph: React.FC<IProps> = ({ graph, onNodeClick }) => {
  const classes = useStyles();
  const [info, setInfo] = useState<INodes | null>(null);
  const graphRef = useRef<ForceGraphMethods>();

  console.log(info);

  return (
    <>
      <ForceGraph
        ref={graphRef}
        graphData={graph}
        nodeId="publicKey"
        onNodeClick={onNodeClick}
        onNodeHover={(node: INodes | null) => setInfo(node)}
        onNodeDragEnd={(node) => {
          Object.assign(node, {
            fx: node.x,
            fy: node.y,
            fz: node.z,
          });
        }}
        linkSource="node1"
        linkTarget="node2"
        nodeResolution={8}
        cooldownTime={3000}
        rendererConfig={{
          powerPreference: "high-performance",
        }}
      />
      {info && graphRef.current && (
        <Paper
          className={classes.info}
          style={{
            top:
              graphRef.current.graph2ScreenCoords(
                info.x || 0,
                info.y || 0,
                info.z || 0
              ).y + 20,
            left: graphRef.current.graph2ScreenCoords(
              info.x || 0,
              info.y || 0,
              info.z || 0
            ).x,
          }}
        >
          <Typography>Pubkey: {info.publicKey}</Typography>
          <Typography>Alias: {info.alias}</Typography>
        </Paper>
      )}
    </>
  );
};
