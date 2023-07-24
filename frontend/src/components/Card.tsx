import { Link} from "react-router-dom"

import useAxios from "../hooks/useAxios"
import { BuisnessCardProps } from "../types/BuisnessCard"
import {addFavorite, deleteFavorite, favoriteCheck} from "../services/favoriteCheck"
import { getUserAuth } from "../auth/TokenManager"




type DisplayProps= string

interface Props{
    buisnessCard:BuisnessCardProps,
    darkMode:DisplayProps,
}

function Card({buisnessCard ,darkMode}:Props){
    let cardText = darkMode==='dark'?'text-info':''
    let cardBorder = darkMode === 'dark'?'border-primary':''
    let btnColor = darkMode==='dark'?'btn btn-dark':'btn btn-light'
    let btnText = darkMode==='dark'?'text-info':'text-secondary'
    const favorites = favoriteCheck();
    let favoriteColor = getUserAuth()?favorites.includes(buisnessCard._id)?'text-danger':btnText:''
    const onDelete = useAxios({
      method: 'DELETE',
      url: `buisness-card/${buisnessCard._id}`,
      withCredentials:true
    })



  function handleDelete(){
      onDelete.sendData('','')
      window.location.reload()
    }
    
    const onAddFavoriteClick=useAxios({
      method: 'PUT',
      url: `user/favorite/${buisnessCard._id}`,
      data: buisnessCard,
      withCredentials:true
    })

    const onDeleteFavoriteClick=useAxios({
      method:'DELETE',
      url: `user/favorite/${buisnessCard._id}`,
      withCredentials:true
    })
    function handleFavoriteDelete(){
      deleteFavorite(buisnessCard._id)
      onDeleteFavoriteClick.sendData(`Deleted ${buisnessCard.buisnessName} business card from favorites`, '')
    }
    function handleFavoriteAdd(){
      addFavorite(buisnessCard._id)
      onAddFavoriteClick.sendData(`Added ${buisnessCard.buisnessName} business card to favorites`, '')
    }

    function handleFavoriteClick(){favorites.includes(buisnessCard._id)?(
      handleFavoriteDelete()
    ):(
      handleFavoriteAdd()
      )
    }

    return (
      <div
        className={cardText + " card m-3" + cardBorder}
        data-bs-theme={darkMode}
      >
        <img
          src={buisnessCard.buisnessImage}
          className="card-img-top img-fluid"
          style={{ height: "150px" }}
          alt={buisnessCard.buisnessName + " image"}
        />

        <div className={"card-header p-3 " + cardBorder}>
          <h5 className="card-title text-center fw-bolder fst-italic">
            {buisnessCard.buisnessName}
          </h5>
          <p className="card-text text-center">
            {buisnessCard.buisnessDescription}
          </p>
        </div>
        <div className="card-body">
          <p className="card-text">
            <span className="fw-bolder">Phone: </span>{" "}
            {buisnessCard.buisnessPhone}
          </p>
          <p className="card-text">
            <span className="fw-bolder">Address: </span>
            {`${buisnessCard.address.street} ${buisnessCard.address.houseNumber}`}
            <br /> {buisnessCard.address.city}
          </p>
          <p className="card-text">
            <span className="fw-bolder">Zip Code: </span>{" "}
            {buisnessCard.address.zipCode}
          </p>
          <p className="card-text">
            <span className="fw-bolder">Card Number: </span>
            {buisnessCard.buisnessNumber}
          </p>

          <div className="d-flex justify-content-between">
            <div>
              {getUserAuth()&&getUserAuth().admin && (
                <button
                  onClick={handleDelete}
                  className={`${btnText} ${btnColor} bi bi-trash-fill`}
                ></button>
              )}
              {getUserAuth()&&getUserAuth().id === buisnessCard.user_id && (
                <Link
                  to={`/edit/${buisnessCard._id}`}
                  className={`${btnText} ${btnColor} bi bi-pencil-fill ms-2`}
                ></Link>
              )}
            </div>
            <div>
              <Link
                to={`tel:${buisnessCard.buisnessPhone}`}
                className={`${btnText} ${btnColor} bi bi-telephone-fill me-2`}
              ></Link>
              {getUserAuth() && (
                <button
                  onClick={handleFavoriteClick}
                  className={`${favoriteColor} ${btnColor} bi bi-heart-fill`}
                ></button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
}

export default Card