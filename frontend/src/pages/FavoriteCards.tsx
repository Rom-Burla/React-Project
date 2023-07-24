import { IconButton } from "@mui/material";
import Title from "../components/Title";
import { useEffect, useState } from "react";
import { BuisnessCardProps } from "../types/BuisnessCard";
import useAxios from "../hooks/useAxios";
import Card from "../components/Card";

function FavoriteCards(){
    const storedMode: string | null = localStorage.getItem("mode");
    const [displayMode, setDisplayMode] = useState("grid");
    function handleDisplayChange(mode: string) {
      setDisplayMode(mode);
    }
    const [cards, setCards] = useState<Array<BuisnessCardProps>>([]);
    const { response } = useAxios({
      method: "GET",
      url: `user/favorite`,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials:true
    });
    useEffect(()=>{
        setCards(response?.data)        
    })
    return (
      <>
        <Title text="Favorite Cards" />
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
              <div className="per-row" key={card._id}>
                <Card buisnessCard={card} darkMode={storedMode as string} />
              </div>
            ))}
        </div>
      </>
    );
}

export default FavoriteCards