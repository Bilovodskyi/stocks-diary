import React, { ChangeEvent, useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { format } from "date-fns";
import { IoCloseOutline } from "react-icons/io5";

import { cn } from "../utils/utils";

type CalendarFormProps = {
    title: string;
    updateFields: (fields: Partial<InitialDataType>) => void;
};

const CalendarForm = ({ title, updateFields }: CalendarFormProps) => {
    const [date, setDate] = React.useState<Date | undefined>();

    const handleResetDate = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
        e.stopPropagation();
        setDate(undefined);
    };

    useEffect(() => {
        if (title === "Open date") {
            updateFields({ openDate: date });
        } else {
            updateFields({ closeDate: date });
        }
    }, [date]);
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"default"}
                    className={cn(
                        "h-8 justify-start text-left font-normal w-full max-[768px]:px-2",
                        !date && "text-muted-foreground"
                    )}>
                    <CalendarIcon className="mr-2 h-4 w-4 max-[768px]:hidden" />
                    {date ? (
                        <div className="flex items-center justify-between w-full">
                            {format(date, "PPP")}
                            <IoCloseOutline
                                className="text-[1rem]"
                                onClick={handleResetDate}
                            />
                        </div>
                    ) : (
                        <span>{title}</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent
                onInteractOutside={(e) => e.stopPropagation()}
                className="w-auto p-0 bg-[#121212] z-[9999]"
                align="start">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
};

export default CalendarForm;
