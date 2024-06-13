import { Outlet } from "react-router-dom";
import SideNavigation from "../components/SideNavigation";

function Journal() {
    return (
        <>
            <div className="h-screen flex bg-neutral-900">
                <SideNavigation />
                <main className="flex-1 h-full overflow-y-hidden md:pt-[56px]">
                    <Outlet />
                </main>
            </div>
        </>
    );
}

export default Journal;
