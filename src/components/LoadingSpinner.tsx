import "./loadingSpinner.css";

export function LoadingSpinner() {
  return (
    <div className="h-screen flex ">
      <div className="m-auto">
        <span className="loader" />
      </div>
    </div>
  );
}
