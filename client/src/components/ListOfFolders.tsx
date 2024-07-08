import { useEffect, useMemo } from "react";
import { useGetAllFoldersMutation } from "../redux/api-slices/folderApiSlice";
import NestedFolders from "./NestedFolders";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { setInitialFolders } from "../redux/slices/folderSlice";
// import { MdKeyboardArrowDown } from "react-icons/md";

const ListOfFolders = () => {
    // const [folders, setFolders] = useState<Folder[]>();
    const [getAllFolders] = useGetAllFoldersMutation();
    const dispatch = useAppDispatch();
    const localFolders = useAppSelector((state) => state.folders);
    const userInfo = useAppSelector((state) => state.auth.userInfo);

    useEffect(() => {
        async function getFolders() {
            const res = await getAllFolders({ user: userInfo?._id }).unwrap();
            // setFolders(res.folders);
            dispatch(setInitialFolders(res.folders));
        }
        getFolders();
    }, []);

    const getFolderById = useMemo(() => {
        const group: Record<string, Folder[]> = {};
        localFolders?.folders?.forEach((folder) => {
            if (folder.parent === null) {
                group.null ||= [];
                group.null.push(folder);
            } else {
                group[folder.parent] ||= [];
                group[folder.parent].push(folder);
            }
        });
        return group;
    }, [localFolders.folders]);

    const getChildFolders = (parentId: string) => {
        return getFolderById[parentId];
    };
    return (
        <div>
            <NestedFolders
                folderList={getFolderById.null}
                getChildFolders={getChildFolders}
            />
        </div>
    );
};

export default ListOfFolders;
