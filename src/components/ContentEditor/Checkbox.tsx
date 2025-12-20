import { ucFirst } from "@/util/text";
import { CheckboxProps } from "@shared";

export default function Checkbox<T extends Record<string, any>>({
  data,
  name,
  updateField,
}: CheckboxProps<T>) {
  const handleChange = () => {
    updateField(name, !data[name]);
  };

  return (
    <div className="col">
      <div className="checkbox-wrapper">
        <label>
          <input
            type="checkbox"
            checked={data[name]} // Bind the checkbox's 'checked' prop to the state
            onChange={handleChange}
          />
          <h4>{ucFirst(name)}</h4>
        </label>
      </div>
    </div>
  );
}

/*
const StatefulCheckbox = ({ label }) => {
  // 1. Initialize state for the checkbox's checked status
  const [isChecked, setIsChecked] = useState(false);

  // 2. Define an event handler to update the state when the checkbox changes
  const handleChange = () => {
    setIsChecked(!isChecked); // Toggle the checked state
  };

  return (
    <div className="checkbox-wrapper">
      <label>
        <input
          type="checkbox"
          checked={isChecked} // Bind the checkbox's 'checked' prop to the state
          onChange={handleChange} // Attach the 'onChange' handler
        />
        <span>{label}</span>
      </label>
    </div>
  );
};

export default StatefulCheckbox;
*/
