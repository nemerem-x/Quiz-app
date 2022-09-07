import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import './App.css'
import Quiz from '../components/Quiz'
import Onboard from '../components/Onboard'

function App() {

  const [start, setStart] = useState(true)

  function startQuiz(){
    setStart(prevStart => !prevStart)
  }
  
  const [questions, setQuestions] = useState([])
  
  useEffect(() => {
      async function getQuestions(){
          const res = await fetch(`https://opentdb.com/api.php?amount=5&difficulty=easy`)
          const data = await res.json()
          setQuestions(data.results)
      }
      getQuestions()
  }, [])

  function checkResult(){
    // const ll = playerAnswers.length < 5 || playerAnswers.length > 5 ? "incomplete" : correctAnswers.filter(correctAnswer => {
    //   return playerAnswers.includes(correctAnswer)
    // })
    // console.log(ll)
  }

  const options = questions.map(question => {
    const array = [question.correct_answer].concat(question.incorrect_answers)
    //copied shuffle code
    const shuffled = array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
    return shuffled
  })

  return (
    <>
      { start && <Onboard handleClick={startQuiz}/>}
      <Quiz
            key={nanoid()}
            id={nanoid()}
            question={questions}
            answerOptions={options}
      />
      <button
        onClick={checkResult}
        className='check'>Check Answer</button>
    </>
  )
}

export default App
