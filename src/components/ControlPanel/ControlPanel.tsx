import "./controlPanel.css";
import InputForm from "@components/InputForm";
import ParserCode from "@components/ParserCode";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@shadcn/components/ui/resizable";

type ControlPanelProps = {};

const ControlPanel = ({}: ControlPanelProps) => {
  return (
    <ResizablePanelGroup className="w-[100vw] h-[100vh]" direction="vertical">
      <ResizablePanel defaultSize={30} minSize={20}>
        <InputForm />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={70} minSize={40}>
        <ParserCode />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default ControlPanel;
