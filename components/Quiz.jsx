import React from "react"
import { nanoid } from 'nanoid'
import he from 'he'
import { useState } from "react"

export default function Quiz(props){

    const [toggle, setToggle] = useState('')
    const [selectedAnswers, setSelectedAnswers] = useState([])

    function selectAnswer(ans){
        setToggle(ans)
        setSelectedAnswers(prevState => {
            return [
                ...prevState, ans
            ]
        })
    }

    console.log(selectedAnswers)
    console.log(toggle)

    const answers = props.answers.map(answer => {
        return <button 
                className={`answerBtn ${toggle === he.decode(answer) ? "clicked" : ''}`}
                key={nanoid()}
                onClick={() => selectAnswer(he.decode(answer))}
                value={he.decode(answer)}
                >{he.decode(answer)}</button>
    })

    return (
        <>
            <div className="quizQuestions">
                <h2>{he.decode(props.question)}</h2>
                <div className="answers">
                    {answers}
                </div>
            </div>
        </>
    )
}