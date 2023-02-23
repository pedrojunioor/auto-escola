import './Simulado.scss'
import React, { useState, useEffect } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../services/firebase'
import { shuffleArray } from '../../utils/index'
import { RadioGroup, Item, Indicator } from '@radix-ui/react-radio-group';


export const Simulado = () => {

  const [questions, setQuestions] = useState<any>(undefined)
  const [currentQuestion, setCurrentQuestion] = useState(undefined)
  const [indexCurrentQuestion, setIndexCurrentQuestion] = useState<number>(0)
  const [value, setValue] = useState('')

  useEffect(() => {
    if (questions === undefined) {
      getQuestoes()
    }
  }, [questions])

  async function getQuestoes() {
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

  function handleSubmitInputValue(e) {
    e.preventDefault()
    alert(value)
  }

  // useEffect(() => {
  //   console.log('value', value)
  // }, [value])

  useEffect(() => {
    console.log('QUESTOES', questions)
    console.log('QUESTAO ATUAL', currentQuestion)
  }, [currentQuestion])

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
            {`${item[0]} - ${item[1]}`}
          </label>
        </div>
      })
    }
    else {
      return <></>
    }
  }

  function handleCurrentQuestion(action) {
    console.log('ACAO', action)
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

  return (
    <div className='containerSimulado'>
      <div>
        {currentQuestion !== undefined &&
          <form onSubmit={handleSubmitInputValue} >
            <h1>{currentQuestion['Pergunta']}</h1>
            <RadioGroup className="RadioGroupRoot" defaultValue="" onValueChange={setValue} aria-label="View density">
              {handleBuildOptionsValues()}
            </RadioGroup>
            <div style={{ display: 'flex', gap: '10px' }}>
              {indexCurrentQuestion > 0 ?
                <button onClick={() => handleCurrentQuestion('B')} style={{ backgroundColor: 'orange', padding: '8px', borderRadius: "8px", margin: '15px 0' }} type='button'>Voltar</button>
                :
                <button onClick={() => handleCurrentQuestion('B')} disabled style={{ backgroundColor: 'orange', padding: '8px', borderRadius: "8px", margin: '15px 0', cursor: 'not-allowed' }} type='button'>Voltar</button>
              }
              {indexCurrentQuestion < questions.length - 1 ?
                <button onClick={() => handleCurrentQuestion('N')} style={{ backgroundColor: 'orange', padding: '8px', borderRadius: "8px", margin: '15px 0' }} type='button'>Avancar</button>
                :
                <button onClick={() => handleCurrentQuestion('N')} disabled style={{ backgroundColor: 'orange', padding: '8px', borderRadius: "8px", margin: '15px 0', cursor: 'not-allowed' }} type='button'>Avancar</button>
              }
              <button style={{ backgroundColor: 'blue', padding: '8px', borderRadius: "8px", marginTop: '15px', marginLeft:'auto' }} type='submit'>Responder</button>
            </div>
          </form>
        }
      </div>
    </div >
  )
}