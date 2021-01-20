/* eslint-disable camelcase */

export interface IGraph {
  nodes: INodesFile[];
  edges: IEdgesFile[];
}

export interface INodesFile {
  last_update: number;
  pub_key: string;
  alias?: string;
  addresses?: IAddressesEntity[] | null;
  color: string;
  features: IFeatures;
}
interface IAddressesEntity {
  network: string;
  addr: string;
}
interface IFeatures {
  [key: string]: IFeature;
}
interface IFeature {
  name: string;
  is_required: boolean;
  is_known: boolean;
}

export interface IEdgesFile {
  channel_id: string;
  chan_point: string;
  last_update: number;
  node1_pub: string;
  node2_pub: string;
  capacity: string;
  node1_policy: INodePolicy;
  node2_policy: INodePolicy;
}
interface INodePolicy {
  time_lock_delta: number;
  min_htlc: string;
  fee_base_msat: string;
  fee_rate_milli_msat: string;
  disabled: boolean;
  max_htlc_msat: string;
  last_update: number;
}

export interface IAdjacencyList {
  [key: string]: string[];
}

export interface INodesFunc {
  publicKey: string;
  alias: string;
  color: string;
  visible: boolean;
}

export interface IEdgesFunc {
  channelId: string;
  node1: string;
  node2: string;
  capacity: string;
  color: string;
}
