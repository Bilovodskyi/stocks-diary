import { Button } from "./Button";
import { MainPageCard } from "./MainPageCard";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

export function MainContent() {
    return (
        <div className="px-28">
            <div className="flex gap-4 my-[10rem]">
                <h1 className="main-text text-[3rem] w-1/2 flex items-start leading-[3.25rem] px-2">
                    Who said finance has to be boring?
                </h1>
                <p className="w-1/2 leading-[1.75rem] px-2">
                    With Cobalt, managing your business finances is effortless,
                    empowering, and anything but boring. Our intuitive platform
                    brings clarity to your cash flow, simplifies your financial
                    decision-making, and puts the power of advanced financial
                    management right at your fingertips. Say no to spreadsheets
                    and tools designed in the 80s.
                </p>
            </div>
            <div className="flex flex-col gap-4 w-1/2">
                <h1 className="main-text text-[3rem] leading-[3.25rem] px-2">
                    Everything you need. Nothing you don’t
                </h1>
                <p className="px-2">
                    Financial management and visibility in one place. Experience
                    a flexible toolkit that makes every task feel like a breeze.
                </p>
            </div>
            <div className="px-2 grid grid-cols-12 grid-rows-2 gap-8 mt-12">
                <MainPageCard
                    className="col-span-4"
                    image="card-bg.svg"
                    title="Insights at your fingertips"
                    text="All your data and finances in one place to provide quick answers and make decisions instantly."
                />

                <MainPageCard
                    className="col-span-4"
                    image="card-bg-2.svg"
                    text="Have full control of your business finances on the go using our iOS/Android mobile apps. Because, you know, it’s 2023."
                    title="Manage in real time"
                />
                <MainPageCard
                    className="col-span-4"
                    image="mobile-app.svg"
                    text="Choose the alerts you need and receive them via email, mobile or Slack. Review and take action in one click."
                    title="Important business alerts"
                />
                <MainPageCard
                    className="col-span-7"
                    image=""
                    text="Bring your data with our built-in integrations for accounting, revenue tools and banking."
                    title="Connect all your apps"
                />
                <MainPageCard
                    className="col-span-5"
                    image="card-bg-3.svg"
                    text="Lightning fast. Shortcuts for everything. Command+K on Mac, Ctrl+K on Windows. Dark mode."
                    title="You’re in control"
                />
            </div>
            <div className="my-[10rem]">
                <div className="flex flex-col w-1/2 px-2">
                    <h1 className="main-text text-[3rem] leading-[3.25rem]">
                        Meet Genius
                    </h1>
                    <p>
                        Our AI-driven assistant is designed to decode complex
                        financial figures and illuminate key trends in your
                        business.
                    </p>
                </div>
                <div className="px-2 grid grid-cols-2 gap-8 mt-12">
                    <MainPageCard
                        className="col-span"
                        image=""
                        text=""
                        title=""
                    />
                    <MainPageCard
                        className="col-span"
                        image=""
                        text=""
                        title=""
                    />
                </div>
            </div>
            <div className="w-full flex justify-center">
                <div className="faded-line absolute"></div>
                <div className="relative overflow-hidden h-full w-1/2 flex flex-col gap-10 items-center justify-center py-16">
                    <div className="shadow-container-small"></div>
                    <h2 className="main-text text-[2rem] text-center">
                        See where financial automation can take your business.
                    </h2>
                    <p>
                        The first financial tool you'll love. And the last one
                        you'll ever need.
                    </p>
                    <Button>Go to Journal</Button>
                </div>
            </div>
            <div className="w-full border-t-[0.5px] border-t-zinc-800 py-6">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex text-[0.8rem] gap-4">
                        <p>© 2023 Cobalt Financial Technologies Inc.</p>
                        <p className="cursor-pointer hover:text-white duration-200">
                            Privacy Policy
                        </p>
                        <p className="cursor-pointer hover:text-white duration-200">
                            Terms of Use
                        </p>
                    </div>
                    <div className="flex gap-8">
                        <FaTwitter className="text-[1.2rem] hover:text-white cursor-pointer duration-200" />
                        <FaLinkedin className="text-[1.2rem] hover:text-white cursor-pointer duration-200" />
                        <FaFacebook className="text-[1.2rem] hover:text-white cursor-pointer duration-200" />
                    </div>
                </div>
                <p className="text-[0.8rem] w-3/5 text-zinc-600 leading-6 mb-3">
                    Cobalt is a trademark or registered trademark of Cobalt
                    Financial Technologies Inc. Any other trademarks are the
                    property of their respective owners. Unless otherwise noted,
                    use of third party logos does not imply endorsement of,
                    sponsorship of, or affiliation with Cobalt.
                </p>
                <p className="text-[0.8rem] w-3/5 text-zinc-600 leading-6 mb-3">
                    Cobalt is a financial technology company, not a bank.
                    Banking services are provided by Celtic Bank and Evolve Bank
                    & Trust®, Members FDIC.
                </p>
            </div>
        </div>
    );
}
