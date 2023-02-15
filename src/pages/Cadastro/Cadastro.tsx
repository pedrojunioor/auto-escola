import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/context";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useNavigate } from "react-router-dom";
import './Cadastro.scss'

export const Cadastro = () => {

  const navigate = useNavigate();

  const { register, handleSubmit, clearErrors, setError, formState: { errors } } = useForm();
  const { handleCreateAccount, isLogged } = useContext(AuthContext)

  useEffect(() => {
    console.log('e',errors)
    Object.values(errors).forEach(item => {
      if (item?.type === 'pattern') {
        setError('email', { type: 'pattern', message: 'Formato de e-mail invalido' });
      }
    })

  }, [errors,setError])

  const onSubmit = async (e, data: any) => {
    await handleCreateAccount(e, data)
  }

  useEffect(() => {
    if (isLogged) {
      navigate("/home");
    }
  }, [isLogged]);

  return (
    <div className="containerC">
      <div className="container-cadastro">
        <div className="header-cadastro">
          <h1>Cadastre-se</h1>
        </div>
        <div className="form-cadastro">
          <form onSubmit={handleSubmit(onSubmit)} >
            <div className="input-text">
              <label htmlFor="name">Nome:</label>
              <input
                type="text"
                id="name"
                placeholder="Insira seu nome"
                autoComplete="name"
                maxLength={20}
                {...register("name", { required: "Um nome deve ser fornecido", maxLength: 20 })}
              />
              <ErrorMessage errors={errors} name="name" />

            </div>
            <div className="input-text">
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                placeholder="Insira seu email"
                autoComplete="username"
                {...register("email", { required: "Um email deve ser fornecido ", maxLength: 20, pattern: /^\S+@\S+$/i })}              
              />
              <ErrorMessage errors={errors} name="email" />

            </div>
            <div className="input-text">
              <label htmlFor="password">Senha:</label>
              <input
                type="password"
                placeholder="Insira sua senha"
                autoComplete="new-password"
                {...register("password", { required: "Uma senha deve ser fornecido ", maxLength: 20 })}
              />
              <ErrorMessage errors={errors} name="password" />

            </div>
            <div className="input-text">
              <label htmlFor="confirm-password"> Confirme a senha:</label>
              <input
                type="password"
                placeholder="Confirme sua senha"
                autoComplete="confirm-password"
                {...register("confirmPassword", { required: "A confirmação de senha deve ser fornecida", maxLength: 20 })}
              />
              <ErrorMessage errors={errors} name="confirmPassword" />
            </div>
            <div className='input-button'>
              <button type='submit'>Cadastrar</button>
            </div>
          </form>
        </div>
        <div className="footer-login">
          <span style={{ textDecoration: 'underline' }}
            onClick={() => navigate('/')}
          > Voltar a tela de Login</span>
        </div>
      </div>

    </div >
  )
}