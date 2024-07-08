import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import CalendarForm from "../components/CalendarForm";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectItem,
    SelectContent,
} from "../components/ui/select";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle,
    DialogHeader,
    DialogClose,
} from "../components/ui/dialog";
import { useGetSingleDocumentMutation } from "../redux/api-slices/documentApiSlice";
import { useParams } from "react-router-dom";
import { AiOutlineStock } from "react-icons/ai";
import { IoCloseOutline } from "react-icons/io5";
import { useCreateRecordMutation } from "../redux/api-slices/recordApiSlice";
import { toast } from "sonner";
import DocumentPageCards from "../components/DocumentPageCards";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "../redux/store";
import { createNewLocalRecord } from "../redux/slices/recordSlice";

const INITIAL_DATA: InitialDataType = {
    positionNumber: "",
    positionType: undefined,
    openDate: undefined,
    closeDate: undefined,
    deposit: "",
    result: "",
    comment: "",
};

const DocumentFormValidator = z.object({
    positionNumber: z.string().min(1, { message: "Cannot be enpty!" }),
    deposit: z.string().min(1, { message: "Cannot be enpty!" }),
    result: z.string().min(1, { message: "Cannot be enpty!" }),
    comment: z.string().min(1, { message: "Cannot be enpty!" }),
});

const DocumentPage = () => {
    const [data, setData] = useState<InitialDataType>(INITIAL_DATA);
    const [selectPositionType, setSelectPositionType] = useState<
        string | undefined
    >();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [document, setDocument] = useState<MyDocumentType | undefined>();

    const dispatch = useAppDispatch();

    const { id } = useParams();
    const [getSingleDocument] = useGetSingleDocumentMutation();
    const [createRecord, { isLoading }] = useCreateRecordMutation();

    const {
        register,
        handleSubmit,
        clearErrors,
        reset,
        formState: { errors },
    } = useForm<z.infer<typeof DocumentFormValidator>>({
        resolver: zodResolver(DocumentFormValidator),
    });

    useEffect(() => {
        const handleGetSingleDocument = async () => {
            const doc = await getSingleDocument({
                _id: id?.slice(1),
            }).unwrap();
            setDocument(doc.data);
        };
        handleGetSingleDocument();
    }, [id]);

    useEffect(() => {
        updateFields({ positionType: selectPositionType });
    }, [selectPositionType]);

    function updateFields(fields: Partial<InitialDataType>) {
        setData((prev) => {
            return { ...prev, ...fields };
        });
    }

    const handleInputChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ): void => {
        event.preventDefault();
        const { name, value } = event.target;
        if (/^[0-9-]*$/.test(value) || name === "comment") {
            updateFields({ [name]: value });
        }
    };

    const handleCreateRecord = async () => {
        try {
            await createRecord({ ...data, parent: id?.slice(1) });
            dispatch(createNewLocalRecord({ ...data, parent: id?.slice(1) }));
            setDialogOpen(false);
            resetFormOnClose();
            toast.message("You created new record!");
        } catch (err) {
            console.log(err);
            toast.error("Something went wrong!");
        }
    };

    const resetFormOnClose = () => {
        setData(INITIAL_DATA);
        clearErrors();
        reset();
    };

    return (
        <div className="md:h-[calc(100vh-105px)] flex flex-col w-full max-[768px]:mt-[60px]">
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <div className="flex justify-between px-8 pt-4 max-[768px]:mb-4">
                    <div className="flex items-center gap-1">
                        <AiOutlineStock />
                        <h2 className="">{document?.name}</h2>
                    </div>

                    <DialogTrigger className="bg-gray-500/20 hover:bg-gray-500/30 duration-150 ring-1 ring-zinc-100/15 rounded-full px-4 py-1.5 text-[0.9rem]">
                        New record
                    </DialogTrigger>
                </div>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create new </DialogTitle>
                        <DialogClose>
                            <IoCloseOutline
                                onClick={resetFormOnClose}
                                className="h-6 w-6 group-hover/close:text-white duration-150"
                            />
                            <span className="sr-only">Close</span>
                        </DialogClose>
                    </DialogHeader>
                    <form className="">
                        <div className="grid grid-cols-3 grid-rows-5 gap-2 px-4 md:px-8 py-2 md:py-4 w-full">
                            <div className="h-14 col-span-1 row-span-1">
                                <input
                                    value={data?.positionNumber}
                                    {...register("positionNumber")}
                                    onChange={handleInputChange}
                                    placeholder="Position number"
                                    className="h-8 bg-transparent rounded-md px-3 py-2 text-sm ring-1 ring-zinc-100/25 outline-none w-full"
                                />
                                {errors.positionNumber && (
                                    <p className="px-2 text-[0.8rem] text-red-500">
                                        {errors.positionNumber.message}
                                    </p>
                                )}
                            </div>
                            <div className="col-span-1 row-span-1">
                                <CalendarForm
                                    title={"Open date"}
                                    updateFields={updateFields}
                                />
                            </div>
                            <div className="col-span-1 row-span-1">
                                <CalendarForm
                                    title={"Close date"}
                                    updateFields={updateFields}
                                />
                            </div>
                            <div className="col-span-1 row-span-1">
                                <Select
                                    value={data?.positionType}
                                    onValueChange={setSelectPositionType}
                                    name="positionType">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Position type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Sell">
                                            Sell
                                        </SelectItem>
                                        <SelectItem value="Buy">Buy</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="h-14 col-span-1 row-span-1">
                                <input
                                    placeholder="Deposit"
                                    {...register("deposit")}
                                    className="h-8 bg-transparent rounded-md px-3 py-2 text-sm ring-1 ring-zinc-100/25 outline-none w-full"
                                    value={data?.deposit}
                                    onChange={handleInputChange}
                                />
                                {errors.deposit && (
                                    <p className="px-2 text-[0.8rem] text-red-500">
                                        {errors.deposit.message}
                                    </p>
                                )}
                            </div>
                            <div className="h-14 col-span-1 row-span-1">
                                <input
                                    placeholder="Result"
                                    {...register("result")}
                                    className="h-8 bg-transparent rounded-md px-3 py-2 text-sm ring-1 ring-zinc-100/25 outline-none w-full"
                                    value={data?.result}
                                    onChange={handleInputChange}
                                />
                                {errors.result && (
                                    <p className="px-2 text-[0.8rem] text-red-500">
                                        {errors.result.message}
                                    </p>
                                )}
                            </div>
                            <div className="col-span-3 row-span-3">
                                <textarea
                                    {...register("comment")}
                                    value={data?.comment}
                                    onChange={handleInputChange}
                                    placeholder="Comment"
                                    className="resize-none w-full h-full bg-transparent rounded-md px-3 py-2 text-sm ring-1 ring-zinc-100/25 outline-none
                            "
                                />
                                {errors.comment && (
                                    <p className="px-2 text-[.8rem] text-red-500">
                                        {errors.comment.message}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="flex justify-end px-4 md:px-8">
                            <button
                                disabled={isLoading}
                                onClick={handleSubmit(handleCreateRecord)}
                                className="h-8 bg-white text-black rounded-full px-3 py-2 text-sm ring-1 ring-zinc-100/25 outline-none flex items-center">
                                Save
                            </button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
            <DocumentPageCards />
        </div>
    );
};

export default DocumentPage;
