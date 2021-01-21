import { NodeObject } from "react-force-graph-3d";

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
}

interface ILinks {
  channelId: string;
  node1: string;
  node2: string;
  capacity: string;
  color: string;
}
