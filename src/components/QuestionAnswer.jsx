
import Answers from './Answers.jsx';
const QuestionAnswer = ({item,index}) => {
  return (
    <div>
      <div key={index + Math.random()} className={item.type == 'q' ? 'flex justify-end mb-10' : ""}>
                  {
                    item.type == 'q' ? <li key={index + Math.random()} className='text-right p-1 border-8 bg-zinc-700 border-zinc-700 rounded-tl-3xl rounded-br-3xl rounded-bl-3xl w-fit'><Answers ans={item.text} totalResult={1} index={index} type={item.type} /></li> : item.text.map((ansItem, ansIndex) => (
                      <li key={ansIndex + Math.random()} className='text-left p-1 
       text-zinc-800 
       dark:text-zinc-100  '><Answers ans={ansItem} totalResult={item.length} index={ansIndex} type={item.type} /></li>
                    ))
                  }
                </div>
    </div>
  )
}

export default QuestionAnswer
