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

  // const correctAnswers = questions.map(ans => {
  //   return he.decode( ans.correct_answer)
  // })

  const quiz = questions.map(question => {
    
    const array = [question.correct_answer].concat(question.incorrect_answers)
    //copied shuffle code
    const shuffled = array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
    
    return <Quiz
            key={nanoid()}
            id={nanoid()}
            question={question.question}
            answers={shuffled}
          />
  })

  function checkResult(){
    // const ll = playerAnswers.length < 5 || playerAnswers.length > 5 ? "incomplete" : correctAnswers.filter(correctAnswer => {
    //   return playerAnswers.includes(correctAnswer)
    // })
    // console.log(ll)
  }

  return (
    <>
      { start && <Onboard handleClick={startQuiz}/>}
      {quiz}
      <button
        onClick={checkResult}
        className='check'>Check Answer</button>
    </>
  )
}

export default App
