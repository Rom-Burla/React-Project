import { AppBar, Container, Toolbar, Button, IconButton } from "@mui/material";
import { NavLink } from "react-router-dom";
import { getUserAuth } from "../../auth/TokenManager";
import Logout from "./Logout";
import useAxios from "../../hooks/useAxios";
import { UserProps } from "../../types/User";

interface Props{
    mode:string
    setMode:Function
    forceUpdate:Function
}

function Header({mode,setMode,forceUpdate}:Props){
    const fetchUser= useAxios({
        method: "GET",
        url: "user/token",
        withCredentials: true,
      }).response?.data
    let user:UserProps = getUserAuth() && fetchUser
    
      
      
    const storedMode: string|null = localStorage.getItem('mode')
    if (storedMode===null){
      localStorage.setItem('mode','light')
    }
    function handleDarkMode(){
        return mode==='dark'?'text-white':'text-secondary'
    }
    
    
    function handleClick() {
      
      const toggleMode = mode === "dark" ? "light" : "dark";
      localStorage.setItem('mode',toggleMode)
      setMode(toggleMode);
    }
    
    let linkColor = mode === 'dark'?'link-info':'link-primary'
    const textColor = handleDarkMode()
    return (
      <AppBar position="static" color="default" enableColorOnDark>
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
            <div className="d-flex flex-row align-items-center">
              <Button color="primary">
                <NavLink to="/" className="navbar-brand">
                  <div className="d-flex flex-row align-item-end">
                    <h2 className="me-2 fst-italic align-self-end">BZ</h2>
                    <p className={textColor + " align-self-end mb-2"}>
                      Business Zone
                    </p>
                  </div>
                </NavLink>
              </Button>
              {/* need to make mobile nav menu */}
              <NavLink
                to="/about"
                className={linkColor + " ms-3 navbar-brand d-flex flex-row"}
              >
                <i className="bi bi-info-circle-fill m-1"></i>
                <h6 className="pt-2 fw-bolder">About</h6>
              </NavLink>
              {getUserAuth() && (
                <>
                  <NavLink
                    to={`/favorite/${getUserAuth().id}`}
                    className={linkColor + " ms-3 navbar-brand d-flex flex-row"}
                  >
                    <i className="bi bi-heart-fill m-1"></i>
                    <h6 className="pt-2 fw-bolder">Favorites</h6>
                  </NavLink>
                  <NavLink
                    to={`/my-cards`}
                    className={linkColor + " ms-3 navbar-brand d-flex flex-row"}
                  >
                    <i className="bi bi-file-person m-1"></i>
                    <h6 className="pt-2 fw-bolder">My Cards</h6>
                  </NavLink>
                </>
              )}
              {getUserAuth()&& getUserAuth().admin && (
                <NavLink
                  to={`/sandbox`}
                  className={linkColor + " ms-3 navbar-brand d-flex flex-row"}
                >
                  <i className="bi bi-file-person m-1"></i>
                  <h6 className="pt-2 fw-bolder">Sandbox</h6>
                </NavLink>
              )}
            </div>

            <div className="d-flex flex-row justify-content-between align-items-center">
              {getUserAuth() && (
                <h6
                  className={
                    textColor +
                    (mode === "dark" ? " bg-secondary" : " bg-info") +
                    " rounded p-2 fw-bolder mt-2 me-4 align-self-center"
                  }
                >
                  Hi {`${user?.fName} ${user?.mName} ${user?.lName}`}
                </h6>
              )}
              <IconButton
                color="info"
                onClick={handleClick}
                sx={{ alignSelf: "flex-end", marginRight: 1 }}
              >
                <i
                  className={
                    mode === "dark" ? "bi bi-sun-fill" : "bi bi-moon-fill"
                  }
                />
              </IconButton>
              {!getUserAuth() ? (
                <>
                  <NavLink
                    to="/signup"
                    className={
                      linkColor + " me-2 fw-bolder text-decoration-none"
                    }
                  >
                    Signup
                  </NavLink>
                  <NavLink
                    to="/login"
                    className={
                      linkColor + " ms-2 fw-bolder text-decoration-none"
                    }
                  >
                    Login
                  </NavLink>
                </>
              ) : (
                <>
                  <img
                    src={
                      user?.imageUrl
                        ? user?.imageUrl
                        : "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png"
                    }
                    alt={`${user?.fName} ${user?.mName}+${user?.lName} image`}
                    className={
                      (mode === "dark" ? "bg-white" : "bg-info") +
                      " rounded-circle"
                    }
                    style={{ width: "50px", height: "50px" }}
                  />
                  <Logout forceUpdate={forceUpdate} btnColor={linkColor} />
                </>
              )}
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    );
}

export default Header