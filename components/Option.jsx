import React from "react"
import { nanoid } from 'nanoid'
import he from 'he'
import { useState } from "react"
import { useEffect } from "react"

export default function Option({selectedAnswers, answerss, chekk}){

    const optionsToSelect = answerss.map(answers =>{

        const [buttonResult, setButtonResult] = useState('')

        useEffect(() =>{
            function runCheck(){
                if (selectedAnswers.length == 0){
                    return ''
                } else if(answers !== selectedAnswers[0].correct_answer && answers === selectedAnswers[0].value){
                    setButtonResult("wrong")
                } else if(selectedAnswers[0].correct_answer  === answers) {
                    setButtonResult("correct")
                } else if(answers !== selectedAnswers[0].correct_answer && answers !== selectedAnswers[0].value){
                    setButtonResult("")
                }
            }
            runCheck()
        },[selectedAnswers])

        return (
            <button
                className={`resultBtn ${buttonResult}`}
                key={nanoid()}
                value={he.decode(answers)}
                >{he.decode(answers)}
            </button>
        )
    })

    return(
        <>
            {optionsToSelect}
        </>
    )

}