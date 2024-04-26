import React, { useState } from "react";

import "./inputForm.css";
import { defaultParser } from "../../parsers/defaultParser";
import { useTreeContext } from "../../context/TreeContext";
import { useReactFlow } from "reactflow";

type InputFormProps = {};

const InputForm = ({}: InputFormProps) => {
  const { setNodes, setEdges } = useTreeContext();
  const { fitView } = useReactFlow();
  const [value, setValue] = useState("");
  const [error, setError] = useState<Error | null>(null);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    try {
      const { nodes, edges } = defaultParser(value);
      console.log(nodes, edges);
      setNodes(nodes);
      setEdges(edges);
      setError(null);
      fitView();
    } catch (e) {
      if (e instanceof Error) setError(e);
    }
  };

  return (
    <form className="inputFormContainer" onSubmit={onSubmit}>
      <textarea value={value} onChange={(e) => setValue(e.target.value)} />
      <button>confirm</button>
      {error && <div>{error?.message}</div>}
    </form>
  );
};

export default InputForm;
