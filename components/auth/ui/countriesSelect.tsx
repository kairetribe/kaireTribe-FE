import { useState, useRef, useEffect } from "react";
import { ALL_COUNTRIES } from "@/lib/constants/allCountries";

interface CountriesSelectProps {
    selected: string[];
    onChange: (value: string[]) => void;
}


export default function CountriesSelect({ selected, onChange }: CountriesSelectProps) {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const filtered = ALL_COUNTRIES.filter(
        (c) => c.toLowerCase().includes(query.toLowerCase()) && !selected.includes(c)
    );

    const remove = (c: string) => onChange(selected.filter((x) => x !== c));
    const add = (c: string) => { onChange([...selected, c]); setQuery(""); };

    return (
        <div className="mb-4 relative" ref={ref}>
            <label className="block text-sm font-semibold text-gray-900 mb-1.5">
                Countries interested
            </label>

            <div
                onClick={() => setOpen(true)}
                className="w-full min-h-[46px] flex flex-wrap gap-1.5 items-center px-3.5 py-2.5 border border-gray-200 rounded-lg bg-white cursor-text pr-9 relative focus-within:border-[#1C2FBB] transition-colors duration-200"
            >
                {selected.map((c) => (
                    <span
                        key={c}
                        className="inline-flex items-center gap-1 bg-indigo-50 text-[#1C2FBB] rounded-full px-2.5 py-0.5 text-xs font-medium"
                    >
                        {c}
                        <button
                            onClick={(e) => { e.stopPropagation(); remove(c); }}
                            className="text-[#1C2FBB] font-bold text-sm leading-none hover:opacity-70 transition-opacity ml-0.5"
                        >
                            ×
                        </button>
                    </span>
                ))}

                <input
                    value={query}
                    onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
                    placeholder={selected.length === 0 ? "Search countries..." : ""}
                    className="flex-1 min-w-[80px] border-none outline-none text-sm text-gray-700 bg-transparent placeholder-gray-400"
                />

                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-lg leading-none">
                    ⌄
                </span>
            </div>

            {open && filtered.length > 0 && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-44 overflow-y-auto">
                    {filtered.map((c) => (
                        <div
                            key={c}
                            onClick={() => add(c)}
                            className="px-3.5 py-2.5 text-sm text-gray-700 cursor-pointer hover:bg-gray-50 transition-colors"
                        >
                            {c}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}