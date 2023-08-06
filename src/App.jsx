import { useEffect, useState } from 'react'
import './App.css'
import { getData } from './api';
import { Cards } from './Cards';
import logo from "./assets/logo.svg";

function App() {
  const [data, setData] = useState(undefined);
  const [score, setScore] = useState(0);
  
  useEffect(()=>{
    getData().then((res)=>{
      setData(res);
    });
  }, []);

  function incrementScore(){
    setScore(score + 1);
  }

  function gameEnd(){
    const popup = document.querySelector(".popup");
    const background = document.querySelector("#root");

    background.classList.toggle("show");
    popup.classList.toggle("show");
  }

  return (
    <>
      <div className='popup'>
        <p>You lost :(</p>
      </div>
      <header>
        <img src={logo}></img>
        <p>Memory Game</p>
      </header>
      <div className='scoreboard'>
        {score}
      </div>
      {data ? <Cards data={data} incrementScore={incrementScore} gameEnd={gameEnd}/> : "Loading"}
    </>
  )
}

export default App
