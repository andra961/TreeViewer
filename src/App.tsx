import "./App.css";
import { TreeContextProvider } from "./context/TreeContext";

import TreeViewer from "@components/TreeViewer";
import ControlPanel from "@components/ControlPanel";
import { customAdapter } from "@components/TreeViewer/ReactFlowAdapters/customAdapter";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@shadcn/components/ui/resizable";

function App() {
  return (
    <TreeContextProvider reactFlowAdapter={customAdapter}>
      <div className="w-[100vw] h-[100vh] p-[30px]">
        <ResizablePanelGroup
          className="w-[100vw] h-[100vh] border"
          direction="horizontal"
        >
          <ResizablePanel defaultSize={40} minSize={10}>
            <ControlPanel />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={60} minSize={10}>
            <TreeViewer />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </TreeContextProvider>
  );
}

export default App;
