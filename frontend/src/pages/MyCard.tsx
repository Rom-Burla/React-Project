import { useEffect, useState } from "react";
import Title from "../components/Title"
import { BuisnessCardProps } from "../types/BuisnessCard";
import useAxios from "../hooks/useAxios";
import Card from "../components/Card";
import { IconButton } from "@mui/material";
interface Props {
  darkMode: string;
}
function MyCard({darkMode}:Props){
     const [cards, setCards] = useState<Array<BuisnessCardProps>>([]);
     const [displayMode, setDisplayMode] = useState("grid");

     let props = {
       cards: { ...cards },
       darkMode: darkMode,
     };

     const { response } = useAxios({
       method: "GET",
       url: "buisness-card/user/token",
       headers: {
         "Content-Type": "application/json",
       },
       withCredentials:true
     });
     useEffect(() => {
       setCards(response?.data);
     });
     function handleDisplayChange(mode: string) {
       setDisplayMode(mode);
     }
    return (
      <>
        <Title text="My Cards" />
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
                <Card buisnessCard={card} darkMode={props.darkMode} />
              </div>
            ))}
        </div>
      </>
    );
}

export default MyCard