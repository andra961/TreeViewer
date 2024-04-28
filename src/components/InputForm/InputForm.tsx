import React, { useState } from "react";

import "./inputForm.css";
import { DEFAULT_INPUT, useTreeContext } from "../../context/TreeContext";
import { Textarea } from "@shadcn/components/ui/textarea";
import { Button } from "@shadcn/components/ui/button";
import { AlertCircle } from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@shadcn/components/ui/alert";
import { Label } from "@shadcn/components/ui/label";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@shadcn/components/ui/tooltip";
import { parseParserCode } from "../../parsers/parserApi";

type InputFormProps = {};

const InputForm = ({}: InputFormProps) => {
  const { setTreeData, editorValue, selectedParser } = useTreeContext();
  const [value, setValue] = useState(DEFAULT_INPUT);
  const [error, setError] = useState<Error | null>(null);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    try {
      const parsed = parseParserCode(editorValue)(value);
      setTreeData(parsed);
      setError(null);
    } catch (e) {
      if (e instanceof Error) setError(e);
    }
  };

  return (
    <form
      className="inputFormContainer flex flex-col w-full h-full gap-2 p-[30px]"
      onSubmit={onSubmit}
    >
      <div className="flex items-center gap-2">
        <Label htmlFor="input" className="w-auto">
          Input
        </Label>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info size={20} />
            </TooltipTrigger>
            <TooltipContent>
              <p className="whitespace-pre">
                {selectedParser.inputDescription}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <Textarea
        placeholder={`Insert your input which represents a tree (ex: ${DEFAULT_INPUT})`}
        className="flex-1 min-h-0"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        id="input"
      />
      <Button>confirm</Button>
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      )}
    </form>
  );
};

export default InputForm;
