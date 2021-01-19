import React, { useMemo } from "react";
import lightningGraph from "../../assets/lightning_graph.json";
import { IGraph } from "./interfaces";
import { Graph } from "../../components/Graph";

// Importing directly from file. Usually this would be an API call
const leanLightningGraph = () => {
  const nodes = (lightningGraph as IGraph).nodes.map((node) => ({
    publicKey: node.pub_key,
    alias: node.alias || node.pub_key,
    color: node.color,
  }));

  const links = (lightningGraph as IGraph).edges.map((edge) => ({
    node1: edge.node1_pub,
    node2: edge.node2_pub,
    capacity: edge.capacity,
  }));

  return { nodes, links };
};

export const GraphPage: React.FC = () => {
  const graph = useMemo(() => leanLightningGraph(), []);

  return <Graph graph={graph} />;
};
