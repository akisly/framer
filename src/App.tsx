import { framer, CanvasNode, isTextNode } from "framer-plugin";
import { useState, useEffect } from "react";
import { TextStyleControls } from "./components/TextStyleControls.tsx";
import "./App.css";

framer.showUI({
  position: "top right",
  width: 300,
  resizable: "height",
});

function useSelection() {
  const [selection, setSelection] = useState<CanvasNode[]>([]);
  
  useEffect(() => {
    return framer.subscribeToSelection(setSelection);
  }, []);
  
  return selection;
}

export function App() {
  const selection = useSelection();
  const [color, setColor] = useState<string | undefined>(undefined);
  const [highlightStyle, setHighlightStyle] = useState<"highlight" | "underline">("highlight")

  const handleApplyUnderline = async () => {
    if (selection.length === 0) {
      console.warn("No layers selected to apply underline.");
      return;
    }

    for (const node of selection) {
      if (isTextNode(node)) {
        try {
          if (highlightStyle === "highlight") {
            const parent = await node.getParent();
            
            if (parent) {
              const newNode = await framer.createFrameNode({
                backgroundColor: color,
                width: '1000px',
                height: '150px',
                maxWidth: node.maxWidth,
              }, parent.id);
              if (newNode) {
                await framer.setParent(node.id, newNode.id);
                await framer.setParent(newNode.id, parent.id);
              }
            }
          } else {
            await node.inlineTextStyle?.setAttributes({
              decoration: "underline",
              color: color,
            })
          }
          console.log("Underline applied to:", node);
        } catch (error) {
          console.error("Failed to apply underline to:", node, error);
        }
      } else {
        console.warn("Skipping non-text node:", node);
      }
    }
  };
  
  return (
    <main className="plugin-container">
      <TextStyleControls
        highlightStyle={highlightStyle}
        color={color}
        onStyleChange={setHighlightStyle}
        onColorChange={setColor}
        onApply={handleApplyUnderline}
      />
    </main>
  );
}
