type ButtonProps = {
    className?: string;
    children: ReactNode;
} & DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
>;

type MainPageCardProps = {
    className?: string;
    image: string;
    title: string;
    text: string;
};

type Folder = {
    _id: string;
    createdAt: Date;
    children: [];
    files: [];
    name: string;
    parent: string;
    user: string;
};

type MyDocumentType = {
    _id: string;
    createdAt?: string;
    name: string;
    parent: string;
    user: string;
    startCapital?: number;
};

type InitialDataType = {
    positionNumber: string;
    positionType: string | undefined;
    openDate: Date | undefined;
    closeDate: Date | undefined;
    deposit: string;
    result: string;
    comment: string;
};

type RecordType = {
    _id: string;
    closeDate: Date;
    comment: string;
    deposit: number;
    parent?: string;
    openDate: Date;
    positionNumber: number;
    positionType: string;
    result: number;
};

type DataForChartType = {
    sum: number;
    index: number;
    close: string;
    result: number;
};
