import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import './Footer.css'
import { getUserAuth } from "../../auth/TokenManager";

function Footer(){
    const storedMode = localStorage.getItem('mode')
    const displayMode = storedMode==='dark'?'icon-dark-color':'icon'
    return (
      <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          borderTop: 1,
          borderTopColor: storedMode === "dark" ? "#2196f3" : "#CCCCCC",
          width: "100vw",
        }}
        elevation={3}
      >
        <BottomNavigation showLabels>
          <BottomNavigationAction
            label="About"
            className={displayMode + " bi bi-info-lg"}
            component={Link}
            to="/about"
          ></BottomNavigationAction>
          {getUserAuth() && (
            <BottomNavigationAction
              label="Favorites"
              className={displayMode + " bi bi-heart-fill"}
              component={Link}
              to={`/favorite/${getUserAuth().id}`}
            ></BottomNavigationAction>
          )}
          {getUserAuth()?.biz && (
            <BottomNavigationAction
              label="My Cards"
              component={Link}
              to='/my-cards'
              className={displayMode + " bi bi-file-person"}
            ></BottomNavigationAction>
          )}
        </BottomNavigation>
      </Paper>
    );
}

export default Footer