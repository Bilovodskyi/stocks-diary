import { Link } from "react-router-dom";

export function Button({ className = "", children, ...props }: ButtonProps) {
    return (
        <Link
            to="/journal"
            {...props}
            className={`group button-shadow relative rounded-full p-px hover:text-white transition-all duration-300 ease-in-out ${className}`}>
            <div className="relative z-10 rounded-full bg-zinc-900 px-4 py-1.5 ring-1 ring-white/10">
                {children}
            </div>
            <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-cyan-400/0 via-cyan-400/90 to-cyan-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
        </Link>
    );
}
