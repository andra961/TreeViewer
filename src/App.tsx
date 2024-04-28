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
import { GithubIcon, TreeDeciduous } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@shadcn/components/ui/tooltip";

function App() {
  return (
    <TreeContextProvider reactFlowAdapter={customAdapter}>
      <div className="w-[100vw] h-[100vh] p-[30px] flex flex-col">
        <header className="flex px-4 gap-2 items-center h-[40px] border-x-[1px] border-t-[1px]">
          <TreeDeciduous />
          <h1 className="font-medium">Tree Viewer</h1>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  className="ml-auto cursor-pointer"
                  href="https://github.com/andra961/TreeViewer"
                >
                  <GithubIcon />
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p className="whitespace-pre">View source on Github</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </header>
        <ResizablePanelGroup className="flex-1 border" direction="horizontal">
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
