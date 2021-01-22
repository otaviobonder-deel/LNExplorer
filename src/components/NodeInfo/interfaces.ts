import React from "react";
import { ForceGraphMethods, NodeObject } from "react-force-graph-3d";

export interface INodes extends NodeObject {
  publicKey?: string;
  alias?: string;
  color?: string;
  visible?: boolean;
}

export interface INodeInfoProps {
  graphRef: React.RefObject<ForceGraphMethods | undefined>;
  info: INodes | null;
}
