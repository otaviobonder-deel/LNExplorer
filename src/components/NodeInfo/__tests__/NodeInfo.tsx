import React from "react";
import renderer from "react-test-renderer";
import { NodeInfo } from "../index";

it("should render each node info", () => {
  const info = {
    publicKey: "test123",
    alias: "test",
    color: "#fff",
    visible: true,
    links: [
      {
        channelId: "123",
        node1: "test123",
        node2: "test345",
        capacity: "10000",
        color: "#fff",
      },
    ],
  };
  const graph2ScreenCoords = () => ({ x: 0, y: 0, z: 0 });
  const tree = renderer
    .create(<NodeInfo graph2ScreenCoords={graph2ScreenCoords} info={info} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
