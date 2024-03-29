import { AES, enc } from 'crypto-js'
import { collection, getDocs, query, where, setDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from '../services/firebase'

const cryptKey = import.meta.env.VITE_ENCRYPT;

export function encrypt(o: any, isJson: any) {
  if (isJson) {
    return AES.encrypt(JSON.stringify(o), cryptKey).toString();
  } else {
    return AES.encrypt(o, cryptKey).toString();
  }
}

export function decrypt(o: any, isJson: any) {
  if (isJson) {
    const bytes = AES.decrypt(o, cryptKey);
    return JSON.parse(bytes.toString(enc.Utf8));
  } else {
    const bytes = AES.decrypt(o, cryptKey);
    return bytes.toString(enc.Utf8);
  }
}

export function shuffleArray(arr: any) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export async function deleteQuestions (questoes){
  await deleteDoc(doc(db, "questoes", "188"));
  // questoes.forEach(async item => {
  //   await deleteDoc(doc(db, "cities", item));
  // })
}

export async function insert(questoes) {
  const querySnapshot = await getDocs(collection(db, "questoes"));
  let init = querySnapshot.size
  const questionsRef = collection(db, "questoes");

  // questoes.forEach(async (item, i) => {
  //   console.log(item)
  //   await setDoc(doc(questionsRef, `${init + i}`), item);
  // })

}