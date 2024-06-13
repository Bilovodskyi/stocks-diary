import {
    IoLogoApple,
    IoLogoMicrosoft,
    IoLogoAmazon,
    IoLogoGoogle,
} from "react-icons/io5";
import {
    SiNetflix,
    SiTesla,
    SiMeta,
    SiNvidia,
    SiBroadcom,
    SiVisa,
    SiAdobe,
    SiCocacola,
    SiMcdonalds,
    SiIntel,
} from "react-icons/si";
import { BsAmd } from "react-icons/bs";

export function MainPageCard({
    className = "",
    image,
    title,
    text,
}: MainPageCardProps) {
    return (
        <div
            className={`${className} ring-1 ring-zinc-100/10 bg-zinc-900/50 h-[480px] rounded-xl overflow-hidden`}>
            <div className="relative h-[70%] flex items-center justify-center overflow-hidden">
                {image.length > 0 ? (
                    <>
                        <div className="vignette"></div>
                        <img src={image} alt="" className="h-full" />
                    </>
                ) : (
                    <Icons />
                )}
            </div>
            <div className="h-[30%] px-8 pb-8 flex flex-col gap-3 pt-2">
                <h2 className="text-white text-[1.1rem]">{title}</h2>
                <p className="text-[0.9rem] leading-6">{text}</p>
            </div>
        </div>
    );
}

function Icons() {
    return (
        <div className="w-full h-full flex justify-around cursor-pointer p-2">
            <div className="flex flex-col gap-12 justify-start">
                <div className="ring-1 ring-zinc-100/10 w-[60px] h-[60px] rounded-full cursor-pointer hover:scale-110 transition-all duration-300 flex items-center justify-center">
                    <SiNvidia className="text-[2.2rem]" />
                </div>
                <div className="ring-1 ring-zinc-100/10 w-[60px] h-[60px] rounded-full cursor-pointer hover:scale-110 transition-all duration-300 flex items-center justify-center">
                    <SiCocacola className="text-[2.2rem]" />
                </div>
                <div className="ring-1 ring-zinc-100/10 w-[60px] h-[60px] rounded-full cursor-pointer hover:scale-110 transition-all duration-300 flex items-center justify-center">
                    <SiIntel className="text-[2.2rem]" />
                </div>
            </div>
            <div className="flex flex-col gap-12 justify-end">
                <div className="ring-1 ring-zinc-100/10 w-[60px] h-[60px] rounded-full cursor-pointer hover:scale-110 transition-all duration-300 flex items-center justify-center">
                    <SiMeta className="text-[2.2rem]" />
                </div>
                <div className="ring-1 ring-zinc-100/10 w-[60px] h-[60px] rounded-full cursor-pointer hover:scale-110 transition-all duration-300 flex items-center justify-center">
                    <SiNetflix className="text-[2.2rem]" />
                </div>
                <div className="ring-1 ring-zinc-100/10 w-[60px] h-[60px] rounded-full cursor-pointer hover:scale-110 transition-all duration-300 flex items-center justify-center">
                    <SiTesla className="text-[2.2rem]" />
                </div>
            </div>
            <div className="flex flex-col gap-12 justify-start">
                <div className="ring-1 ring-zinc-100/10 w-[60px] h-[60px] rounded-full cursor-pointer hover:scale-110 transition-all duration-300 flex items-center justify-center">
                    <IoLogoMicrosoft className="text-[2.2rem]" />
                </div>
                <div className="ring-1 ring-zinc-100/10 w-[60px] h-[60px] rounded-full cursor-pointer hover:scale-110 transition-all duration-300 flex items-center justify-center">
                    <IoLogoApple className="text-[2.2rem]" />
                </div>
                <div className="ring-1 ring-zinc-100/10 w-[60px] h-[60px] rounded-full cursor-pointer hover:scale-110 transition-all duration-300 flex items-center justify-center">
                    <IoLogoAmazon className="text-[2.2rem]" />
                </div>
            </div>
            <div className="flex flex-col gap-12 justify-end">
                <div className="ring-1 ring-zinc-100/10 w-[60px] h-[60px] rounded-full cursor-pointer hover:scale-110 transition-all duration-300 flex items-center justify-center">
                    <IoLogoGoogle className="text-[2.2rem]" />
                </div>
                <div className="ring-1 ring-zinc-100/10 w-[60px] h-[60px] rounded-full cursor-pointer hover:scale-110 transition-all duration-300 flex items-center justify-center">
                    <SiAdobe className="text-[2.2rem]" />
                </div>
                <div className="ring-1 ring-zinc-100/10 w-[60px] h-[60px] rounded-full cursor-pointer hover:scale-110 transition-all duration-300 flex items-center justify-center">
                    <SiBroadcom className="text-[2.2rem]" />
                </div>
            </div>
            <div className="flex flex-col gap-12 justify-start">
                <div className="ring-1 ring-zinc-100/10 w-[60px] h-[60px] rounded-full cursor-pointer hover:scale-110 transition-all duration-300 flex items-center justify-center">
                    <SiMcdonalds className="text-[2.2rem]" />
                </div>
                <div className="ring-1 ring-zinc-100/10 w-[60px] h-[60px] rounded-full cursor-pointer hover:scale-110 transition-all duration-300 flex items-center justify-center">
                    <SiVisa className="text-[2.2rem]" />
                </div>
                <div className="ring-1 ring-zinc-100/10 w-[60px] h-[60px] rounded-full cursor-pointer hover:scale-110 transition-all duration-300 flex items-center justify-center">
                    <BsAmd className="text-[2.2rem]" />
                </div>
            </div>
        </div>
    );
}
