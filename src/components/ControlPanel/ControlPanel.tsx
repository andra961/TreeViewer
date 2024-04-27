import "./controlPanel.css";
import InputForm from "@components/InputForm";
import ParserSelector from "@components/ParserSelector";
import ParserCode from "@components/ParserCode";

type ControlPanelProps = {};

const ControlPanel = ({}: ControlPanelProps) => {
  return (
    <div className="controlPanelContainer flex flex-col gap-4">
      <InputForm />
      <ParserSelector />
      <ParserCode />
    </div>
  );
};

export default ControlPanel;
