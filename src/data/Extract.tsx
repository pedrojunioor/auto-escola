
const pdf = new String('')
// import { text, respostas } from './medicinadotrafego'
// import { text, respostas } from './legislacaodetransitogeral'
// import { text, respostas } from './legislacaodetransitoconceitos'
// import { text, respostas } from './legislacaodetransitosemaforica'
import { text, respostas } from './mecanicabasica'

export function extractQuestion() {

  // Separa as questões
  const questions = text.split(/\d+\.\s+/).filter(Boolean)
  const res = respostas.split('.').filter(Boolean)
  console.log('questions',questions)
  console.log('questions',respostas)
  const questionObjects = questions.map((question, i) => {
    const items = question.split(/\s*[A-E]\.\s+/).filter(Boolean)
    console.log(i,items)
    let temp = {
      Assunto: 'MECÂNICA BÁSICA',
      Pergunta: items[0],
      Resposta: '',
      A: items[1].replace(/(\r\n|\n|\r)/gm, ""),
      B: items[2].replace(/(\r\n|\n|\r)/gm, ""),
      C: items[3].replace(/(\r\n|\n|\r)/gm, ""),
      D: items[4].replace(/(\r\n|\n|\r)/gm, ""),
      E: items[5].replace(/(\r\n|\n|\r)/gm, ""),
    }
    temp.Resposta = temp[res[i]]
    return temp
  })
  const json = JSON.stringify(questionObjects)
  console.log('->',questionObjects)
  return questionObjects

}