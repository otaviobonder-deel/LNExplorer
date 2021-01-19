export interface IProps {
  graph: IGraph;
}

interface IGraph {
  nodes: INodes[];
  links: ILinks[];
}

interface INodes {
  publicKey: string;
  alias: string;
  color: string;
}

interface ILinks {
  node1: string;
  node2: string;
  capacity: string;
}
