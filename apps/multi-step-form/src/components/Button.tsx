type Props = {
  caption: string;
  handleClick?: () => void;
  type?: "button" | "submit";
};

function Button({ caption, handleClick, type = "button" }: Props) {
  return (
    <button
      onClick={handleClick}
      className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
      type={type}
    >
      {caption}
    </button>
  );
}

export default Button;
