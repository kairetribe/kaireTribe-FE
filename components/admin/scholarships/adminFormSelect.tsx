interface AdminFormSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  required?: boolean;
}

const inputClassName =
  "block w-full appearance-none px-4 py-3 rounded-md border border-gray-200 text-gray-900 bg-white focus:border-indigo-500 focus:ring-indigo-500 text-sm outline-none shadow-sm cursor-pointer pr-10";

export const AdminFormSelect = ({
  label,
  value,
  onChange,
  options,
  placeholder,
  required = true,
}: AdminFormSelectProps) => (
  <div className="space-y-2">
    <label className="text-sm text-gray-500 font-normal">
      {label}
      {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      <select value={value} onChange={(event) => onChange(event.target.value)} className={inputClassName}>
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
        ▾
      </span>
    </div>
  </div>
);
