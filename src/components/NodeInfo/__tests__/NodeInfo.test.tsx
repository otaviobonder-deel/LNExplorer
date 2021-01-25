import React from "react";
import renderer from "react-test-renderer";
import { NodeInfo } from "../index";

/*
Usually a server mock would run here to gather a mocked graph
response from the api. But since I'm getting the info from
a static JSON file, there's no sense in testing it
*/

it("should render a test node info", () => {
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
