interface BracketTextProps {
    text: string;
    className?: string;
}

export const BracketText: React.FC<BracketTextProps> = ({ text, className = "" }) => {
    return (
        <span className={`relative inline-block px-1 mx-1 font-bold text-primary ${className}`}>
            <span className="relative z-10">{text}</span>
            <span className="absolute -top-1 -left-1 w-3 h-3 border-t-4 border-l-4 border-primary rounded-tl-sm"></span>
            <span className="absolute -top-1 -right-1 w-3 h-3 border-t-4 border-r-4 border-primary rounded-tr-sm"></span>
            <span className="absolute -bottom-1 -left-1 w-3 h-3 border-b-4 border-l-4 border-primary rounded-bl-sm"></span>
            <span className="absolute -bottom-1 -right-1 w-3 h-3 border-b-4 border-r-4 border-primary rounded-br-sm"></span>
        </span>
    );
};
