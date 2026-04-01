import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, ChevronDown } from "lucide-react";

interface ProfileCreationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const ProfileCreationModal = ({ isOpen, onClose }: ProfileCreationModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);

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
                className="relative bg-white rounded-2xl shadow-xl w-full max-w-[800px] flex flex-col pt-8 pb-12 px-10 animate-scale-in"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
            >
                <div className="flex justify-between items-center mb-10">
                    <h2 id="modal-title" className="text-xl font-normal text-gray-900 tracking-tight">
                        Profile Creation
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-[#1a237e] hover:text-indigo-900 transition-colors p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        aria-label="Close modal"
                    >
                        <X className="h-6 w-6 stroke-[2.5px]" />
                    </button>
                </div>
                <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="firstName" className="text-sm text-gray-500 font-light">
                                First name<span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                placeholder="Enter first name"
                                className="block w-full px-4 py-3 rounded-md border border-gray-200 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm outline-none shadow-sm"
                            />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="lastName" className="text-sm text-gray-500 font-light">
                                Last name<span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                placeholder="Enter last name"
                                className="block w-full px-4 py-3 rounded-md border border-gray-200 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm outline-none shadow-sm"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="email" className="text-sm text-gray-500 font-light">
                                Email address<span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter Email address"
                                className="block w-full px-4 py-3 rounded-md border border-gray-200 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm outline-none shadow-sm"
                            />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="password" className="text-sm text-gray-500 font-light">
                                Password<span className="text-red-500">*</span>
                            </label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter Password"
                                className="block w-full px-4 py-3 rounded-md border border-gray-200 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm outline-none shadow-sm"
                            />
                        </div>
                    </div>
                    <div className="w-full sm:max-w-md">
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="role" className="text-sm text-gray-500 font-light">
                                Select role<span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <select
                                    id="role"
                                    className="block w-full px-4 py-3 rounded-md border border-gray-200 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm appearance-none outline-none shadow-sm bg-white"
                                    defaultValue="Admin"
                                >
                                    <option value="Admin">Admin</option>
                                    <option value="User">User</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                                    <ChevronDown className="h-5 w-5 stroke-[1.5px] text-[#1a237e]" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-14 flex justify-center">
                    <button
                        type="button"
                        className="inline-flex items-center justify-center px-24 py-3.5 border border-transparent text-sm font-medium rounded-lg text-white bg-[#1a237e] hover:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-sm transition-colors"
                    >
                        Create Account
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
};
