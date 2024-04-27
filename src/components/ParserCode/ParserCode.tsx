import "./parserCode.css";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@shadcn/components/ui/accordion";
import { Editor } from "@monaco-editor/react";
import { parser } from "../../parsers/parser";
import { useTreeContext } from "../../context/TreeContext";

type ParserCodeProps = {};

const ParserCode = ({}: ParserCodeProps) => {
  const { editorValue, setEditorValue, selectedParser } = useTreeContext();

  return (
    <div className="parserCodeContainer">
      <Accordion type="single" collapsible className="w-full flex-1">
        <AccordionItem value="item-1">
          <AccordionTrigger>Parser - {selectedParser.name}</AccordionTrigger>
          <AccordionContent className="pb-0">
            <div className="pt-4 border-x-[1px] border-t-[1px] ">
              <div style={{ height: "500px" }}>
                <Editor
                  value={editorValue}
                  onChange={(val) => setEditorValue(val || "")}
                  theme="dark"
                  defaultLanguage="javascript"
                  defaultValue={parser.toString()}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ParserCode;
