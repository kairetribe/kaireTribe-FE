export default function Divider() {
  return (
    <div className="flex items-center gap-3 my-1 mb-2">
      <div className="flex-1 h-px bg-gray-200" />
      <span className="text-xs text-gray-400 whitespace-nowrap">
        or fill in manually
      </span>
      <div className="flex-1 h-px bg-gray-200" />
    </div>
  );
}