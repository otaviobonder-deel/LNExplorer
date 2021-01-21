# Lightning Network Explorer

All project was created in ReactJS using TypeScript

## How to run it?

1. To run the project, clone it from Github, then enter the directory and build the docker image:

```
docker build -t LNExplorer .
```

**Important: Docker must have at least 2GB ram to run the container, otherwise it will fail with a memory heap error. This is because React will build the project, and it needs 2GB or more of ram.**

2. After building the image, run the container. You need to bind a port to the container. Internally the port 80 is exposed because the container uses NGINX, but you need to bind some port of the host to the port 80 of the container:

```
docker run -d -p 3000:80 LNExplorer
```

3. Enter `localhost:3000` in your browser. The `-p 3000:80` command binds the port 3000 of the host to the port 80 of the container. If port 3000 is already in use in your computer, change the port in the command to any available port, keeping the `:80` part of the command, then in the browser enter `localhost:<theportyouchose>`

## What does it do?
This LN explorer was built with performance first, so it won't load all nodes initially. Loading a graph with more than 6,000 nodes and 30,000 channels is very CPU intensive, and the browser doesn't handle it very well. The explorer is configured to load only nodes with 30 or more open channels.

It's possible to show all nodes and channels in the graph, just click the button to show all nodes and channels. The graph will reload showing every node and channel from the snapshot file. It can take some seconds to show the entire graph.

Clicking in a node will show all others nodes connected to it. If the node has only one channel (is a leaf), then it will be hidden from the chart.

Hovering a node will show more info about it.