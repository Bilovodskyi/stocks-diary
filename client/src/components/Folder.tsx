import React, { useEffect, useState } from "react";
import NestedFolders from "./NestedFolders";
import {
    VscNewFile,
    VscNewFolder,
    VscTrash,
    VscFolder,
    VscEdit,
    VscCheck,
    VscChromeClose,
} from "react-icons/vsc";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";

import {
    useCreateFolderMutation,
    useDeleteFolderMutation,
    useUpdateFolderNameMutation,
} from "../redux/api-slices/folderApiSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import {
    changeFolderName,
    createNewFolder,
    deleteLocalFolder,
} from "../redux/slices/folderSlice";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import {
    useCreateDocumentMutation,
    useGetAllDocumentsMutation,
} from "../redux/api-slices/documentApiSlice";
import {
    createNewDocument,
    setInitialDocuments,
} from "../redux/slices/documentSlice";
import Document from "./Document";

type FolderProps = {
    folder: Folder;
    getChildFolders: (param: string) => Folder[] | undefined;
};

const Folder = ({ folder, getChildFolders }: FolderProps) => {
    const [hide, setHide] = useState<string[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState("");

    const dispatch = useAppDispatch();
    const userInfo = useAppSelector((state) => state.auth.userInfo);
    const localDocuments = useAppSelector((state) => state.documents.documents);

    const [createFolder] = useCreateFolderMutation();
    const [updateFolderName] = useUpdateFolderNameMutation();
    const [deleteFolder] = useDeleteFolderMutation();
    const [createDocument] = useCreateDocumentMutation();
    const [getAllDocuments] = useGetAllDocumentsMutation();

    const folderId = uuidv4();
    const documentId = uuidv4();
    const navigate = useNavigate();

    useEffect(() => {
        const getAllDocumentsFunc = async () => {
            const res = await getAllDocuments({ user: userInfo?._id }).unwrap();
            dispatch(setInitialDocuments(res.data));
        };
        getAllDocumentsFunc();
    }, []);

    const handleCreateFolder = async () => {
        await createFolder({
            _id: folderId,
            name: "untitled",
            parent: folder._id,
            user: userInfo?._id,
        }).unwrap();
        dispatch(
            createNewFolder({
                _id: folderId,
                name: "untitled",
                parent: folder._id,
                user: userInfo?._id,
            })
        );
    };

    const handleHideFolder = () => {
        if (hide.includes(folder._id)) {
            setHide((prev) => prev.filter((s) => s !== folder._id));
        } else {
            setHide((prev) => [...prev, folder._id]);
        }
    };

    const handleFolderNameChange = async () => {
        dispatch(changeFolderName({ id: folder._id, newName }));
        await updateFolderName({ _id: folder._id, name: newName }).unwrap();
        setIsEditing(false);
    };

    const handleDeleteFolder = async () => {
        await deleteFolder({ id: folder._id }).unwrap();
        dispatch(deleteLocalFolder(folder._id));
    };

    const handleCreateDocument = async () => {
        dispatch(
            createNewDocument({
                _id: documentId,
                name: "untitled",
                parent: folder._id,
                user: userInfo?._id,
            })
        );
        await createDocument({
            _id: documentId,
            name: "untitled",
            user: userInfo?._id,
            parent: folder._id,
        });

        navigate(`/journal/:${documentId}`);
    };

    return (
        <>
            <div className="group/folder flex justify-between items-center w-full mb-2 hover:bg-gray-100/10 px-2 py-1">
                <div className="flex gap-1 items-center w-full">
                    {hide.includes(folder._id) ? (
                        <MdKeyboardArrowRight
                            className="cursor-pointer shrink-0"
                            onClick={handleHideFolder}
                        />
                    ) : (
                        <MdKeyboardArrowDown
                            className="cursor-pointer shrink-0"
                            onClick={handleHideFolder}
                        />
                    )}
                    <VscFolder className="shrink-0" />
                    {isEditing ? (
                        <input
                            type="text"
                            onChange={(e) => setNewName(e.target.value)}
                            autoFocus
                            className="bg-transparent w-[80%] text-[0.9rem] outline-none"
                        />
                    ) : (
                        <p className="text-[0.9rem] w-[80px] overflow-hidden">
                            {folder.name}
                        </p>
                    )}
                </div>
                <div className="flex gap-2 items-center opacity-0 group-hover/folder:opacity-100">
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
                            <VscEdit
                                onClick={() => setIsEditing(true)}
                                className="hover:text-white/80"
                            />
                        )}
                    </div>
                    <div
                        className="cursor-pointer"
                        onClick={handleCreateFolder}>
                        <VscNewFolder className="hover:text-white/80" />
                    </div>
                    <div
                        className="cursor-pointer"
                        onClick={handleCreateDocument}>
                        <VscNewFile className="hover:text-white/80" />
                    </div>
                    <div
                        className="cursor-pointer"
                        onClick={handleDeleteFolder}>
                        <VscTrash className="hover:text-white/80" />
                    </div>
                </div>
            </div>
            {!hide.includes(folder._id) && (
                <div className="ml-3 border-l-[0.05px] border-zinc-600">
                    <>
                        {localDocuments
                            ?.filter((doc) => doc.parent === folder._id)
                            .map((document) => (
                                <Document
                                    document={document}
                                    key={document._id}
                                />
                            ))}

                        <NestedFolders
                            folderList={getChildFolders(folder._id)}
                            getChildFolders={getChildFolders}
                        />
                    </>
                </div>
            )}
        </>
    );
};

export default Folder;
