import { AiOutlineStock } from "react-icons/ai";
import { VscEdit, VscTrash, VscCheck, VscChromeClose } from "react-icons/vsc";
import { useAppDispatch } from "../redux/store";
import { useState } from "react";
import {
    changeLocalDocumentName,
    deleteLocalDocument,
} from "../redux/slices/documentSlice";
import {
    useChangeDocumentNameMutation,
    useDeleteDocumentMutation,
} from "../redux/api-slices/documentApiSlice";
import { useNavigate } from "react-router-dom";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "./ui/tooltip";

type MyDocumentTypeProps = {
    document: MyDocumentType;
};

const Document = ({ document }: MyDocumentTypeProps) => {
    const [newName, setNewName] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    const [changeDocumentName] = useChangeDocumentNameMutation();
    const [deleteDocument] = useDeleteDocumentMutation();

    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const handleFolderNameChange = async () => {
        dispatch(changeLocalDocumentName({ id: document._id, newName }));
        await changeDocumentName({ id: document._id, newName }).unwrap();
        setIsEditing(false);
    };

    const handleDeleteDocument = async (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        e.stopPropagation();
        await deleteDocument({ id: document._id }).unwrap();
        dispatch(deleteLocalDocument(document._id));
        navigate("/journal");
    };

    const handleEdit = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        setIsEditing(true);
    };

    const handleOpenDocument = () => {
        if (!isEditing) {
            navigate(`/journal/:${document._id}`);
        }
    };
    return (
        <li
            onClick={handleOpenDocument}
            className="cursor-pointer group/document flex justify-between items-center w-full mb-2 hover:bg-gray-100/10 px-2 py-2 md:py-1">
            <div className="flex gap-2 md:gap-1 items-center w-full pl-1">
                <AiOutlineStock className="max-[768px]:text-[1.5rem]" />
                {isEditing ? (
                    <input
                        type="text"
                        onChange={(e) => setNewName(e.target.value)}
                        autoFocus
                        className="bg-transparent w-[80%] text-[1.5rem] md:text-[0.9rem] outline-none"
                    />
                ) : (
                    <p className="text-[1.5rem] md:text-[0.9rem] md:w-[80px] overflow-hidden">
                        {document.name}
                    </p>
                )}
            </div>
            <div className="flex gap-5 md:gap-2 items-center md:opacity-0 group-hover/document:opacity-100">
                {isEditing ? (
                    <div className="flex gap-3 md:gap-2">
                        {newName.length > 0 && (
                            <TooltipProvider delayDuration={100}>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <VscCheck
                                            onClick={handleFolderNameChange}
                                            className="hover:text-white/80 max-[768px]:text-[1.75rem]"
                                        />
                                    </TooltipTrigger>
                                    <TooltipContent side="bottom">
                                        <p>Save</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        )}
                        <TooltipProvider delayDuration={100}>
                            <Tooltip>
                                <TooltipTrigger>
                                    <VscChromeClose
                                        className="hover:text-white/80 max-[768px]:text-[1.75rem]"
                                        onClick={() => setIsEditing(false)}
                                    />
                                </TooltipTrigger>
                                <TooltipContent side="bottom">
                                    <p>Cancel</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                ) : (
                    <TooltipProvider delayDuration={100}>
                        <Tooltip>
                            <TooltipTrigger>
                                <div
                                    onClick={handleEdit}
                                    role="button"
                                    className="cursor-pointer">
                                    <VscEdit className="hover:text-white/80 z-20 max-[768px]:text-[1.75rem]" />
                                </div>
                            </TooltipTrigger>
                            <TooltipContent side="bottom">
                                <p>Change name</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                )}
                <TooltipProvider delayDuration={100}>
                    <Tooltip>
                        <TooltipTrigger>
                            <div
                                className="cursor-pointer"
                                role="button"
                                onClick={handleDeleteDocument}>
                                <VscTrash className="hover:text-white/80 max-[768px]:text-[1.75rem]" />
                            </div>
                        </TooltipTrigger>
                        <TooltipContent side="bottom">
                            <p>Delete</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </li>
    );
};

export default Document;
