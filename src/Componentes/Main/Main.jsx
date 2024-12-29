import React, { useContext, useState } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Constext } from '../../context/Context'
export default function Main() {
           const [disableSendButton, setDisableSendButton ] =useState(false)
   function handleInput(e)
   {

      const value = e.target.value
       setInput(value)
        if(value.trim()==="")
        {
          setDisableSendButton(false)
        }
        else
        {
           setDisableSendButton(true)
        }
   }
 
   const { input,
    setInput,
    setRescentPromt,
    recentPromt,
    setPrevPrompt,
    prevPrompt,
    showResult,
    loading,
    resultData,  
    onSent} =  useContext(Constext)

     
   
  return (
    <div className='main'> 
           <div className='nav'>
               <p>Gimini</p>
               <img src={assets.user_icon}></img>
           </div>
             

             {!showResult ?
             <div className='main-cotainer'>
              <div className='greet'>
                    <p>Hello, Ankit</p>
              </div>
             </div>
             :  <div className='result'>
                <div className='result-title'>
                    <img src={assets.user_icon} />
                    <p>{recentPromt}</p>
                </div>
                <div className='result-data'>
                   <img src={assets.gemini_icon} />
                   {loading ?
                   
                    <div  className='loader'>
                       <hr/>
                       <hr/>
                       <hr/>
                    </div> 

                    : <p dangerouslySetInnerHTML={{ __html: resultData }}></p>

                   }
                   </div>
             </div>
             }

       <div className='main-bottom'>
       <div className='search-box'>
       <img src={assets.gallery_icon} alt='Gallery Icon' />
        <input onChange={handleInput} value={input} type='text' placeholder='Ask Gemini' />
       
        <div>
        
          <img src={assets.mic_icon} alt='Mic Icon' />
          {
            disableSendButton ? 
          
           <img onClick={()=>(onSent())} src={assets.send_icon} alt='Mic Icon' />
           : null
          }
        </div>
      </div>
    </div>
            
    </div>
  )
}
