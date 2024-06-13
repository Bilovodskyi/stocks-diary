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
import { Link, useNavigate } from "react-router-dom";

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

    const handleDeleteFolder = async (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        e.stopPropagation();
        await deleteDocument({ id: document._id }).unwrap();
        dispatch(deleteLocalDocument(document._id));
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
            className="cursor-pointer group/document flex justify-between items-center w-full mb-2 hover:bg-gray-100/10 px-2 py-1">
            <div className="flex gap-1 items-center w-full pl-1">
                <AiOutlineStock />
                {isEditing ? (
                    <input
                        type="text"
                        onChange={(e) => setNewName(e.target.value)}
                        autoFocus
                        className="bg-transparent w-[80%] text-[0.9rem] outline-none"
                    />
                ) : (
                    <p className="text-[0.9rem] w-[80px] overflow-hidden">
                        {document.name}
                    </p>
                )}
            </div>
            <div className="flex gap-2 items-center opacity-0 group-hover/document:opacity-100">
                <div className="cursor-pointer">
                    {isEditing ? (
                        <div className="flex gap-2">
                            {newName.length > 0 && (
                                <VscCheck
                                    onClick={handleFolderNameChange}
                                    className="hover:text-white/80"
                                />
                            )}
                            <VscChromeClose
                                className="hover:text-white/80"
                                onClick={() => setIsEditing(false)}
                            />
                        </div>
                    ) : (
                        <div
                            onClick={handleEdit}
                            role="button"
                            className="cursor-pointer">
                            <VscEdit className="hover:text-white/80 z-20" />
                        </div>
                    )}
                </div>
                <div
                    className="cursor-pointer"
                    role="button"
                    onClick={handleDeleteFolder}>
                    <VscTrash className="hover:text-white/80" />
                </div>
            </div>
        </li>
    );
};

export default Document;
