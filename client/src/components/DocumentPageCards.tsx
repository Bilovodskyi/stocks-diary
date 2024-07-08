import {
    IoIosAddCircleOutline,
    IoIosTrendingUp,
    IoIosTrendingDown,
} from "react-icons/io";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "./ui/tooltip";

import { VscCheck, VscChromeClose } from "react-icons/vsc";

import { BiCommentDetail } from "react-icons/bi";
import { currencyFormatter, formatDate } from "../utils/utils";
import { ChangeEvent, useEffect, useState } from "react";
import { useGetAllRecordsMutation } from "../redux/api-slices/recordApiSlice";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { setInitialLocalRecords } from "../redux/slices/recordSlice";
import { changeLocalDocumentStartCapital } from "../redux/slices/documentSlice";
import { useChangeDocumentStartCapitalMutation } from "../redux/api-slices/documentApiSlice";

import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    TooltipProps,
    XAxis,
    YAxis,
} from "recharts";

import { Tooltip as TooltipChart } from "recharts";

const DocumentPageCards = () => {
    const [startCapital, setStartCapital] = useState("");
    const [isEditingCapital, setIsEditingCapital] = useState(false);

    const [getAllRecords] = useGetAllRecordsMutation();
    const [changeDocumentStartCapital] =
        useChangeDocumentStartCapitalMutation();

    const { id } = useParams();
    const dispatch = useAppDispatch();
    const localRecords = useAppSelector((state) => state.records.records);
    const localDocuments = useAppSelector((state) => state.documents.documents);

    const getLocalStartCapital = (id: string | undefined) => {
        const startCapital = localDocuments.find((doc) => doc._id === id);
        return startCapital ? startCapital.startCapital : undefined;
    };

    const localStartCapital = getLocalStartCapital(id?.slice(1));

    useEffect(() => {
        const getAllRecordsFunc = async () => {
            const { data } = await getAllRecords({
                parent: id?.slice(1),
            });
            dispatch(setInitialLocalRecords(data.data));
        };

        getAllRecordsFunc();
    }, [id]);

    const handleChangeStartCapital = async () => {
        dispatch(
            changeLocalDocumentStartCapital({ id: id?.slice(1), startCapital })
        );
        await changeDocumentStartCapital({ id: id?.slice(1), startCapital });
        setIsEditingCapital(false);
    };

    const totalSum = localRecords?.reduce(
        (acc, item) => acc + Number(item.result),
        0
    );
    const buyPositions = localRecords.filter(
        (record) => record.positionType === "Buy"
    ).length;

    document.documentElement.style.setProperty(
        "--percentage",
        Math.floor((buyPositions * 100) / localRecords.length).toString()
    );

    const populateData = () => {
        const data = [{ sum: 0, index: 0, close: "No data", result: 0 }];
        for (let i = 0; i < localRecords.length; i++) {
            data.push({
                sum: localRecords[i].result + data[i]["sum"],
                index: i + 1,
                close: formatDate(localRecords[i].closeDate),
                result: localRecords[i].result,
            });
        }
        return data;
    };

    const dataForChart: DataForChartType[] = populateData();

    const gradientOffset = () => {
        const dataMax = Math.max(...dataForChart.map((i) => i.sum));
        const dataMin = Math.min(...dataForChart.map((i) => i.sum));

        if (dataMax <= 0) {
            return 0;
        }
        if (dataMin >= 0) {
            return 1;
        }

        return dataMax / (dataMax - dataMin);
    };

    const off = gradientOffset();

    return (
        <div className="grid grid-cols-1 md:grid-cols-9 grid-rows-9 md:grid-rows-12 gap-6 px-8 pb-8 md:h-full">
            <div className="flex flex-col md:col-span-3 row-span-1 md:row-span-3 stat-card md:row-start-2 w-full">
                <h2>Buy / Sell ratio</h2>
                <div className="flex">
                    <div className="relative flex items-center justify-center h-[80px] w-[80px] m-[15px]">
                        <div className="pie">
                            <h2 className="text-[#fff] text-center">
                                {localRecords.length}
                            </h2>
                            <h2 className="z-30 text-[0.75rem] text-neutral-600">
                                Positions
                            </h2>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center gap-2">
                        <div className="flex items-center gap-2">
                            <IoIosTrendingUp className="text-green-500" />
                            <h2 className="text-[0.75rem]">Buy positions - </h2>
                            <span>
                                {
                                    localRecords.filter(
                                        (record) =>
                                            record.positionType === "Buy"
                                    ).length
                                }
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <IoIosTrendingDown className="text-red-500" />
                            <h2 className="text-[0.75rem]">
                                Sell positions -{" "}
                            </h2>
                            <span>
                                {
                                    localRecords.filter(
                                        (record) =>
                                            record.positionType === "Sell"
                                    ).length
                                }
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col col-span-1 md:col-span-3 row-span-1 md:row-span-3 stat-card md:row-start-1 !bg-[#6994D8]">
                <h2 className="text-white">Start capital</h2>
                <div className="flex items-center justify-center grow ">
                    {isEditingCapital ? (
                        <div className="flex flex-col gap-4 items-center justify-end">
                            <input
                                type="text"
                                className="px-5 py-2 bg-transparent border-b border-white/20 text-[2rem] w-1/2 outline-none text-white"
                                autoFocus
                                value={startCapital}
                                onChange={(
                                    event: ChangeEvent<HTMLInputElement>
                                ) => setStartCapital(event.target.value)}
                            />
                            <div className="w-full flex justify-end gap-4 px-6">
                                <VscCheck
                                    onClick={handleChangeStartCapital}
                                    className="text-white text-[1.2rem] cursor-pointer"
                                />
                                <VscChromeClose
                                    onClick={() => setIsEditingCapital(false)}
                                    className="text-white text-[1.2rem] cursor-pointer"
                                />
                            </div>
                        </div>
                    ) : localStartCapital ? (
                        <div
                            onClick={() => setIsEditingCapital(true)}
                            className="text-white text-[2rem] hover:bg-white/5 cursor-pointer px-5 py-2 rounded-lg">
                            {currencyFormatter.format(
                                Number(localStartCapital)
                            )}
                        </div>
                    ) : (
                        <div
                            onClick={() => setIsEditingCapital(true)}
                            className="px-5 py-2 rounded-lg hover:bg-white/5 cursor-pointer">
                            <IoIosAddCircleOutline className="text-[2rem] text-white" />
                        </div>
                    )}
                </div>
            </div>
            <div className="col-span-1 md:col-span-3 row-span-1 md:row-span-3 stat-card md:row-start-2 flex flex-col">
                <h2>Capital change</h2>
                <div className=" flex flex-col gap-1 grow justify-center">
                    <p className="text-[1.75rem] text-white">
                        {" "}
                        {totalSum
                            ? currencyFormatter.format(totalSum)
                            : currencyFormatter.format(0)}
                    </p>
                    <p className="text-[0.8rem]">
                        <span className="text-green-500">
                            {localStartCapital
                                ? Math.floor(
                                      (totalSum * 100) / localStartCapital
                                  ) + "%"
                                : "0%"}
                        </span>{" "}
                        grow of capital
                    </p>
                </div>
            </div>
            {/* <div className="col-span-2 row-span-1 stat-card"></div> */}
            <div className="relative !p-0 col-span-1 md:col-span-4 row-span-3 md:row-span-8 stat-card grow h-full overflow-scroll">
                <div className="sticky top-0 bg-[#0F1011] text-[0.75rem]">
                    <div className="flex w-full py-4 border-b border-gray-500/30">
                        <div className="w-[20px] md:w-[40px] flex justify-center">
                            #
                        </div>
                        <div className="table-head">Type</div>
                        <div className="table-head">Open</div>
                        <div className="table-head">Close</div>
                        <div className="table-head">Deposit</div>
                        <div className="table-head">Result</div>
                        <div className="table-head max-[768px]:hidden">
                            Comment
                        </div>
                    </div>
                </div>
                <div className="w-full text-[0.75rem]">
                    <div className="overflow-scroll">
                        {localRecords?.map((dataRow, i) => (
                            <div
                                key={i}
                                className="hover:bg-gray-600/10 flex border-b border-gray-500/30">
                                <div className="font-medium w-[20px] md:w-[40px] flex items-center justify-center">
                                    {i + 1}
                                </div>
                                {/* <div
                                    className={`table-cell ${
                                        dataRow.positionType === "Sell"
                                            ? "text-red-500"
                                            : "text-green-500"
                                    }`}> */}
                                <div className="table-cell">
                                    {dataRow.positionType}
                                </div>
                                <div className="table-cell">
                                    {/* {dataRow.openDate} */}
                                    {formatDate(dataRow.openDate)}
                                </div>
                                <div className="table-cell">
                                    {/* {dataRow.closeDate} */}
                                    {formatDate(dataRow.closeDate)}
                                </div>
                                <div className="table-cell">
                                    {currencyFormatter.format(
                                        Number(dataRow.deposit)
                                    )}
                                </div>
                                <div
                                    className={`table-cell ${
                                        Number(dataRow.result) < 0
                                            ? "text-red-500"
                                            : "text-green-500"
                                    }`}>
                                    {currencyFormatter.format(
                                        Number(dataRow.result)
                                    )}
                                </div>
                                <TooltipProvider delayDuration={100}>
                                    <Tooltip>
                                        <div className="table-cell max-[768px]:hidden">
                                            <TooltipTrigger>
                                                <BiCommentDetail className="cursor-pointer" />
                                            </TooltipTrigger>
                                        </div>
                                        <TooltipContent
                                            side="bottom"
                                            className="text-wrap max-w-[200px] bg-[#0F1011] rounded-lg">
                                            <p>{dataRow.comment}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="sticky w-full bottom-0 bg-[#0F1011]">
                    <div className="w-full flex justify-between border-t border-gray-500/30 py-23 py-3 px-4">
                        <div>Total:</div>
                        <div className="text-right">
                            {totalSum
                                ? currencyFormatter.format(totalSum)
                                : currencyFormatter.format(0)}
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-span-1 md:col-span-5 row-span-3 md:row-span-8 stat-card">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={dataForChart}
                        margin={{
                            top: 10,
                            right: 20,
                            left: 0,
                            bottom: 0,
                        }}>
                        <CartesianGrid strokeDasharray="5 5" opacity={0.25} />
                        <XAxis dataKey="index" className="text-[.75rem]" />
                        <YAxis className="text-[.75rem]" />
                        <TooltipChart content={<CustomTooltip />} />
                        <defs>
                            <linearGradient
                                id="splitColor"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1">
                                <stop
                                    offset={off}
                                    stopColor="green"
                                    stopOpacity={0.75}
                                />
                                <stop
                                    offset={off}
                                    stopColor="red"
                                    stopOpacity={0.75}
                                />
                            </linearGradient>
                        </defs>
                        <Area
                            type="monotone"
                            dataKey="sum"
                            stroke="#000"
                            fill="url(#splitColor)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

interface CustomTooltipProps extends TooltipProps<number, string> {}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ payload, active }) => {
    if (active && payload && payload.length) {
        console.log(payload);
        return (
            <div className="bg-zinc-900/50 ring-1 ring-zinc-100/15 rounded-xl p-3 text-[.75rem]">
                <p>Close: {payload[0].payload.close}</p>
                <p>Position Result: ${payload[0].payload.result}</p>
                <p>Capital chenge: ${payload[0].payload.sum}</p>
            </div>
        );
    }

    return null;
};

export default DocumentPageCards;
