import "./App.css";
import { TreeContextProvider } from "./context/TreeContext";

import { ReactFlowProvider } from "reactflow";
import TreeViewer from "@components/TreeViewer";
import ControlPanel from "@components/ControlPanel";
import { customAdapter } from "@components/TreeViewer/ReactFlowAdapters/customAdapter";

function App() {
  return (
    <TreeContextProvider reactFlowAdapter={customAdapter}>
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
