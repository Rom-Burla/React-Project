import { Link } from "react-router-dom";

interface Props {
  darkMode: 'light'|'dark'
}

function BusinessCardAddBtn({darkMode}:Props){

  const btnColor = darkMode==='dark'?'btn-info':'btn-primary'
  const txtColor = darkMode === "dark" ? "text-dark fs-5" : "text-white fs-5";

    return (
      <Link to="/business-card/add">
        <button className={btnColor + " btn rounded-circle position-absolute"}>
          <i className={"bi bi-plus " + txtColor}></i>
        </button>
      </Link>
    );
}

export default BusinessCardAddBtn