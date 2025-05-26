import React from 'react'
import { useEffect,useState } from 'react'
import { chechheading, replaceheadingStars } from '../helper'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ReactMarkdown from 'react-markdown';


const Answers=({ans,index, totalResult, type})=>{
    const [heading, setHeading] = useState(false);

    const [answer, setAnswer] = useState(ans);
    // console.log(index)
    
    useEffect(() => {
        if (chechheading(ans)) {
            setHeading(true);
            setAnswer(replaceheadingStars(ans));
        }

    },[])

    const renderer={
        code: ({node, inline, className, children, ...props}) => {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
                <SyntaxHighlighter 
                {...props}
                children={String(children).replace(/\n$/, '')}
                language={match[1]}
                style={dark}
                PreTag='div'                />
            ) : (
                <code {...props} className={className}>
                    {children}
                </code>
            );
        },
        link: ({href, children}) => {
            return (
                <a href={href} target="_blank" rel="noopener noreferrer" className='text-blue-500 hover:underline'>
                    {children}
                </a>
            );
        }
    }
   
    return (
        <>
            {
            index==0 && totalResult>1 ?<span className='text-lg pt-2 block '>{answer}</span>:
        
            heading? <span className='text-lg pt-2 block font-bold'>{answer}</span>: <span className={type=='q'?'pl-1':'pl-5'}>
                <ReactMarkdown components={renderer}  children={answer} />
            </span>
            }
        </>
    )
}
export default Answers;