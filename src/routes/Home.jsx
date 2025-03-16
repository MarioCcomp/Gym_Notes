import React from 'react'

import {Link} from 'react-router-dom'

import './Home.css'


const Home = () => {
  return (
    <div>
        <div id="header">
        <img src="https://i.pinimg.com/736x/3f/c8/12/3fc81274aef4fce9c012ec53d8918d29.jpg" alt="logo" />
        {/* imagem do gym notes */}
        <div id="title">
        <h1>Gym Notes</h1>
        <p>Seu app de treino</p>
        </div>
        <img src="https://static.vecteezy.com/system/resources/previews/005/005/788/non_2x/user-icon-in-trendy-flat-style-isolated-on-grey-background-user-symbol-for-your-web-site-design-logo-app-ui-illustration-eps10-free-vector.jpg" alt="" />
        </div>
        <div id="main-container">
        <Link to='/workouts'><div className="options">Gerenciar Treinos</div></Link>
            <div className="options">Meu Progresso</div>
            <div className="options">Frequência</div>
            <div className="options">Menu</div>
        </div>

    </div>
  )
}

export default Home