import  { useState, useRef, useEffect, useCallback } from "react";
import ForceGraph2D from "react-force-graph-2d"; // Correct import

const NetworkChart = () => {
    const graphRef = useRef(null);
    const [selectedNode, setSelectedNode] = useState(null);

    // Sample Data: Nodes & Links
    const data = {
        nodes: [
            { id: "1", name: "Node 1", details: "This is node 1" },
            { id: "2", name: "Node 2", details: "This is node 2" },
            { id: "3", name: "Node 3", details: "This is node 3" },
            { id: "4", name: "Node 4", details: "This is node 4" }
        ],
        links: [
            { source: "1", target: "2" },
            { source: "2", target: "3" },
            { source: "3", target: "4" },
            { source: "4", target: "1" }
        ]
    };

    useEffect(() => {
        if (graphRef.current) {
            graphRef.current.d3Force("charge").strength(-300);
        }
    }, []);

    const NODE_R = 8;

    
      const [highlightNodes, setHighlightNodes] = useState(new Set());
      const [highlightLinks, setHighlightLinks] = useState(new Set());
      const [hoverNode, setHoverNode] = useState(null);

      const updateHighlight = () => {
        setHighlightNodes(highlightNodes);
        setHighlightLinks(highlightLinks);
      };

      const handleNodeHover = node => {
        highlightNodes.clear();
        highlightLinks.clear();
        if (node) {
          highlightNodes.add(node);
          node.neighbors.forEach(neighbor => highlightNodes.add(neighbor));
          node.links.forEach(link => highlightLinks.add(link));
        }

        setHoverNode(node || null);
        updateHighlight();
      };

      const handleLinkHover = link => {
        highlightNodes.clear();
        highlightLinks.clear();

        if (link) {
          highlightLinks.add(link);
          highlightNodes.add(link.source);
          highlightNodes.add(link.target);
        }

        updateHighlight();
      };

      const paintRing = useCallback((node, ctx) => {
        // add ring just for highlighted nodes
        ctx.beginPath();
        ctx.arc(node.x, node.y, NODE_R * 1.4, 0, 2 * Math.PI, false);
        ctx.fillStyle = node === hoverNode ? 'red' : 'orange';
        ctx.fill();
      }, [hoverNode]);

    return (
        <div style={{ position: "relative", width: "100%", height: "300px" }}>
            {/* Network Graph */}
           {/* <ForceGraph2D
                graphData={data}
                nodeRelSize={NODE_R}
                autoPauseRedraw={false}
                linkWidth={link => highlightLinks.has(link) ? 5 : 1}
                linkDirectionalParticles={4}
                linkDirectionalParticleWidth={link => highlightLinks.has(link) ? 4 : 0}
                nodeCanvasObjectMode={node => highlightNodes.has(node) ? 'before' : undefined}
                nodeCanvasObject={paintRing}
                onNodeHover={handleNodeHover}
                onLinkHover={handleLinkHover}
            /> */}
      
      <ForceGraph2D
                ref={graphRef}
                graphData={data}
         //       nodeAutoColorBy="id"
                linkDirectionalArrowLength={6}
                onNodeClick={(node) => setSelectedNode(node)}
                nodeCanvasObject={(node, ctx, globalScale) => {
                    const label = node.name;
                    const fontSize = 12 / globalScale;
                    ctx.font = `${fontSize}px Arial`;
                    ctx.fillStyle = "black";
                    ctx.textAlign = "center";
                    ctx.beginPath();
                    ctx.fillText(label, node.x, node.y - 10);
                }}
            />

            {/* Node Info Card */}
            {selectedNode ? (
                <div
                    style={{
                        position: "absolute",
                        top: 20,
                        right: 20,
                        padding: "10px",
                        background: "white",
                        boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                        borderRadius: "5px",
                        zIndex: 10
                    }}
                >
                    <h3>{selectedNode.name}</h3>
                    <p>{selectedNode.details}</p>
                    <button onClick={() => setSelectedNode(null)}>Close</button>
                </div>
            ) : null}
        </div>
    );
};

export default NetworkChart;
