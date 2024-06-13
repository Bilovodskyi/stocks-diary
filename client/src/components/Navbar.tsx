import { Button } from "./Button";

export function Navbar() {
    return (
        <div className="h-[60px] fixed top-0 left-0 right-0 flex items-center justify-end px-20 z-40 backdrop-blur-md">
            <div className="flex gap-6 items-center">
                <p className="hover:text-white cursor-pointer transition-colors duration-300 text-[0.9rem]">
                    Menu
                </p>
                <Button>Go to Journal</Button>
            </div>
        </div>
    );
}
