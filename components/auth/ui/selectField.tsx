import type { SelectFieldProps } from "../../../lib/types/authTypes";


export default function SelectField({ label, value, onChange, options, placeholder }: SelectFieldProps) {
    return (
        <div className="mb-3">
            <label className="block text-sm font-semibold text-gray-900 mb-0.5">
                {label}
            </label>
            <div className="relative">
                <select
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full appearance-none px-3.5 py-3 border border-gray-200 rounded-lg text-sm text-gray-700 bg-white outline-none focus:border-[#1C2FBB] transition-colors duration-200 cursor-pointer pr-9"
                >
                    {placeholder && (
                        <option value="" disabled>
                            {placeholder}
                        </option>
                    )}
                    {options.map((o) => (
                        <option key={o} value={o}>
                            {o}
                        </option>
                    ))}
                </select>
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-lg leading-none">
                    ⌄
                </span>
            </div>
        </div>
    );
}