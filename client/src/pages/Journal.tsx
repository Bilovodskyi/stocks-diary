import { Outlet, useParams } from "react-router-dom";
import SideNavigation from "../components/SideNavigation";
import { useAppSelector } from "../redux/store";
import { ElementRef, useEffect, useRef } from "react";
import { useMediaQuery } from "usehooks-ts";

function Journal() {
    const { id } = useParams();
    const mainPageRef = useRef<ElementRef<"main">>(null);
    // const divToHideRef = useRef<ElementRef<"div">>(null);
    const isMobile = useMediaQuery("(max-width: 768px)");

    const width = useAppSelector((state) => state.nav.width);
    const hidden = useAppSelector((state) => state.nav.hidden);
    useEffect(() => {
        if (mainPageRef.current) {
            mainPageRef.current.style.width = width;
            mainPageRef.current.style.setProperty("display", hidden);
        }
    }, [width]);
    console.log(width, hidden);
    return (
        <>
            <div className="md:h-screen flex bg-black">
                <SideNavigation />
                <main ref={mainPageRef} className="md:pt-[56px]">
                    {id ? (
                        <div className={`w-full ${isMobile && hidden}`}>
                            <Outlet />
                        </div>
                    ) : (
                        <div
                            className={`${hidden} h-full flex-col items-center justify-center gap-2 w-full`}>
                            <img
                                src="./welcome_to_bunner.png"
                                alt="welcome"
                                className="w-[440px]"
                            />
                            <h2 className="text-[2rem] md:text-[2rem] max-[768px]:p-4 text-center">
                                Welcome to the Stocks diary
                            </h2>
                            <h2 className="text-[1.75rem] md:text-[1.5rem] ">
                                Guide for a beginers
                            </h2>
                            <p className="w-4/5 md:w-1/2 border-l-2 border-white pl-6 mt-3 text-[1.1rem] md:text-[.9rem]">
                                "Hi. Welcome to Stocks diary. To create your
                                first document, you must first create a folder
                                to place the document in. Folders can contain
                                other folders or documents."
                            </p>
                        </div>
                    )}
                </main>
            </div>
        </>
    );
}

export default Journal;
