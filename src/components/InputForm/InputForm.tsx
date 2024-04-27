import React, { useState } from "react";

import "./inputForm.css";
import { useTreeContext } from "../../context/TreeContext";
import { useReactFlow } from "reactflow";
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
import { ReactFlowAdapter } from "../../parsers/parserAdapter";

type InputFormProps = {};

const InputForm = ({}: InputFormProps) => {
  const { setNodes, setEdges, editorValue } = useTreeContext();
  const { fitView } = useReactFlow();
  const [value, setValue] = useState("");
  const [error, setError] = useState<Error | null>(null);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    try {
      // console.log(new Function("return " + editorValue));
      const parser = new Function("return " + editorValue);
      // console.log(parser()(value));
      const { nodes, edges } = ReactFlowAdapter.adapt(parser()(value));
      setNodes(nodes);
      setEdges(edges);
      setError(null);
      fitView();
    } catch (e) {
      if (e instanceof Error) setError(e);
    }
  };

  return (
    <form className="inputFormContainer grid w-full gap-2" onSubmit={onSubmit}>
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
              <p>Description</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <Textarea
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
