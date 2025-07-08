import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  List,
  ListOrdered,
  Redo,
  Save,
  Type,
  Underline,
  Undo,
} from "lucide-react";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import {
  setFontFamily,
  setFontSize,
  setTextColor,
} from "../reduxSlice/editorSlice";
import { ToolbarButton } from "./Toolbarbutton";
import type { AppState } from "@/store";

const ToolBar = () => {
  const { isConnected, fontSize, fontFamily, textColor } = useSelector(
    (state: AppState) => state.editorStore
  );

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = parseInt(e.target.value);
    setFontSize(newSize);
    executeCommand("fontSize", "7");
    document.execCommand("fontSize", false, "7");
    const fontElements = document.querySelectorAll('[size="7"]');
    fontElements.forEach((el) => {
      el.removeAttribute("size");
      // TODO: REMOVE any
      (el as any).style.fontSize = `${newSize}px`;
    });
  };

  const handleFontFamilyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFamily = e.target.value;
    setFontFamily(newFamily);
    executeCommand("fontName", newFamily);
  };

  const handleTextColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setTextColor(newColor);
    executeCommand("foreColor", newColor);
  };

  const saveDocument = () => {
    const content = document.getElementById("text-editor")?.innerHTML ?? "";
    const blob = new Blob([content], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "collaborative_document.html";
    a.click();
    URL.revokeObjectURL(url);
  };

  const executeCommand = useCallback(
    (command: string, value: string | undefined = undefined) => {
      document.execCommand(command, false, value);
    },
    [isConnected]
  );

  return (
    <div className="bg-gray-50 border-b border-gray-200 p-3">
      <div className="flex flex-wrap items-center space-x-1 mb-2">
        <ToolbarButton
          onClick={saveDocument}
          Icon={Save}
          title="Save Document"
        />
        <div className="w-px h-6 bg-gray-300 mx-2"></div>

        <ToolbarButton
          onClick={() => executeCommand("undo")}
          Icon={Undo}
          title="Undo (Ctrl+Z)"
          disabled={!isConnected}
        />
        <ToolbarButton
          onClick={() => executeCommand("redo")}
          Icon={Redo}
          title="Redo (Ctrl+Y)"
          disabled={!isConnected}
        />
        <div className="w-px h-6 bg-gray-300 mx-2"></div>

        <ToolbarButton
          onClick={() => executeCommand("bold")}
          Icon={Bold}
          title="Bold (Ctrl+B)"
          disabled={!isConnected}
        />
        <ToolbarButton
          onClick={() => executeCommand("italic")}
          Icon={Italic}
          title="Italic (Ctrl+I)"
          disabled={!isConnected}
        />
        <ToolbarButton
          onClick={() => executeCommand("underline")}
          Icon={Underline}
          title="Underline (Ctrl+U)"
          disabled={!isConnected}
        />
        <div className="w-px h-6 bg-gray-300 mx-2"></div>

        <ToolbarButton
          onClick={() => executeCommand("justifyLeft")}
          Icon={AlignLeft}
          title="Align Left"
          disabled={!isConnected}
        />
        <ToolbarButton
          onClick={() => executeCommand("justifyCenter")}
          Icon={AlignCenter}
          title="Align Center"
          disabled={!isConnected}
        />
        <ToolbarButton
          onClick={() => executeCommand("justifyRight")}
          Icon={AlignRight}
          title="Align Right"
          disabled={!isConnected}
        />
        <ToolbarButton
          onClick={() => executeCommand("justifyFull")}
          Icon={AlignJustify}
          title="Justify"
          disabled={!isConnected}
        />
        <div className="w-px h-6 bg-gray-300 mx-2"></div>

        <ToolbarButton
          onClick={() => executeCommand("insertUnorderedList")}
          Icon={List}
          title="Bullet List"
          disabled={!isConnected}
        />
        <ToolbarButton
          onClick={() => executeCommand("insertOrderedList")}
          Icon={ListOrdered}
          title="Numbered List"
          disabled={!isConnected}
        />
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Type size={16} className="text-gray-600" />
          <select
            value={fontFamily}
            onChange={handleFontFamilyChange}
            disabled={!isConnected}
            className="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            <option value="Arial">Arial</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Helvetica">Helvetica</option>
            <option value="Georgia">Georgia</option>
            <option value="Verdana">Verdana</option>
            <option value="Courier New">Courier New</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Size:</span>
          <input
            type="number"
            value={fontSize}
            onChange={handleFontSizeChange}
            disabled={!isConnected}
            min="8"
            max="72"
            className="w-16 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          />
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Color:</span>
          <input
            type="color"
            value={textColor}
            onChange={handleTextColorChange}
            disabled={!isConnected}
            className="w-8 h-8 border border-gray-300 rounded cursor-pointer disabled:opacity-50"
          />
        </div>
      </div>
    </div>
  );
};

export default ToolBar;
