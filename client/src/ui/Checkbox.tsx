export function Checkbox(props: {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}): React.JSX.Element {
  return (
    <div className="flex items-center space-x-2">
      <input
        id={props.id}
        type="checkbox"
        checked={props.checked}
        onChange={(e) => props.onChange(e.target.checked)}
        className="rounded border-2 border-pink-500 bg-white p-2 outline-pink-500 focus:outline"
      />
      <label htmlFor={props.id} className="text-xl">
        {props.label}
      </label>
    </div>
  );
}
