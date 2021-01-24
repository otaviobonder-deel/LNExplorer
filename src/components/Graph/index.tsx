import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ForceGraph, { ForceGraphMethods } from "react-force-graph-3d";
import { Button, makeStyles } from "@material-ui/core";
import { NodeInfo } from "../NodeInfo";
import { IProps, INodes, IOptionsProps } from "./interfaces";

const useStyles = makeStyles({
  options: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    position: "absolute",
    top: 5,
    right: 20,
  },
  text: {
    color: "#fff",
  },
});

const Options: React.FC<IOptionsProps> = ({ graphRef }) => {
  const classes = useStyles();

  return (
    <div className={classes.options}>
      <Button color="secondary" onClick={() => graphRef.current?.zoomToFit()}>
        Reset zoom
      </Button>
    </div>
  );
};

export const Graph: React.FC<IProps> = ({ graph, onNodeClick }) => {
  const [hoverNode, setHoverNode] = useState<INodes | null>(null);
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const graphRef = useRef<ForceGraphMethods>();

  // adapt options on quantity of nodes
  const getPerformanceOptions = useCallback(() => {
    const graphSize = graph.nodes.length;
    if (graphSize > 2500) {
      return {
        coolDownTicks: 0,
        resolution: 4,
      };
    }
    if (graphSize > 1000) {
      return {
        coolDownTicks: 5,
        resolution: 6,
      };
    }
    return {
      coolDownTicks: 20,
      resolution: 8,
    };
  }, [graph.nodes.length]);

  // resize graph on window resize
  useEffect(() => {
    const windowResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", windowResize);

    return () => {
      window.removeEventListener("resize", windowResize);
    };
  }, []);

  return (
    <>
      {useMemo(
        () => (
          <ForceGraph
            ref={graphRef}
            graphData={graph}
            width={size.width}
            height={size.height}
            nodeId="publicKey"
            onNodeClick={onNodeClick}
            onNodeHover={(node) => setHoverNode(node)}
            nodeResolution={getPerformanceOptions().resolution}
            onNodeDragEnd={(node) => {
              Object.assign(node, {
                fx: node.x,
                fy: node.y,
                fz: node.z,
              });
            }}
            linkSource="node1"
            linkTarget="node2"
            cooldownTicks={getPerformanceOptions().coolDownTicks}
            warmupTicks={20}
            rendererConfig={{
              powerPreference: "high-performance",
            }}
          />
        ),
        [graph, onNodeClick, getPerformanceOptions, size]
      )}
      <Options graphRef={graphRef} />
      {hoverNode && graphRef.current && (
        <NodeInfo
          graph2ScreenCoords={graphRef.current.graph2ScreenCoords}
          info={hoverNode}
        />
      )}
    </>
  );
};
