import { ElementRef, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMediaQuery } from "usehooks-ts";
import { useLogoutMutation } from "../redux/api-slices/userApiSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { logout } from "../redux/slices/authSlice";
import ListOfFolders from "./ListOfFolders";
import { useCreateFolderMutation } from "../redux/api-slices/folderApiSlice";
import { v4 as uuidv4 } from "uuid";
import { createNewFolder } from "../redux/slices/folderSlice";

import { FiChevronsLeft } from "react-icons/fi";
import { IoMenu } from "react-icons/io5";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { VscFolder } from "react-icons/vsc";
import { RxExit } from "react-icons/rx";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "./ui/tooltip";
import { setPageWidth } from "../redux/slices/sideNavSlice";

const SideNavigation = () => {
    const { pathname } = useLocation();
    const isMobile = useMediaQuery("(max-width: 768px)");

    const userInfo = useAppSelector((state) => state.auth.userInfo);

    const isResizingRef = useRef(false);
    const sidebarRef = useRef<ElementRef<"aside">>(null);
    const navbarRef = useRef<ElementRef<"div">>(null);

    const [isResetting, setIsResetting] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(isMobile);

    const [logoutApiCall] = useLogoutMutation();
    const [createFolder] = useCreateFolderMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const id = uuidv4();

    useEffect(() => {
        if (isMobile) {
            collapse();
        } else {
            resetWidth();
        }
    }, [isMobile]);

    useEffect(() => {
        if (isMobile) {
            collapse();
        }
    }, [isMobile, pathname]);

    const handleMouseDown = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.preventDefault();
        event.stopPropagation();

        isResizingRef.current = true;

        const handleMouseMove = (event: MouseEvent) => {
            if (!isResizingRef.current) return;
            let newWidth = event.clientX;

            if (newWidth < 288) newWidth = 288;
            if (newWidth > 480) newWidth = 480;

            if (sidebarRef.current && navbarRef.current) {
                sidebarRef.current.style.width = `${newWidth}px`;
                navbarRef.current.style.setProperty("left", `${newWidth}px`);
                navbarRef.current.style.setProperty(
                    "width",
                    `calc(100% - ${newWidth}px)`
                );
            }
        };

        const handleMouseup = () => {
            isResizingRef.current = false;
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseup);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseup);
    };

    const resetWidth = () => {
        if (sidebarRef.current && navbarRef.current) {
            setIsCollapsed(false);
            setIsResetting(true);

            sidebarRef.current.style.width = isMobile ? "100%" : "288px";
            navbarRef.current.style.setProperty(
                "width",
                isMobile ? "0" : "calc(100% - 288px)"
            );
            navbarRef.current.style.setProperty(
                "left",
                isMobile ? "100%" : "288px"
            );
            navbarRef.current.style.setProperty(
                "display",
                isMobile ? "none" : "block"
            );

            dispatch(
                setPageWidth({
                    newWidth: isMobile ? "0px" : "calc(100% - 288px)",
                    newHidden: isMobile ? "hidden" : "flex",
                })
            );

            setTimeout(() => setIsResetting(false), 300);
        }
    };

    const collapse = () => {
        if (sidebarRef.current && navbarRef.current) {
            setIsCollapsed(true);
            setIsResetting(true);

            sidebarRef.current.style.width = "0";
            navbarRef.current.style.setProperty("width", "100%");
            navbarRef.current.style.setProperty("left", "0");
            navbarRef.current.style.setProperty("display", "block");

            dispatch(setPageWidth({ newWidth: "100%", newHidden: "flex" }));

            setTimeout(() => setIsResetting(false), 300);
        }
    };

    const logoutHandler = async () => {
        try {
            await logoutApiCall(null).unwrap();
            navigate("/");
            dispatch(logout());
        } catch (err) {
            console.log(err);
        }
    };

    const createFolderFunc = async () => {
        await createFolder({
            _id: id,
            name: "untitled",
            parent: null,
            user: userInfo?._id,
        }).unwrap();
        dispatch(
            createNewFolder({
                _id: id,
                name: "untitled",
                parent: null,
                user: userInfo?._id,
            })
        );
    };

    return (
        <>
            <aside
                ref={sidebarRef}
                className={`group/sidebar h-screen w-72 bg-white/15 overflow-y-auto relative flex flex-col z-90 ${
                    isResetting && "transition-all ease-in-out duration-300"
                } ${isMobile && "w-0"}`}>
                <div className="flex gap-5 md:gap-1 absolute top-5 md:top-4 right-6 md:right-2 md:opacity-0 group-hover/sidebar:opacity-100 transition items-center">
                    <TooltipProvider delayDuration={100}>
                        <Tooltip>
                            <TooltipTrigger>
                                <div
                                    className="cursor-pointer"
                                    role="button"
                                    onClick={createFolderFunc}>
                                    <VscFolder className="text-[2.5rem] md:text-[1.6rem] hover:bg-neutral-600 p-1" />
                                </div>
                            </TooltipTrigger>
                            <TooltipContent side="bottom">
                                <p>New folder</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider delayDuration={100}>
                        <Tooltip>
                            <TooltipTrigger>
                                <div
                                    className={`rounded-md cursor-pointer ${
                                        isMobile && "!opacity-100"
                                    }`}
                                    role="button"
                                    onClick={collapse}>
                                    <FiChevronsLeft className="text-[2.5rem] md:text-[1.6rem] hover:bg-neutral-600 p-1" />
                                </div>
                            </TooltipTrigger>
                            <TooltipContent side="bottom">
                                <p>Collapse menu</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>

                <div className="mt-6 md:mt-4 ml-6 md:ml-2 max-[768px]:text-[1.1rem]">
                    <p>Your Folders and Docs</p>
                </div>
                <div className="mt-6 md:mt-4 mx-4 md:mx-2">
                    <ListOfFolders />
                </div>
                <div
                    onMouseDown={handleMouseDown}
                    onClick={resetWidth}
                    className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-white/10 right-0 top-0"
                />
            </aside>
            <div
                ref={navbarRef}
                className={`absolute max-[768px]:fixed max-[768px]:bg-black top-0 z-[90] left-72 w-[calc(100%-288px)] ${
                    isResetting && "transition-all ease-in-out duration-300"
                } ${isMobile && "left-0 w-full"}`}>
                <nav className="bg-transparent px-7 md:px-5 py-4 w-full flex justify-between">
                    <div className="flex items-center gap-5">
                        {isCollapsed && (
                            <IoMenu
                                className="text-[2rem] md:text-[1.2rem] hover:text-white/80"
                                role="button"
                                onClick={resetWidth}
                            />
                        )}
                        <Link
                            to="/"
                            className="flex hover:text-white/80 items-center">
                            <MdKeyboardArrowLeft className="text-3xl md:text-2xl" />
                            <h2 className="text-[1.1rem] md:text-[.9rem]">
                                Home
                            </h2>
                        </Link>
                    </div>
                    <div className="flex gap-10 items-center">
                        <h2 className="text-[1.1rem] md:text-[.9rem]">
                            {userInfo?.name[0].toUpperCase()}
                            {userInfo?.name.slice(1)}'s diary
                        </h2>
                        <button onClick={logoutHandler}>
                            <RxExit className="text-[1.75rem] md:text-[1.2rem] hover:text-white/80" />
                        </button>
                    </div>
                </nav>
            </div>
        </>
    );
};

export default SideNavigation;
