/**
 * ProgressBar
 * - Google path → totalSteps = 2
 * - Manual path → totalSteps = 3
 */
export default function ProgressBar({ step, totalSteps }: { step: number; totalSteps: number }) {
  return (
    <div className="flex gap-2 mb-4">
      {Array.from({ length: totalSteps }).map((_, i) => (
        <div
          key={i}
          className={`flex-1 h-1.5 rounded-full transition-colors duration-300 ${
            step >= i + 1 ? "bg-[#1C2FBB]" : "bg-gray-200"
          }`}
        />
      ))}
    </div>
  );
}