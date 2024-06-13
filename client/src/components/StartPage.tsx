import { Button } from "./Button";
import { motion } from "framer-motion";
import { fadeIn, fadeInWithDelay } from "../utils/motion";

export function StartPage() {
    return (
        <div className="start-page w-screen px-24">
            <div className="shadow-container"></div>
            <div className="h-[60px] flex items-end justify-end">
                <div className="flex gap-6 items-center">
                    <Button>Go to Journal</Button>
                </div>
            </div>
            <div className="flex flex-col items-center">
                <div className="max-w-3xl my-40 flex flex-col items-center gap-8">
                    <motion.div
                        variants={fadeIn}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.25 }}>
                        <h1 className="main-text text-[4.5rem] text-center">
                            Unleash the power of intuitive finance
                        </h1>
                    </motion.div>

                    <motion.div
                        variants={fadeInWithDelay}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.25 }}>
                        <p className="text-xl text-center mb-6">
                            Say goodbye to the outdated financial tools. Every
                            small business owner, regardless of the background,
                            can now manage their business like a pro. Simple.
                            Intuitive. And never boring.
                        </p>
                    </motion.div>
                    <Button>Go to Journal</Button>
                </div>
                <div className="w-[1100px] h-[652px] ring-1 ring-zinc-100/10 rounded-2xl bg-black">
                    <motion.div
                        variants={fadeIn}
                        initial="hidden"
                        whileInView="show"
                        className="ring-1 ring-zinc-100/10 rounded-2xl overflow-hidden"
                        viewport={{ once: true, amount: 0.25 }}>
                        <img src="./dashboard.webp" alt="app screenshot" />
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
