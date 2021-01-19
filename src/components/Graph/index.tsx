import React from "react";
import ForceGraph from "react-force-graph-3d";
import { IProps } from "./interfaces";

export const Graph: React.FC<IProps> = ({ graph }) => (
  <ForceGraph
    graphData={graph}
    nodeId="publicKey"
    linkSource="node1"
    linkTarget="node2"
  />
);
