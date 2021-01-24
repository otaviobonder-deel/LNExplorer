import { NodeObject } from "react-force-graph-3d";

interface ILinks {
  channelId: string;
  node1: string;
  node2: string;
  capacity: string;
  color: string;
}

export interface INodes extends NodeObject {
  publicKey?: string;
  alias?: string;
  color?: string;
  visible?: boolean;
  links?: ILinks[];
}

export interface INodeInfoProps {
  graph2ScreenCoords(
    x: number,
    y: number,
    z: number
  ): { x: number; y: number; z: number };
  info: INodes | null;
}
