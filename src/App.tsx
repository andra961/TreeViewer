import "./App.css";
import { TreeContextProvider } from "./context/TreeContext";
import TreeViewer from "./components/TreeViewer";
import InputForm from "./components/InputForm";
import { ReactFlowProvider } from "reactflow";

function App() {
  return (
    <TreeContextProvider>
      <div className="mainContainer">
        <ReactFlowProvider>
          <InputForm />
          <TreeViewer />
        </ReactFlowProvider>
      </div>
    </TreeContextProvider>
  );
}

export default App;
