import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: any) {
    return twMerge(clsx(inputs));
}

export const currencyFormatter = new Intl.NumberFormat(undefined, {
    currency: "cad",
    style: "currency",
    minimumFractionDigits: 0,
});

export const formatDate = (dateString: Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};
