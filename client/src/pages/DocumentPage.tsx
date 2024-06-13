const DocumentPage = () => {
    return (
        <div className="h-full">
            <div className="flex gap-8 p-8">
                <div className="stat-card"></div>
                <div className="stat-card"></div>
                <div className="stat-card"></div>
                <div className="stat-card"></div>
            </div>
            <div>
                <form className="text-[0.9rem] flex">
                    <div className="flex flex-col">
                        <label htmlFor="number">#</label>
                        <input
                            type="text"
                            id="number"
                            className="bg-gray-600/10 ring-1 ring-zinc-100/15"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="number">Amount</label>
                        <input
                            type="text"
                            id="number"
                            className="bg-gray-600/10 ring-1 ring-zinc-100/15"
                        />
                    </div>
                </form>
                <table></table>
            </div>
        </div>
    );
};

export default DocumentPage;
