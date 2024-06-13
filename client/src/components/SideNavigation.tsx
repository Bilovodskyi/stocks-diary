import { ElementRef, useEffect, useRef, useState } from "react";
import { FiChevronsLeft } from "react-icons/fi";
import { IoMenu } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMediaQuery } from "usehooks-ts";
import { useLogoutMutation } from "../redux/api-slices/userApiSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { logout } from "../redux/slices/authSlice";
import { MdKeyboardArrowLeft } from "react-icons/md";
import ListOfFolders from "./ListOfFolders";
import { VscFolder } from "react-icons/vsc";
import { useCreateFolderMutation } from "../redux/api-slices/folderApiSlice";
import { v4 as uuidv4 } from "uuid";
import { createNewFolder } from "../redux/slices/folderSlice";
import { RxExit } from "react-icons/rx";

const SideNavigation = () => {
    const { pathname } = useLocation();
    const isMobile = useMediaQuery("(max-width: 768px)");

    const userInfo = useAppSelector((state) => state.auth.userInfo);
    console.log(userInfo);

    const isResizingRef = useRef(false);
    const sidebarRef = useRef<ElementRef<"aside">>(null);
    const navbarRef = useRef<ElementRef<"div">>(null);

    const [isResetting, setIsResetting] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(isMobile);

    const [logoutApiCall] = useLogoutMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [createFolder] = useCreateFolderMutation();

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
                className={`group/sidebar h-full w-72 bg-white/10 overflow-y-auto relative flex flex-col z-[99999] ${
                    isResetting && "transition-all ease-in-out duration-300"
                } ${isMobile && "w-0"}`}>
                <div className="flex absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition items-center">
                    <div
                        className="p-1 cursor-pointer"
                        role="button"
                        onClick={createFolderFunc}>
                        <VscFolder className="h-7 w-7 hover:bg-neutral-600 p-1" />
                    </div>
                    <div
                        className={`p-1 rounded-md cursor-pointer ${
                            isMobile && "!opacity-100"
                        }`}
                        role="button"
                        onClick={collapse}>
                        <FiChevronsLeft className="h-7 w-7 hover:bg-neutral-600 p-1" />
                    </div>
                </div>

                <div className="mt-4 ml-2">
                    <p>Action items</p>
                </div>
                <div className="mt-4 mx-2">
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
                className={`absolute top-0 z-[99999] left-72 w-[calc(100%-288px)] ${
                    isResetting && "transition-all ease-in-out duration-300"
                } ${isMobile && "left-0 w-full"}`}>
                <nav className="bg-transparent px-5 py-4 w-full flex justify-between">
                    <div className="flex gap-5">
                        {isCollapsed && (
                            <IoMenu
                                className="h-6 w-6 hover:text-white/80"
                                role="button"
                                onClick={resetWidth}
                            />
                        )}
                        <Link to="/" className="flex hover:text-white/80">
                            <MdKeyboardArrowLeft className="text-2xl" />
                            <h2 className="text-[.9rem]">Home</h2>
                        </Link>
                    </div>
                    <div className="flex gap-10 items-center">
                        <h2 className="text-[.9rem]">
                            {userInfo?.name[0].toUpperCase()}
                            {userInfo?.name.slice(1)}'s diary
                        </h2>
                        <button onClick={logoutHandler}>
                            <RxExit className="text-[1.2rem] hover:text-white/80" />
                        </button>
                    </div>
                </nav>
            </div>
        </>
    );
};

export default SideNavigation;
