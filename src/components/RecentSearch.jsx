function RecentSearch({recentHistory, setRecentHistory, setSelectedHistory}) {

    const clearHistory = () => {
        localStorage.clear();
        setRecentHistory([])
    
      }
      const clearselectedHistory = (selecteditem) => {
        let history = JSON.parse(localStorage.getItem("history"));
        history = history.filter((item) => item !== selecteditem);
        localStorage.setItem("history", JSON.stringify(history));
        setRecentHistory(history);
        if (history.length === 0) {
            setSelectedHistory("");
        }
      }
    return (
        <>
            <div className="col-span-1 dark:bg-zinc-800 bg-zinc-100">
                <h1 className='text-xl dark:text-white text-zinc-800 flex justify-evenly mt-10'> <span>Recent Search</span>
                    <button onClick={clearHistory} className='cursor-pointer'><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#1F8EFB"><path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z" /></svg></button>
                </h1>
                <ul className='text-left text-sm p-5 h-full overflow-auto mt-2'>
                    {
                        recentHistory && recentHistory.map((item,index) => (
                            <div className="flex justify-between  py-1 w-full" key={index}>
                            <li key={index} onClick={() => {
                                setSelectedHistory(item);
                            }} className='pl-3 dark:text-zinc-400 text-zinc-800 cursor-pointer hover:dark:bg-zinc-700 hover:bg-zinc-200 hover:dark:text-zinc-200 hover:text-zinc-600 truncate px-5 pb-1 pt-1'>{item}<br /></li>
                            <button onClick={()=>clearselectedHistory(item)}className='cursor-pointer'><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#1F8EFB"><path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z" /></svg></button> 
                            </div>
                            
                        ))
                    }
                </ul>
            </div>
        </>
    )
}
export default RecentSearch;