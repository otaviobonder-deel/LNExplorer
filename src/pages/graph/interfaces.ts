/* eslint-disable camelcase */

export interface IGraph {
  nodes: INodes[];
  edges: IEdges[];
}

export interface INodes {
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

export interface IEdges {
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
