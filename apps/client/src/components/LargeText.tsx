export default function LargeText({
  text,
  button,
  clickHandle,
}: {
  text: string;
  button?: boolean;
  clickHandle?: () => void;
}) {
  return (
    <div className="absolute inset-0 z-20 grid place-items-center bg-neutral-800">
      <div className="flex flex-col gap-4 p-4 rounded-md bg-neutral-900">
        <h1 className="text-xl font-medium">{text}</h1>
        {button && (
          <button
            onClick={clickHandle}
            className="block px-4 py-2 mx-auto text-xl transition-all bg-blue-900 rounded-xl hover:bg-zinc-900"
          >
            Go to home
          </button>
        )}
      </div>
    </div>
  );
}
