import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface CustomSelectProps {
  data: string[];
  selectedValue: string;
  setSelectedValue: (value: string) => void;
}

export function TodoSelect({
  data,
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
        {data.map((option) => (
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
