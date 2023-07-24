import { useState } from "react";
import Title from "../components/Title";
import { useNavigate } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import { BusinessValidation } from "../types/BuisnessCard";
import { getUserAuth, setUserAuth } from "../auth/TokenManager";

function CreateBusinessCard(){
  const [buisnessName, setBuisnessName] = useState('')
    const [buisnessSubtitle, setBuisnessSubtitle] = useState("");
    const [buisnessDescription, setBuisnessDescription] = useState("");
    const [buisnessPhone, setBuisnessPhone] = useState("");
    const [buisnessEmail, setBuisnessEmail] = useState("");
    const [buisnessWebsite, setBuisnessWebsite] = useState("");
    const [buisnessImage, setBuisnessImage] = useState("");
    const [buisnessImageAlt, setBuisnessImageAlt] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [street, setStreet] = useState("");
    const [houseNumber, setHouseNumber] = useState("");
    const [zipCode, setZipCode] = useState("");
    const navigate = useNavigate()
    const { response, sendData } = useAxios({
      method: "POST",
      url: "buisness-card",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        buisnessName,
        buisnessSubtitle,
        buisnessDescription,
        buisnessPhone,
        buisnessEmail,
        buisnessWebsite,
        buisnessImage,
        buisnessImageAlt,
        address: { state, street,houseNumber, city, country, zipCode },
      },
      withCredentials: true,
    });

    function handleBack(event: { preventDefault: () => void }) {
      event.preventDefault();
      navigate("/");
    }

  function handleClean(){
    setBuisnessName('')
    setBuisnessSubtitle("");
    setBuisnessDescription("");
    setBuisnessPhone('')
    setBuisnessEmail("");
    setBuisnessWebsite("");
    setBuisnessImage("");
    setBuisnessImageAlt("");
    setState('')
    setCountry('')
    setCity('')
    setStreet('')
    setHouseNumber('')
    setZipCode('')
  }

  function handleClick(){
    if(!BusinessValidation({buisnessName,
        buisnessSubtitle,
        buisnessDescription,
        buisnessPhone,
        buisnessEmail,
        buisnessWebsite,
        buisnessImage,
        buisnessImageAlt,
        address: { state, country, city, street, houseNumber, zipCode }})){
          return
        }
        
        sendData(`Business ${buisnessName} registered succesfully`, `Email: ${buisnessEmail} is already in database, please register business with another email`)
        
        const user = getUserAuth()
        if(user.biz===false){
          const biz = true
          setUserAuth(user.id,biz,user.admin,user.favorites,user.token)
        }
    
  }
  return (
    <>
      <Title text="Add Card" />
      <form className="p-4 align-items-center">
        <div className="d-flex pb-2">
          <input
            className="form-control mx-3"
            type="text"
            placeholder="Business Name *"
            value={buisnessName}
            onChange={(e) => setBuisnessName(e.target.value)}
          />
          <input
            className="form-control mx-3"
            type="text"
            placeholder="Business Subtitle *"
            value={buisnessSubtitle}
            onChange={(e) => setBuisnessSubtitle(e.target.value)}
          />
        </div>
        <div className="d-flex pb-2">
          <input
            className="form-control mx-3"
            type="text"
            placeholder="Business Description *"
            value={buisnessDescription}
            onChange={(e) => setBuisnessDescription(e.target.value)}
          />

          <input
            className="form-control mx-3"
            type="text"
            placeholder="050-00000000 *"
            value={buisnessPhone}
            onChange={(e) => setBuisnessPhone(e.target.value)}
          />
        </div>
        <div className="d-flex pb-2">
          <input
            className="form-control mx-3"
            type="email"
            placeholder="test@gmail.com *"
            value={buisnessEmail}
            onChange={(e) => setBuisnessEmail(e.target.value)}
          />

          <input
            className="form-control mx-3"
            type="text"
            placeholder="Website *"
            value={buisnessWebsite}
            onChange={(e) => setBuisnessWebsite(e.target.value)}
          />
        </div>
        <div className="d-flex pb-2">
          <input
            className="form-control mx-3"
            type="text"
            placeholder="Image url"
            value={buisnessImage}
            onChange={(e) => setBuisnessImage(e.target.value)}
          />

          <input
            className="form-control mx-3"
            type="text"
            placeholder="Image alt"
            value={buisnessImageAlt}
            onChange={(e) => setBuisnessImageAlt(e.target.value)}
          />
        </div>
        <div className="d-flex pb-2">
          <input
            className="form-control mx-3"
            type="text"
            placeholder="State "
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
          <input
            className="form-control mx-3"
            type="text"
            placeholder="Street *"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />
        </div>
        <div className="d-flex pb-2">
          <input
            className="form-control mx-3"
            type="text"
            placeholder="House number *"
            value={houseNumber}
            onChange={(e) => setHouseNumber(e.target.value)}
          />
          <input
            className="form-control mx-3"
            type="text"
            placeholder="City *"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="d-flex pb-2">
          <input
            className="form-control mx-3"
            type="text"
            placeholder="Country *"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <input
            className="form-control mx-3"
            type="text"
            placeholder="Zip *"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
          />
        </div>
        <div className="d-flex pb-2">
          <input
            className="form-control mx-3"
            style={{ cursor: "pointer" }}
            placeholder="CANCEL"
            onClick={handleBack}
          />
          <div
            className="form-control mx-3 refresh"
            onClick={handleClean}
            style={{ cursor: "pointer" }}
          >
            <i className="bi bi-arrow-repeat"></i>
          </div>
        </div>
        <div className="d-flex pb-3">
          <input
            className="btn btn-primary form-control mx-3"
            placeholder="SUBMIT"
            onClick={handleClick}
          />
        </div>
      </form>
    </>
  );
}

export default CreateBusinessCard