import { useEffect, useState } from "react";
import Title from "../components/Title";
import { useNavigate, useParams } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import { BusinessValidation } from "../types/BuisnessCard";

function EditBusinessCard() {
      const params = useParams();
     const { response: response2, loading } = useAxios({
       method: "GET",
       url: `buisness-card/${params.businessId}`,
       headers: {
         "Content-Type": "application/json",
       },
     });

  const navigate = useNavigate();
  const [buisnessName, setBuisnessName] = useState(''
  );
  const [buisnessSubtitle, setBuisnessSubtitle] = useState(
    ''
  );
  const [buisnessDescription, setBuisnessDescription] = useState(
   ''
  );
  const [buisnessPhone, setBuisnessPhone] = useState(
    ''
  );
  const [buisnessEmail, setBuisnessEmail] = useState(
    ''
  );
  const [buisnessWebsite, setBuisnessWebsite] = useState(
    ''
  );
  const [buisnessImage, setBuisnessImage] = useState(
    ''
  );
  const [buisnessImageAlt, setBuisnessImageAlt] = useState(
    ''
  );
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [houseNumber, setHouseNumber] = useState(
    ''
  );
  const [zipCode, setZipCode] = useState('');
  const { response, sendData } = useAxios({
    method: "PUT",
    url: `buisness-card/${params.businessId}`,
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
      address: { state, street, houseNumber, city, country, zipCode },
    },
    withCredentials: true,
  });

  function handleBack(event: { preventDefault: () => void }) {
    event.preventDefault();
    navigate("/");
  }

  function handleClean(event: { preventDefault: () => void }) {
    event.preventDefault();
    setBuisnessName(response2?.data.buisnessName);
    setBuisnessSubtitle(response2?.data.buisnessSubtitle);
    setBuisnessDescription(response2?.data.buisnessDescription);
    setBuisnessPhone(response2?.data.buisnessPhone);
    setBuisnessEmail(response2?.data.buisnessEmail);
    setBuisnessWebsite(response2?.data.buisnessWebsite);
    setBuisnessImage(response2?.data.buisnessImage);
    setBuisnessImageAlt(response2?.data.buisnessImageAlt);
    setState(response2?.data.address.state);
    setCountry(response2?.data.address.country);
    setCity(response2?.data.address.city);
    setStreet(response2?.data.address.street);
    setHouseNumber(response2?.data.address.houseNumber);
    setZipCode(response2?.data.address.zipCode);
  }
  async function handleLoad(){
    if(loading===false){
      setBuisnessName(response2?.data.buisnessName);
      setBuisnessSubtitle(response2?.data.buisnessSubtitle);
      setBuisnessDescription(response2?.data.buisnessDescription);
      setBuisnessPhone(response2?.data.buisnessPhone);
      setBuisnessEmail(response2?.data.buisnessEmail);
      setBuisnessWebsite(response2?.data.buisnessWebsite);
      setBuisnessImage(response2?.data.buisnessImage);
      setBuisnessImageAlt(response2?.data.buisnessImageAlt);
      setState(response2?.data.address.state);
      setCountry(response2?.data.address.country);
      setCity(response2?.data.address.city);
      setStreet(response2?.data.address.street);
      setHouseNumber(response2?.data.address.houseNumber);
      setZipCode(response2?.data.address.zipCode);
    }
  }
  useEffect(()=>{
    handleLoad()
  },[loading])

  function handleClick(event: { preventDefault: () => void}) {
    event.preventDefault()
    if (
      !BusinessValidation({
        buisnessName,
        buisnessSubtitle,
        buisnessDescription,
        buisnessPhone,
        buisnessEmail,
        buisnessWebsite,
        buisnessImage,
        buisnessImageAlt,
        address: { state, country, city, street, houseNumber, zipCode },
      })
    ) {
      return;
    }else{
      sendData(
        `Business ${buisnessName} edited succesfully`,
        `Email: ${buisnessEmail} is already in database, please register business with another email`
      );
    }
  }
  return (loading===false ? (
    <>
      <Title text="Edit Card" />
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
            onChange={(e) => {
              setBuisnessImage(e.target.value);
            }}
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
          <button
            className="form-control mx-3"
            style={{ cursor: "pointer" }}
            onClick={handleBack}
          >
            CANCEL
          </button>
          <button
            className="form-control mx-3 refresh"
            onClick={handleClean}
            style={{ cursor: "pointer" }}
          >
            <i className="bi bi-arrow-repeat"></i>
          </button>
        </div>
        <div className="d-flex pb-3">
          <button
            className="btn btn-primary form-control mx-3"
            onClick={handleClick}
          >
            SUBMIT
          </button>
        </div>
      </form>
    </>
  ) : (
    <h1>Loading...</h1>
  ));
}

export default EditBusinessCard;
