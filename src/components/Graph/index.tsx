import React from "react";
import ForceGraph from "react-force-graph-3d";
import { IProps } from "./interfaces";

export const Graph: React.FC<IProps> = ({ graph, onNodeClick }) => (
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
);
