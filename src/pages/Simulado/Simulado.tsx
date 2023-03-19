import './Simulado.scss'
import React, { useState, useEffect } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../services/firebase'
import { shuffleArray } from '../../utils/index'
import { encrypt, decrypt } from '../../utils/index'
import { RadioGroup, Item, Indicator } from '@radix-ui/react-radio-group';
import { CountdownDefault } from '../../components/CountdownDefault/CountdownDefault'


export const Simulado = () => {

  const [questions, setQuestions] = useState<any>(undefined)
  const [currentQuestion, setCurrentQuestion] = useState<any>(undefined)
  const [indexCurrentQuestion, setIndexCurrentQuestion] = useState<number>(0)
  const [value, setValue] = useState('')

  // localStorage.setItem("@ipm:token", encrypt(token, false));

  useEffect(() => {
    if (questions === undefined) {
      getQuestions()
    }
  }, [questions])

  async function getQuestions() {
    const querySnapshot = await getDocs(collection(db, "questoes"));
    const questionsTemp: any = []
    querySnapshot.forEach((doc) => {
      let question = doc.data()
      questionsTemp.push(question)
    });
    let shuffleArrayTemp = shuffleArray(questionsTemp)
    setQuestions(shuffleArrayTemp)
    if (shuffleArrayTemp.length > 0) {
      setCurrentQuestion(shuffleArrayTemp[indexCurrentQuestion])
    }
  }

  useEffect(() => {
    const choicesTemp = localStorage.getItem("choices") ? decrypt(localStorage.getItem("choices"), true) : null;
    console.log('ESCOLHAS', choicesTemp)
  }, [indexCurrentQuestion])

  useEffect(() => {
    if (currentQuestion) {

      console.log(currentQuestion.Pergunta, '->', value)
    }
  }, [value])

  function handleSubmitInputValue(e) {
    e.preventDefault()
    const choicesTemp = localStorage.getItem("choices") ? decrypt(localStorage.getItem("choices"), true) : null;
    console.log('MP SUBMIT', choicesTemp)
    if (currentQuestion) {
      let pergunta = currentQuestion.Pergunta
      let temp = {
        [pergunta]: value
      }
      if (choicesTemp !== null) {
        choicesTemp.push(temp)
        localStorage.setItem("choices", encrypt(choicesTemp, true));
      } else {
        localStorage.setItem("choices", encrypt([temp], true));
      }
    }
  }

  const handleBuildOptionsValues = () => {
    if (currentQuestion !== undefined) {
      let currentQuestionT = Object.assign({}, currentQuestion);
      delete currentQuestionT['Pergunta']
      delete currentQuestionT['Resposta']
      const values = Object.entries(currentQuestionT)
      return values.sort().map((item: any) => {
        return <div key={item[0]} style={{ display: 'flex', alignItems: 'center' }}>
          <Item className="RadioGroupItem" value={item[1]} id="r1">
            <Indicator className="RadioGroupIndicator" />
          </Item>
          <label className="Label" htmlFor="r1">
            <h4>
              {`${item[0]} - ${item[1]}`}
            </h4>
          </label>
        </div>
      })
    }
    else {
      return <></>
    }
  }

  function handleCurrentQuestion(action) {
    let index: number = indexCurrentQuestion
    if (action === 'B' && index > 0) {
      setIndexCurrentQuestion(index - 1)
    }
    else if (action === 'N' && index < questions.length - 1) {
      setIndexCurrentQuestion(index + 1)
    }
  }

  useEffect(() => {
    if (questions !== undefined && questions.length > 0) {
      setCurrentQuestion(questions[indexCurrentQuestion])
    }
  }, [indexCurrentQuestion])

  const [choices, setChoices] = useState<[]>([])


  useEffect(() => {
    if (currentQuestion) {

      console.log('currentQuestion', currentQuestion)
    }
  }, [currentQuestion])


  return (
    <div className='containerSimulado'>
      <div>
        <CountdownDefault />
      </div>
      <div>
        {currentQuestion !== undefined &&
          <form onSubmit={handleSubmitInputValue} >
            <h1>{currentQuestion['Pergunta']}</h1>
            <RadioGroup className="RadioGroupRoot" defaultValue="" onValueChange={setValue} aria-label="View density">
              {handleBuildOptionsValues()}
            </RadioGroup>
            <div style={{ display: 'flex', gap: '10px' }}>
              {indexCurrentQuestion > 0 ?
                <button onClick={() => handleCurrentQuestion('B')} style={{ backgroundColor: 'orange', padding: '8px', borderRadius: "8px", marginTop: '15px' }} type='button'>Voltar</button>
                :
                <button onClick={() => handleCurrentQuestion('B')} disabled style={{ backgroundColor: 'orange', padding: '8px', borderRadius: "8px", marginTop: '15px', cursor: 'not-allowed' }} type='button'>Voltar</button>
              }
              {indexCurrentQuestion < questions.length - 1 ?
                <button onClick={() => handleCurrentQuestion('N')} style={{ backgroundColor: 'orange', padding: '8px', borderRadius: "8px", marginTop: '15px' }} type='button'>Avancar</button>
                :
                <button onClick={() => handleCurrentQuestion('N')} disabled style={{ backgroundColor: 'orange', padding: '8px', borderRadius: "8px", marginTop: '15px', cursor: 'not-allowed' }} type='button'>Avancar</button>
              }
              <button style={{ backgroundColor: 'blue', padding: '8px', borderRadius: "8px", marginTop: '15px', marginLeft: 'auto' }} type='submit'>Responder</button>
            </div>
          </form>
        }
      </div>
      {/* <h4 style={{ color: '#000000' }}> */}
      {/* {choices.forEach((item: any) => {
          console.log(item)
        })
        } */}
      {/* </h4> */}
    </div >
  )
}