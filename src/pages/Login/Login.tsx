import './Login.scss'
import React, { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { AuthContext } from "../../context/context";
import { useNavigate } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';

import { CModal } from './../../components/Modal/Modal';

export const Login = () => {

  const navigate = useNavigate();
  const { handleLogin, isLogged, forgotPassword, isLoading } = useContext(AuthContext)
  const { register, handleSubmit, setError, formState: { errors } } = useForm();
  const [emailForgot, setEmailForgot] = useState<string>('')

  const [showModal, setShowModal] = useState<boolean>(false)

  function handleCloseModal() {
    setShowModal(false)
  }

  const onSubmit = async (e: any, data: any) => {
    await handleLogin(e, data)
  }

  useEffect(() => {
    if (isLogged) {
      navigate("/home");
    }
  }, [isLogged]);

  async function handleForgotPassword(e: any, email: any) {
    if (await forgotPassword(e, email) === true) {
      setEmailForgot('')
      handleCloseModal()
    }
  }

  return (
    <div className="containerL">
      <div className="container-login">
        <div className="header-login">
          <h1>Login</h1>
        </div>

        <div className="form-login">
          <form onSubmit={handleSubmit(onSubmit)} >
            <div className="input-text">
              <label >Email:</label>
              <input
                type="text"
                id="email"
                placeholder="Insira seu email"
                autoComplete="username"
                {...register("email", { required: "O email deve ser fornecido" })}
              />
              <ErrorMessage errors={errors} name="email" />
            </div>
            <div className="input-text">
              <label >Senha:</label>
              <input
                type="password"
                id="password"
                autoComplete="current-password"
                placeholder="Insira sua senha"
                {...register("password", { required: "O password deve ser fornecido", maxLength: 20 })}
              />
              <ErrorMessage errors={errors} name="password" />
            </div>
            <div className='input-button'>
              {!isLoading ?
                <button type='submit'>Login</button>
                :
                <div style={{ display: 'flex', gap: '20px' }}>
                  <span>loading ...</span>
                  <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                </div>
              }
              <span>ou</span>
              <button
                type="button"
                onClick={() => navigate('cadastro')}
              >Cadastre-se</button>
            </div>
          </form>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <span style={{ textDecoration: 'underline' }}
              onClick={() => setShowModal(true)}
            > Esqueci a senha
            </span>
          </div>
        </div>
        <CModal
          show={showModal}
          title="Esqueci a senha"
          handleClose={() => handleCloseModal()}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <form onSubmit={e => handleForgotPassword(e, emailForgot)}>
              <div className="input-text">
                <label htmlFor="email">E-mail cadastrado:</label>
                <input
                  type="text"
                  id="email"
                  placeholder="Insira seu email"
                  autoComplete="username"
                  value={emailForgot}
                  onChange={e => setEmailForgot(e.target.value)}
                />
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <button type='submit'>Enviar</button>
              </div>
            </form>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <span
                onClick={() => handleCloseModal()}
              >Voltar</span>
            </div>
          </div>
        </CModal >
      </div>

    </div>
  )
}