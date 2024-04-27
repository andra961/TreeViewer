import "./App.css";
import { TreeContextProvider } from "./context/TreeContext";

import { ReactFlowProvider } from "reactflow";
import TreeViewer from "@components/TreeViewer";
import ControlPanel from "@components/ControlPanel";

function App() {
  return (
    <TreeContextProvider>
      <div className="mainContainer">
        <ReactFlowProvider>
          <ControlPanel />
          <TreeViewer />
        </ReactFlowProvider>
      </div>
    </TreeContextProvider>
  );
}

export default App;
