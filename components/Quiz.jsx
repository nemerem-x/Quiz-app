import React from "react"
import { nanoid } from 'nanoid'
import he from 'he'
import { useState } from "react"

export default function Quiz(props){
    
    const [selected, setSelected] = useState([])

    // console.log(selected)

    const questions = props.question.map(question => {
        const array = [question.correct_answer].concat(question.incorrect_answers)
        //copied shuffle code
        const shuffled = array
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
        
        const [clicked, setClicked] = useState(false)

        function select(answers, question, correct_answer){

            setSelected(
                    selected.length
                    ?
                    selected.map(item => {
                        if(item.question === question){
                            return {...item, answers: answers}
                        }
                        return item
                    })
                    :
                    [{answers, question, correct_answer}]
                )

            setClicked(answers)
        }

        const options = shuffled.map(answers => {

            return(
                <button
                    className={`answerBtn ${clicked === answers ? "clicked" : ""}`}
                    key={nanoid()}
                    onClick={() => select(answers, question.question, question.correct_answer)}
                    value={answers}
                    >{answers}
                </button>
            )
        })

        return (
            <div className="quizQuestions" key={nanoid()}>
                <h2>{he.decode(question.question)}</h2>
                <div className="answers">
                    {options}
                </div>
            </div>
        )
    })

    return (
        <>
            {questions}
        </>
    )
}