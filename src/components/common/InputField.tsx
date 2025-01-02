import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import ErrorHoverCard from "./ErrorHoverCard";

type InputFieldType = {
  label: string;
  type: "text" | "email" | "password";
  id?: string;
  placeholder?: string;
  className?: string;
};

const InputField = ({
  label,
  type,
  id = "",
  placeholder = "",
  className = "",
}: InputFieldType) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const errorMsg = id && errors[id]?.message;

  return (
    <div className={`relative grid gap-2 ${className}`}>
      <Label htmlFor={id}>{label}</Label>
      <Input
        {...register(id)}
        id={id}
        type={type}
        required
        placeholder={placeholder}
      />
      {errors[id] && <ErrorHoverCard message={errorMsg as string} />}
    </div>
  );
};

export default InputField;
