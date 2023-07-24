import { IconButton } from "@mui/material";
import Title from "../../components/Title";
import { useEffect, useState } from "react";
import './HomePage.css'
import Card from "../../components/Card";
import {BuisnessCardProps} from "../../types/BuisnessCard";
import useAxios from "../../hooks/useAxios";



interface Props{
    darkMode:string
}

function HomePage({darkMode}:Props){
    
    const [displayMode, setDisplayMode] = useState("grid");
    const [cards, setCards] = useState<Array<BuisnessCardProps>>([])

    const {response} = useAxios({
      method: 'GET',
      url: 'buisness-card',
      headers:{
        "Content-Type": 'application/json'
      }
    })
    function handleDisplayChange(mode: string) {
     setDisplayMode(mode);
   }

   

     useEffect(()=>{
      setCards(response?.data)
     })

   let props = {
     cards: { ...cards },
     darkMode: darkMode
   };
   

    return (
      <>
        <Title text="Cards Page" />

        <div className="d-flex">
          <div className="px-5">
            <IconButton
              color="primary"
              aria-label="Grid View"
              onClick={() => handleDisplayChange("grid")}
            >
              <i className="bi bi-grid-3x3-gap-fill"></i>
            </IconButton>

            <IconButton
              color="primary"
              aria-label="List View"
              onClick={() => handleDisplayChange("list")}
            >
              <i className="bi bi-list-ul"></i>
            </IconButton>
          </div>
        </div>

        <div className={displayMode}>
          {!cards || (cards.length === 0 && <div>No cards</div>)}
          {cards &&
            cards.map((card) => (
              <div className='per-row' key={card._id}>
                <Card
                  buisnessCard={card}
                  darkMode={props.darkMode}
   
                />
              </div>
            ))}
        </div>
      </>
    );
}

export default HomePage