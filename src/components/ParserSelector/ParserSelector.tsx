import "./parserSelector.css";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@shadcn/components/ui/select";

type ParserSelectorProps = {};

const ParserSelector = ({}: ParserSelectorProps) => {
  return (
    <div className="parserSelectorContainer">
      <Select value="default">
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a Parser" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Parsers</SelectLabel>
            <SelectItem value="default">Level Order Traversal</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ParserSelector;
