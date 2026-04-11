import { useMemo } from "react";

export function FollowButton({ userId, following, onToggle, small }) {
    const isFollowing = following.includes(userId);

    const baseClasses = "rounded-full font-mono tracking-wider transition-all duration-150 cursor-pointer flex-shrink-0 border";

    const sizeClasses = small
    ? "px-2 py-[0.2rem] text-[0.62rem]"
    : "px-4 py-[0.35rem] text-[0.7rem]";

    const stateClasses = useMemo(() => {
        if (isFollowing) {
            return [
                "bg-[rgba(26, 26, 26, 0.06)]",
                "border-[rgba(26, 26, 26, 0.2)]",
                "text-[#555]",
                "hover:bg-[rgba(176, 64, 64, 0.4)]",
                "hover:text-[#b04040]",
            ].join(" ");
        }

        return "bg-[#1a1a1a] border-[#1a1a1a] text-[#f5f0e8]";
    }, [isFollowing]);

    return (
        <button
        onClick={() => onToggle(userId)}
        className={`${baseClasses} ${sizeClasses} ${stateClasses}`}
        >
            {isFollowing ? "following" : "follow"}
        </button>
    );
}