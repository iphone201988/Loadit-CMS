import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "@/components/ui/input";

const InputField = ({
  name,
  label,
  placeholder,
  type = "text",
  value,
  handleChange,
  readOnly = false,
}: {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  value?: string;
  handleChange?: any;
  readOnly?: boolean;
}) => {
  return (
    <>
      {/* <FormLabel>{label}</FormLabel> */}
      <label htmlFor={name}>{label}</label>
      <Input
        placeholder={placeholder}
        type={type}
        name={name}
        className="block"
        {...(value && { value })}
        {...(handleChange && { onChange: handleChange })}
        readOnly={readOnly}
      />
    </>
  );
};

export default InputField;
