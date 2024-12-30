interface TextHighlightControlsProps {
  color?: string
  highlightStyle: "highlight" | "underline"
  onColorChange: (color: string) => void
  onStyleChange: (style: "highlight" | "underline") => void
  onApply: () => void
}

export function TextStyleControls({
  color,
  highlightStyle,
  onColorChange,
  onStyleChange,
  onApply,
}: TextHighlightControlsProps) {
  return (
    <div className="controls">
      <div className="control-group">
        <label>Style</label>
        <select
          value={highlightStyle}
          onChange={(e) => onStyleChange(e.target.value as "highlight" | "underline")}
        >
          <option value="highlight">Highlight</option>
          <option value="underline">Underline</option>
        </select>
      </div>

      <div className="control-group">
        <label>Color</label>
        <input
          type="color"
          value={color}
          onChange={(e) => onColorChange(e.target.value)}
        />
      </div>
      
      <button className="framer-button-primary" onClick={onApply}>
        Apply Highlight
      </button>
    </div>
  )
}
