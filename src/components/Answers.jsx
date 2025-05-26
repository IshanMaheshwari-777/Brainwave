import React from 'react'
import { useEffect,useState } from 'react'
import { chechheading, replaceheadingStars } from '../helper'



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
   
    return (
        <>
            {
            index==0 && totalResult>1 ?<span className='text-lg pt-2 block '>{answer}</span>:
        
            heading? <span className='text-lg pt-2 block font-bold'>{answer}</span>: <span className={type=='q'?'pl-1':'pl-5'}>{answer}</span>
            }
        </>
    )
}
export default Answers;