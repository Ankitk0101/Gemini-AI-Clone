import { createContext, useState } from "react";
import run from "../Config/Gemini";
import { Prev } from "react-bootstrap/esm/PageItem";

export const Constext = createContext();

const ConstextProvider =( props) =>{
             
    
      const [input , setInput ] = useState("")
      const [recentPromt , setRescentPromt] = useState("")
      const [prevPrompt , setPrevPrompt] = useState([])
      const [showResult , setShowResult] = useState(false)
      const [loading, setLoading ] = useState(false)
      const [resultData, setResultData] = useState(false)
      
    const delayPara = (index, nextword)=>{
         setTimeout( ()=>{
            setResultData(prev =>prev+nextword )
         },34*index)
    }
 
    const newChat = ()=>{
           setLoading(false)
           setShowResult(false)

    }


    const onSent = async (prompt) =>{
              
      setResultData("")
      setLoading(true)
      setShowResult(true)

      let response ;
       if(prompt !== undefined)
       {
         response = await run(prompt)
         setRescentPromt(prompt)
          
       }
       else
       {
           setPrevPrompt(prevPrompt => [...prevPrompt,input])
           setRescentPromt(input)
           response = await run(input)
       }
     
      let responseArray = response.split("**");
      let newResponse = ""; 

for (let i = 0; i < responseArray.length; i++) {
  if (i === 0 || i % 2 !== 1) {
    
    newResponse += responseArray[i];
  } else {
    
    newResponse += "<b>" + responseArray[i] + "</b>";
  }
}

let newResponse2 = newResponse.split("*").join("<br>");

     let newResponseArray = newResponse2.split(" ");
      for(let i =0 ;i<newResponseArray.length; i++) {
              const nextWord = newResponseArray[i]
              delayPara(i,nextWord+" ")
      }

       setLoading(false)
       setInput("")
    }

      
         
    const constextValue = {
      input,
      setInput,
      setRescentPromt,
      recentPromt,
      setPrevPrompt,
      prevPrompt,
      showResult,
      loading,
      resultData,  
      onSent,
      newChat

    }

    return (
        <Constext.Provider value={constextValue}>
             {props.children}
          </Constext.Provider>
    )
}

export default ConstextProvider