import "./parserCode.css";
import { Editor } from "@monaco-editor/react";
import { parser } from "../../parsers/levelOrderTraversalParser/parser";
import { useTreeContext } from "../../context/TreeContext";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@shadcn/components/ui/tooltip";
import { Info } from "lucide-react";

type ParserCodeProps = {};

const ParserCode = ({}: ParserCodeProps) => {
  const { editorValue, setEditorValue, selectedParser } = useTreeContext();

  return (
    <div className="parserCodeContainer flex flex-col h-full px-[30px] pb-[30px]">
      <h3 className="flex items-center gap-2 font-medium py-4">
        Parser - {selectedParser.name}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info size={20} className="flex-shrink-0" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="whitespace-pre">{selectedParser.description}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </h3>

      <div className="border flex-1 overflow-hidden">
        <Editor
          value={editorValue}
          onChange={(val) => setEditorValue(val || "")}
          theme="dark"
          defaultLanguage="javascript"
          defaultValue={parser.toString()}
        />
      </div>
    </div>
  );
};

export default ParserCode;
