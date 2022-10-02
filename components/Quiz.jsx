import React from "react"
import { nanoid } from 'nanoid'
import he from 'he'
import { useState } from "react"
import { useEffect } from "react"
import Option from "./Option"

export default function Quiz(props){
    
    const [check, setCheck] = useState(false)
    const [correctCount, setCorrectCount] = useState(0)

    const questions = props.question.map(question => {
        const array = [question.correct_answer].concat(question.incorrect_answers)
        
        const [options, setOptions] = useState([])
        const [clicked, setClicked] = useState(false)
        const [selected, setSelected] = useState([])

        useEffect(() =>{
                const shuffled = array
                .map(value => ({ value, sort: Math.random() }))
                .sort((a, b) => a.sort - b.sort)
                .map(({ value }) => value)
                setOptions(shuffled)
        },[])
        
        useEffect(() =>{
            if(selected.length){
                if(selected[0].answers === selected[0].correct_answer){
                    setCorrectCount(correctCount + 1)
                }
            }
        },[selected])

        function select(answers, question, correct_answer, e){
            const value = e.currentTarget.value
            setSelected(
                    selected.length
                    ?
                    selected.map(item => {
                        if(item.question === question){
                            return {...item, answers: answers, value: value}
                        }
                        return item
                    })
                    :
                    [{answers, question, correct_answer, value}]
                )

            setClicked(answers)
        }

        const optionsToSelect = options.map(answers => {

            return(
                <button
                    className={`answerBtn ${clicked === answers ? "clicked" : ""}`}
                    key={nanoid()}
                    onClick={(e) => select(answers, question.question, question.correct_answer, e)}
                    value={he.decode(answers)}
                    >{he.decode(answers)}
                </button>
            )
        })

        return (
            <div className="quizQuestions" key={nanoid()}>
                <h2>{he.decode(question.question)}</h2>
                <div className="answers">
                    {check ? <Option answerss={options} selectedAnswers={selected} checkk={check}/> : optionsToSelect}
                </div>
            </div>
        )
    })

    function checkResult(){
        setCheck(prevState => !prevState)
    }

    return (
        <>
            {questions}
            { !check ? 
            <button
                onClick={checkResult}
                className='check'>Check Answer
            </button> :
            <div className="playagain">
                <p>You scored {correctCount}/5 correct answers</p>
                <button
                    onClick={props.handleClick}
                    className='play'>Play again
                </button>
            </div>
            }
        </>
    )
}