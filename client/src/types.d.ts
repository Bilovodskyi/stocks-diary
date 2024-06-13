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
    name: string;
    parent: string;
    user: string;
};
