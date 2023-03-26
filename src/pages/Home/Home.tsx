import './Home.scss'
import image from '../../assets/welcome.jpg'

export const Home = () => {
  return (
    <div className='home-container'>
      <div className='welcome-text '>
        <h2 >Bem-vindo à nossa aplicação web de simulado para exames teóricos do Detran!</h2>
        <p >Com nosso sistema, você pode praticar para seu exame de habilitação em qualquer lugar, a qualquer momento. Oferecemos uma variedade de questões personalizadas para que você possa se preparar de forma eficiente. Nossa equipe está sempre melhorando o conteúdo e a usabilidade do sistema. Comece a praticar agora e boa sorte no seu exame!</p>
      </div>
      <div className='welcome-figure'>
        <img src={image} alt="Banner de boas-vindas" />
      </div>
    </div>
  )
}