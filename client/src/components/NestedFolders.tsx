import Folder from "./Folder";

type NestedFoldersProps = {
    folderList: Folder[] | undefined;
    getChildFolders: (param: string) => Folder[] | undefined;
};

const NestedFolders = ({ folderList, getChildFolders }: NestedFoldersProps) => {
    return (
        <>
            {folderList?.map((folder) => (
                <Folder
                    key={folder._id}
                    folder={folder}
                    getChildFolders={getChildFolders}
                />
            ))}
        </>
    );
};

export default NestedFolders;
