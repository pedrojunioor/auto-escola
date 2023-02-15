
import { useContext, createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { StorageContext } from "./contextStorage";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth, db } from '../services/firebase'

import { collection,  getDoc, setDoc, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendPasswordResetEmail
} from "firebase/auth";

import { encrypt } from '../utils/index'
import { decrypt } from '../utils/index'

const AuthContext = createContext({} as any)
function AuthProvider({ children }: any) {

  const { setRole, setIsLoggedStorage } = useContext(StorageContext)

  const navigate = useNavigate()
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [isLogged, setIsLogged] = useState(() => {
    const isLogged = localStorage.getItem('token');
    return !!isLogged
  })

  useEffect(() => {
    const user = localStorage.getItem("user") ? decrypt(localStorage.getItem("user"), true) : null;
    if (user) {
      setUser(user)
    }
  }, [])

  async function forgotPassword(e: any, email: string) {
    e.preventDefault()
    let result = false
    await sendPasswordResetEmail(auth, email).then(() => {
      toast.success('Email-enviado')
      result = true
    }).catch((error) => {
      toast.error(`${error.code}`)
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
    return result
  }

  async function toggleActiveUser(param: string, key: string, value: string) {
    const userRef = doc(db, 'users', param);
    await updateDoc(userRef, {
      [key]: value,
      updateAt: serverTimestamp()
    });
  }


  async function handleCreateAccount(data: any) {
    if (data['password'] !== data['confirmPassword']) {
      toast.error('As senhas não conferem')
    } else {
      await createUserWithEmailAndPassword(auth, data['email'], data['password'])
        .then((userCredential) => {
          const user = userCredential.user;
          const userUpdate = auth.currentUser
          if (userUpdate) {
            updateProfile(userUpdate, {
              displayName: data['name']
            }).then(async () => {
              data.role = 'aluno'
              data.active = false
              data.password = encrypt(data.password, true)
              delete data.confirmPassword
              try {
                const userRef = doc(db, 'users', data.email);
                await setDoc(userRef, data, { merge: true });
              } catch (e) {
                console.error("Error adding document: ", e);
              }

              // Profile updated!
              localStorage.setItem("token", user.refreshToken);
              localStorage.setItem("user", encrypt(user.providerData[0], true));
              setIsLogged(true)
              setIsLoggedStorage(true)
              setUser(user)
              navigate('/')
              toast.success(`Usuario Cadastrado com Sucesso`)
              // ...
            }).catch((error) => {
              // An error occurred
              // ...
            });
          }

        })
        .catch((error) => {
          toast.error(`${error.code}`)
        });
    }
  }

  async function handleLogin(data: any) {
    setIsLoading(true)
    await signInWithEmailAndPassword(auth, data['email'], data['password'])
      .then(async (userCredential) => {
        console.log(userCredential)
        const user = userCredential.user;
        const docRef = doc(db, "users", `${user.email}`);
        const docSnap = await getDoc(docRef);
        const data = docSnap.data()
        localStorage.setItem("token", user.refreshToken);
        localStorage.setItem("role", data?.role);
        localStorage.setItem("user", encrypt(user.providerData[0], true));
        setUser(user)
        setIsLogged(true)
        setIsLoggedStorage(true)
        // ...
      })
      .catch((error) => {
        toast.error(`${error.message}`)
        // toast.error(`${error.code}`)
        const errorCode = error.code;
        const errorMessage = error.message;
      }).finally(() => {
        setIsLoading(false)
      })
  }

  async function handleLogout(e: any) {
    e.preventDefault()
    signOut(auth).then(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      setIsLogged(false)
      setIsLoggedStorage(false)
      setUser(null)
      navigate("/");
    }).catch((error) => {
      // An error happened.
    });
  }

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      isLogged,
      setIsLoading,
      handleLogin,
      handleCreateAccount,
      handleLogout,
      forgotPassword,
      toggleActiveUser
    }}>
      <ToastContainer />
      {children}
    </AuthContext.Provider>
  );
}


export { AuthContext, AuthProvider };