/* eslint-disable react/jsx-props-no-spreading */

import React, { ChangeEvent, useRef, useState } from "react";
import ForceGraph, { ForceGraphMethods } from "react-force-graph-3d";
import {
  Checkbox,
  CheckboxProps,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";

import {
  IProps,
  INodes,
  IOptions,
  IOptionsProps,
  INodeInfoProps,
} from "./interfaces";

const useStyles = makeStyles({
  checkbox: {
    color: "#fff",
  },
  info: {
    position: "absolute",
    padding: 5,
  },
  innerOptionsDiv: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  options: {
    position: "absolute",
    top: 5,
    right: 20,
  },
  text: {
    color: "#fff",
  },
});

const StyledCheckbox: React.FC<CheckboxProps> = (props) => {
  const classes = useStyles();

  return <Checkbox classes={{ root: classes.checkbox }} {...props} />;
};

const Options: React.FC<IOptionsProps> = ({ options, setOptions }) => {
  const classes = useStyles();

  const handleOptionClick = (
    event: ChangeEvent<HTMLInputElement>,
    property: string
  ) => {
    setOptions({
      ...options,
      [property]: event.target.checked,
    });
  };

  return (
    <div className={classes.options}>
      <div className={classes.innerOptionsDiv}>
        <Typography className={classes.text}>
          Fit all nodes in screen
        </Typography>
        <StyledCheckbox
          checked={options.zoomToFit}
          onChange={(event) => handleOptionClick(event, "zoomToFit")}
        />
      </div>
    </div>
  );
};

const NodeInfo: React.FC<INodeInfoProps> = ({ graphRef, info }) => {
  const classes = useStyles();
  const { innerHeight: maxY, innerWidth: maxX } = window;

  const getDivCoords = () => {
    if (graphRef.current) {
      const nodeCoordinates = graphRef.current.graph2ScreenCoords(
        info?.x || 0,
        info?.y || 0,
        info?.z || 0
      );

      return {
        top: nodeCoordinates.y + 20,
        left: nodeCoordinates.x,
      };
    }
    return { top: 0, left: 0 };
  };

  console.log(maxY, maxX);

  if (info && graphRef.current) {
    return (
      <Paper
        className={classes.info}
        style={{
          top: getDivCoords().top,
          left: getDivCoords().left,
        }}
      >
        <Typography>Pubkey: {info.publicKey}</Typography>
        <Typography>Alias: {info.alias}</Typography>
      </Paper>
    );
  }

  return null;
};

export const Graph: React.FC<IProps> = ({ graph, onNodeClick }) => {
  const [info, setInfo] = useState<INodes | null>(null);
  const [options, setOptions] = useState<IOptions>({
    zoomToFit: true,
  });
  const graphRef = useRef<ForceGraphMethods>();

  const getPerformanceOptions = () => {
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
  };

  return (
    <>
      <ForceGraph
        ref={graphRef}
        graphData={graph}
        nodeId="publicKey"
        onNodeClick={onNodeClick}
        onNodeHover={(node: INodes | null) => setInfo(node)}
        onNodeDragEnd={(node) => {
          Object.assign(node, {
            fx: node.x,
            fy: node.y,
            fz: node.z,
          });
        }}
        linkSource="node1"
        linkTarget="node2"
        nodeResolution={getPerformanceOptions().resolution}
        cooldownTicks={getPerformanceOptions().coolDownTicks}
        warmupTicks={20}
        rendererConfig={{
          powerPreference: "high-performance",
        }}
        onEngineStop={() => {
          if (options.zoomToFit) {
            graphRef.current?.zoomToFit(300);
          }
        }}
      />
      <Options options={options} setOptions={setOptions} />
      <NodeInfo graphRef={graphRef} info={info} />
    </>
  );
};
