import { ucFirst } from "@/util/text";
import { TextFieldProps } from "@shared";

export default function TextField<T extends Record<string, any>>({
  data,
  name,
  updateField,
}: TextFieldProps<T>) {
  return (
    <div className="col">
      <h4>{ucFirst(name)}</h4>
      <input
        onChange={(e) => {
          updateField(name, e.target.value);
        }}
        type="text"
        value={data[name]}
      />
    </div>
  );
}
