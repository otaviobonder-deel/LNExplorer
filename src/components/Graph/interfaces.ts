import React from "react";
import { ForceGraphMethods, NodeObject } from "react-force-graph-3d";

export interface IProps {
  graph: IGraph;
  onNodeClick?: (node: NodeObject, mouse: MouseEvent) => void;
}

interface IGraph {
  nodes: INodes[];
  links: ILinks[];
}

export interface INodes extends NodeObject {
  publicKey?: string;
  alias?: string;
  color?: string;
  visible?: boolean;
  links?: ILinks[];
}

interface ILinks {
  channelId: string;
  node1: string;
  node2: string;
  capacity: string;
  color: string;
}

export interface IOptionsProps {
  graphRef: React.RefObject<ForceGraphMethods | undefined>;
}
