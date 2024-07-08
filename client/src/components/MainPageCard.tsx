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
            className={`${className} ring-1 ring-zinc-100/10 bg-zinc-900/50 h-[580px] md:h-[480px] rounded-xl overflow-hidden`}>
            <div className="relative h-[60%] md:h-[70%] flex items-center justify-center overflow-hidden">
                {image.length > 0 ? (
                    <>
                        <div className="vignette"></div>
                        <img src={image} alt="" className="h-full" />
                    </>
                ) : (
                    <Icons />
                )}
            </div>
            <div className="h-[40%] md:h-[30%] px-8 pb-8 flex flex-col gap-3 pt-8 md:pt-2">
                <h2 className="text-white text-[1.5rem] md:text-[1.1rem]">
                    {title}
                </h2>
                <p className="text-[1.3rem] md:text-[0.9rem] md:leading-6 leading-8">
                    {text}
                </p>
            </div>
        </div>
    );
}

function Icons() {
    return (
        <div className="w-full h-full flex justify-around cursor-pointer p-2">
            <div className="flex flex-col gap-12 justify-start">
                <div className="icons">
                    <SiNvidia className="text-[2.2rem]" />
                </div>
                <div className="icons">
                    <SiCocacola className="text-[2.2rem]" />
                </div>
                <div className="icons">
                    <SiIntel className="text-[2.2rem]" />
                </div>
            </div>
            <div className="flex flex-col gap-12 justify-end">
                <div className="icons">
                    <SiMeta className="text-[2.2rem]" />
                </div>
                <div className="icons">
                    <SiNetflix className="text-[2.2rem]" />
                </div>
                <div className="icons">
                    <SiTesla className="text-[2.2rem]" />
                </div>
            </div>
            <div className="flex flex-col gap-12 justify-start">
                <div className="icons">
                    <IoLogoMicrosoft className="text-[2.2rem]" />
                </div>
                <div className="icons">
                    <IoLogoApple className="text-[2.2rem]" />
                </div>
                <div className="icons">
                    <IoLogoAmazon className="text-[2.2rem]" />
                </div>
            </div>
            <div className="flex flex-col gap-12 justify-end">
                <div className="icons">
                    <IoLogoGoogle className="text-[2.2rem]" />
                </div>
                <div className="icons">
                    <SiAdobe className="text-[2.2rem]" />
                </div>
                <div className="icons">
                    <SiBroadcom className="text-[2.2rem]" />
                </div>
            </div>
            <div className="flex flex-col gap-12 justify-start">
                <div className="icons">
                    <SiMcdonalds className="text-[2.2rem]" />
                </div>
                <div className="icons">
                    <SiVisa className="text-[2.2rem]" />
                </div>
                <div className="icons">
                    <BsAmd className="text-[2.2rem]" />
                </div>
            </div>
        </div>
    );
}
