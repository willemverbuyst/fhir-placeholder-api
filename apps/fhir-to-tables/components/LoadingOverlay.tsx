type LoadingOverlayMode = "full" | "inline";

type LoadingOverlayProps = {
  mode?: LoadingOverlayMode;
  label?: string;
};

export default function LoadingOverlay({
  mode = "full",
  label = "Loading…",
}: LoadingOverlayProps) {
  const isFullScreen = mode === "full";

  return (
    <div
      className={
        isFullScreen
          ? "relative flex min-h-screen w-full flex-col"
          : "relative flex w-full flex-col"
      }
    >
      <div className="pointer-events-none fixed inset-x-0 top-0 z-40 h-0.5 overflow-hidden bg-zinc-800">
        <div className="h-full w-full origin-left animate-[loading-bar_1s_ease-in-out_infinite] bg-blue-500" />
      </div>

      <div
        className={
          isFullScreen
            ? "flex flex-1 items-center justify-center"
            : "flex min-h-[160px] items-center justify-center"
        }
      >
        <div className="flex flex-col items-center gap-3 text-zinc-300">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-500 border-t-blue-500" />
          <p className="text-sm">{label}</p>
        </div>
      </div>
    </div>
  );
}
