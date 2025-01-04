import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface CustomSelectProps {
  selectedValue: string;
  setSelectedValue: (value: string) => void;
}

const priorities = ["low", "medium", "high"];

export function TodoSelect({
  selectedValue,
  setSelectedValue,
}: CustomSelectProps) {
  return (
    <Select
      defaultValue={selectedValue}
      onValueChange={(value) => {
        setSelectedValue(value);
      }}
    >
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {priorities.map((option) => (
          <SelectItem className="capitalize" key={option} value={option}>
            <span
              className={`inline-block size-3 rounded-full mr-2 ${
                option === "low"
                  ? "bg-green-500"
                  : option === "medium"
                  ? "bg-yellow-500"
                  : option === "high"
                  ? "bg-red-500"
                  : ""
              }`}
            />
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
