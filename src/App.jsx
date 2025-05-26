import { useState, useEffect, useRef, use } from 'react'
import { URL } from './constants.js'

import RecentSearch from './components/RecentSearch.jsx';
import QuestionAnswer from './components/QuestionAnswer.jsx';
function App() {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState([]);
  const [recentHistory, setRecentHistory] = useState(() => {
    const storedHistory = localStorage.getItem("history");
    return storedHistory ? JSON.parse(storedHistory) : [];
  });
  const [selectedHistory, setSelectedHistory] = useState("");
  const scrollToAns = useRef()
  const [loading, setLoading] = useState(false);
  const [intro, setIntro] = useState(true);

  const askQuestion = async () => {

    if (!question && !selectedHistory) {
      return false
    }

    if (question) {
      if (localStorage.getItem("history")) {
        let history = JSON.parse(localStorage.getItem("history"));

        history = [question, ...history];
        history = history.filter((item, index) => history.indexOf(item) === index); // Remove duplicates
        localStorage.setItem("history", JSON.stringify(history));
        setRecentHistory(history);
      } else {
        localStorage.setItem("history", JSON.stringify([question]));
        setRecentHistory([question]);
      }
    }
    const payloadData = question ? question : selectedHistory
    const payload = {
      "contents": [{
        "parts": [{
          "text": payloadData
        }]
      }]
    }
    setIntro(false);
    setLoading(true);
    let response = await fetch(URL, {
      method: "POST", body: JSON.stringify(payload)
    });
    response = await response.json();
    let dataString = response.candidates[0].content.parts[0].text;
    dataString = dataString.split("* ");
    dataString = dataString.map((item) => item.trim());
    setResult([...result, { type: 'q', text: question ? question : selectedHistory }, { type: 'a', text: dataString }]);
    setQuestion('')
    setTimeout(() => {
      scrollToAns.current.scrollTop = scrollToAns.current.scrollHeight;
    }, 500)
    setLoading(false);
    
    }

  

  const isEnter = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (question.trim() !== "") {
        askQuestion();
        setQuestion("");
      }
    }
  }
  useEffect(() => {
    askQuestion();

  }, [selectedHistory]);

  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme : 'dark';
  });

  useEffect(() => {
    if (darkMode === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', darkMode);
  }, [darkMode]);

  return (
    <div className={darkMode === 'dark' ? 'dark' : 'light'}>
      <div className="grid grid-cols-5 h-screen text-center">
        <select value={darkMode} onChange={(event) => setDarkMode(event.target.value)} className='fixed text-white bottom-3 p-5 dark:bg-gray-800 bg-zinc-900 rounded-full border border-zinc-700 left-3 z-50'>
          <option value="dark">Dark</option>
          <option value="light">Light</option>
        </select>
        <RecentSearch recentHistory={recentHistory} setRecentHistory={setRecentHistory} setSelectedHistory={setSelectedHistory} />
        <div className="col-span-4 p-10 flex flex-col justify-between">
          {intro ? <h1 className='text-4xl bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500 '>What can I help with?</h1> : null}
          {
            loading ? <div role="status">
              <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
              </svg>
              <span className="sr-only">Loading...</span>
            </div> : null
          }

          <div ref={scrollToAns} className="container h-110 overflow-auto scrollbar-hidden flex-grow" style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            overflow: 'hidden',
            overflowY: 'auto'
          }}>
            <div className='text-zinc-200'>
              <ul>{
                result.map((item, index) => (
                  <QuestionAnswer key={index} item={item} index={index} />

                ))
              }</ul>

            </div>

          </div>
          <div className="dark:bg-zinc-800 bg-indigo-600 w-1/2 text-white p-1 m-auto rounded-3xl border border-zinc-700 flex h-16 pr-2 mt-auto justify-center items-center self-end">
            <input type="text" placeholder="Ask anything" className="w-full h-full p-3 outline-none" value={question} onChange={(event) => {
              setQuestion(event.target.value)
            }} onKeyDown={isEnter} />
            <button className={`rounded-full w-10 h-10 hover:cursor-pointer ${darkMode === 'dark' ? 'bg-white hover:bg-gray-200 text-black' : 'bg-blue-500 hover:bg-blue-600 text-white'}`} onClick={
              askQuestion
            }>🔍</button>
          </div>
        </div>
      </div>
    </div>
  )
  
}

export default App
