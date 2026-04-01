import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, CircleX } from "lucide-react";

interface CreateRoleModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CreateRoleModal = ({ isOpen, onClose }: CreateRoleModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const [roleType, setRoleType] = useState("Admin");
    const [activePermissions] = useState([
        "Add Scholarship",
        "Add User",
        "Approve announcement"
    ]);
    const [isTurnedOn, setIsTurnedOn] = useState(true);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "unset";
        };
    }, [isOpen, onClose]);

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="fixed inset-0 bg-black/20 backdrop-blur-[1px] transition-opacity duration-300"
                onClick={handleOverlayClick}
                aria-hidden="true"
            />
            <div
                ref={modalRef}
                className="relative bg-white rounded-[24px] shadow-xl w-full max-w-[650px] flex flex-col pt-10 pb-12 px-12 animate-scale-in"
                role="dialog"
                aria-modal="true"
            >
                <button
                    onClick={onClose}
                    className="absolute top-10 right-10 text-[#1a237e] hover:text-indigo-900 transition-colors focus:outline-none rounded-full"
                    aria-label="Close modal"
                >
                    <CircleX className="h-7 w-7 stroke-[1.5px]" />
                </button>
                <h2 className="text-2xl font-normal text-gray-900 mb-8 text-center sm:text-left sm:pl-1">
                    Create new role
                </h2>

                <div className="space-y-7">
                    <div className="space-y-2">
                        <label className="text-xs text-gray-500 font-normal ml-1">
                            Role Type
                        </label>
                        <input
                            type="text"
                            value={roleType}
                            onChange={(e) => setRoleType(e.target.value)}
                            className="block w-full px-4 py-3 rounded-md border border-gray-200 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 text-sm outline-none shadow-sm"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs text-gray-500 font-normal ml-1">
                            Permissions
                        </label>
                        <div className="flex flex-wrap gap-3">
                            {activePermissions.map((perm) => (
                                <div key={perm} className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-medium bg-[#e8eaf6] text-[#1a237e]">
                                    {perm}
                                    <button className="ml-2 hover:text-indigo-900 focus:outline-none">
                                        <X className="h-3 w-3" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs text-gray-500 font-normal ml-1">
                            Select Permissions
                        </label>
                        <div className="flex flex-wrap gap-3 items-center">
                            <button className="inline-flex items-center px-4 py-2 rounded-full text-xs font-normal bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                                Approve announcement
                            </button>
                            <button className="inline-flex items-center px-4 py-2 rounded-full text-xs font-normal bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                                Add Scholarship
                            </button>

                        </div>
                        <div className="pt-2">
                            <button className="inline-flex items-center px-6 py-2.5 rounded-full text-xs font-medium bg-[#1a237e] text-white hover:bg-indigo-900 transition-colors shadow-sm">
                                Add new permission
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                        <span className="text-sm text-gray-900 font-normal ml-1">Turn off</span>
                        <button
                            onClick={() => setIsTurnedOn(!isTurnedOn)}
                            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${isTurnedOn ? 'bg-[#1a237e]' : 'bg-gray-200'}`}
                            role="switch"
                            aria-checked={isTurnedOn}
                        >
                            <span
                                aria-hidden="true"
                                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${isTurnedOn ? 'translate-x-5' : 'translate-x-0'}`}
                            />
                        </button>
                    </div>
                </div>
                <div className="mt-12 flex justify-center">
                    <button
                        type="button"
                        className="inline-flex items-center justify-center px-24 py-3.5 border border-transparent text-sm font-medium rounded-lg text-white bg-[#1a237e] hover:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-sm transition-colors"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
};