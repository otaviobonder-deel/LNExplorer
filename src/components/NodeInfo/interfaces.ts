import React from "react";
import { ForceGraphMethods, NodeObject } from "react-force-graph-3d";

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
  graphRef: React.RefObject<ForceGraphMethods | undefined>;
  info: INodes | null;
}

export interface IChannelsProps {
  info: INodes;
}
