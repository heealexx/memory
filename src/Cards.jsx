import { useEffect, useState } from "react";
import "./Cards.css";
import pokemonCard from "./assets/pokemonBack.png";

export function Cards({data, incrementScore, gameEnd}){
  const shuffledPokemon = shuffleArray(data);
  const [seen, setSeen] = useState([]);
  const [displayedPokemon, setDisplayedPokemon] = useState(choosePokemon());
  const [playGame, setPlayGame] = useState(true);

  useEffect(() => {
    if (displayedPokemon){
      const flipCards = document.querySelectorAll(".card-inner");
      for (let i = 0; i < flipCards.length; i++){
        setTimeout(()=>{
          flipCards[i].style.transform = "rotateY(180deg)";
        }, 1000);
      }
    }  
  }, [displayedPokemon]);

  function choosePokemon(){
    const newChosen = [];
    for(let i = 0; i < seen.length; i++){
      const pokemon = data.find(pokemon => pokemon.id == seen[i]);
      newChosen.push(pokemon);
    }
    for(let j = newChosen.length; j < 5; j++){
      newChosen.push(shuffledPokemon[j]);
    }
    console.log(newChosen);
    return newChosen;
  }

  function handleClick(event){
    const pokemonId = event.target.parentElement.getAttribute("id");
    if(seen.find(id => id == pokemonId)){
      console.log("lost");
      setPlayGame(false);
      gameEnd();
    }else{
      incrementScore();
      const newSeen = seen;
      newSeen.push(pokemonId);
      setSeen(newSeen);
      shuffledPokemon.filter(pokemon => pokemon.id !== pokemonId);
      setDisplayedPokemon(choosePokemon());
    }
  }

  return (
    <div className="cards-container">
      {displayedPokemon.map((pokemon)=>{
        return (
          <div key={pokemon.id} id={pokemon.id} className="card" onClick={playGame ? handleClick : undefined}>
            <div className="card-inner">
              <div className="card-front">
                <img src={pokemonCard}></img>
              </div>
              <div className="card-back">
                <p>{pokemon.name}</p>
                <img src={pokemon.img}></img>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  );
}

function shuffleArray(array){
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}