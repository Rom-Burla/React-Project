import { useEffect, useState } from "react";
import Title from "../components/Title";
import { signupValidation } from "../types/User";
import useAxios from "../hooks/useAxios";
import { useNavigate } from "react-router-dom";
import { setUserAuth } from "../auth/TokenManager";

interface Props {
  forceUpdate: Function
}

function Signup({forceUpdate}:Props) {
    const [fName, setFname] = useState('')
    const [mName, setMname] = useState('')
    const [lName, setLname] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [imageAlt, setImageAlt] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [street, setStreet] = useState("");
    const [houseNumber, setHouseNumber] = useState("");
    const [zip, setZip] = useState("");
    const [biz, setBiz] = useState(false);
    const navigate = useNavigate()
    const { response, sendData } = useAxios({
      method: "POST",
      url: "user/signup",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        fName,
        mName,
        lName,
        phone,
        email,
        password,
        imageUrl,
        imageAlt,
        state,
        country,
        city,
        street,
        houseNumber,
        zip,
        biz,
      },
      withCredentials: true
    });

    function handleBack(event: { preventDefault: () => void }) {
      event.preventDefault();
      navigate("/");
    }

  function handleClean(){
    setFname('')
    setMname('')
    setLname('')
    setPhone('')
    setEmail('')
    setPassword('')
    setImageUrl('')
    setImageAlt('')
    setState('')
    setCountry('')
    setCity('')
    setStreet('')
    setHouseNumber('')
    setZip('')
  }

 function handleClick(){
   if(!signupValidation({fName,mName,lName,phone,email,password,imageUrl,state,country,city,street,houseNumber,zip})){
    return
   }
   sendData(`User ${fName} ${mName} ${lName} registered succesfully`, `Email: ${email} is already in database, please sign in with another email`)
   console.log(response?.data);
    }

useEffect(()=>{
  setUserAuth(
    response?.data.user._id,
    response?.data.user.biz,
    response?.data.user.admin,
    response?.data.user.favorites,
    response?.data.token
  );
  if(response?.data.user._id){
    navigate('/')
    forceUpdate()
  }
},[response?.data._id])

    return (
      <>
        <Title text="Signup" />
        <form className="p-4 align-items-center">
          <div className="d-flex pb-2">
            <input
              className="form-control mx-3"
              type="text"
              placeholder="First name *"
              value={fName}
              onChange={(e) => setFname(e.target.value)}
            />
            <input
              className="form-control mx-3"
              type="text"
              placeholder="Middle name"
              value={mName}
              onChange={(e) => setMname(e.target.value)}
            />
          </div>
          <div className="d-flex pb-2">
            <input
              className="form-control mx-3"
              type="text"
              placeholder="Last name *"
              value={lName}
              onChange={(e) => setLname(e.target.value)}
            />

            <input
              className="form-control mx-3"
              type="text"
              placeholder="050-00000000 *"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="d-flex pb-2">
            <input
              className="form-control mx-3"
              type="email"
              placeholder="test@gmail.com *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              className="form-control mx-3"
              type="password"
              placeholder="Password *"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-flex pb-2">
            <input
              className="form-control mx-3"
              type="text"
              placeholder="Image url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />

            <input
              className="form-control mx-3"
              type="text"
              placeholder="Image alt"
              value={imageAlt}
              onChange={(e) => setImageAlt(e.target.value)}
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
              placeholder="Country *"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
          <div className="d-flex pb-2">
            <input
              className="form-control mx-3"
              type="text"
              placeholder="City *"
              value={city}
              onChange={(e) => setCity(e.target.value)}
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
              placeholder="Zip *"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
            />
          </div>
          <div className="mb-3 mx-3">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                defaultChecked={biz}
                onChange={() => setBiz(!biz)}
                id="bizCheck"
              />
              <label className="form-check-label" htmlFor="bizCheck">
                Signup as business
              </label>
            </div>
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
            <button
              className="btn btn-primary form-control mx-3"
              onClick={handleClick}
            >
              Submit
            </button>
          </div>
        </form>
      </>
    );
}

export default Signup;
