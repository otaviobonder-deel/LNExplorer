import React from "react";
import { makeStyles, Paper, Typography } from "@material-ui/core";
import { IChannelsProps, INodeInfoProps } from "./interfaces";

const useStyles = makeStyles({
  container: {
    position: "absolute",
    padding: 10,
    maxHeight: 600,
    width: 400,
    overflowWrap: "break-word",
    "& p": {
      fontSize: 12,
    },
  },
  channels: {
    display: "flex",
  },
  channelsComponent: {
    marginLeft: 5,
  },
});

const Channels: React.FC<IChannelsProps> = ({ info }) => {
  const classes = useStyles();

  return (
    <div className={classes.channelsComponent}>
      {info.links &&
        info.links.map((link) => (
          <Typography key={link.channelId}>
            {link.channelId} - capacity {link.capacity} sats
          </Typography>
        ))}
    </div>
  );
};

export const NodeInfo: React.FC<INodeInfoProps> = ({ graphRef, info }) => {
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

  if (info && graphRef.current) {
    return (
      <Paper
        className={classes.container}
        style={{
          top: getDivCoords().top,
          left: getDivCoords().left,
        }}
      >
        <Typography>Pubkey: {info.publicKey}</Typography>
        <Typography>Alias: {info.alias}</Typography>
        <div className={classes.channels}>
          <Typography>Channels:</Typography>
          <Channels info={info} />
        </div>
      </Paper>
    );
  }

  return null;
};
