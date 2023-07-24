import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css';
import Header from './components/ui/Header';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { useMemo, useReducer, useState } from 'react';
import Footer from './components/ui/Footer';
import About from './pages/About'
import Signup from './pages/Signup';
import Login from './pages/Login/Login';
import { ToastContainer } from 'react-toastify';
import BusinessCardAddBtn from './components/ui/BusinessCardAddBtn';
import CreateBusinessCard from './pages/CreateBusinessCard';
import EditBusinessCard from './pages/EditBusinessCard';
import FavoriteCards from './pages/FavoriteCards';
import { getUserAuth, removeUserAuth } from './auth/TokenManager';
import MyCard from './pages/MyCard';
import Sandbox from './pages/Sandbox';



if(process.env.NODE_ENV==='development'){
  console.log('your app is running in development mode');
  
}

if(getUserAuth()){
  
  if(Date.now()>getUserAuth().expiry){
    removeUserAuth()
  }
}

function App() {
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

  function handleForceUpdate() {
    forceUpdate();
  }
    const [mode, setMode] = useState<"light" | "dark">("light");
    const storedMode: string|null = localStorage.getItem('mode')
    if (storedMode===null){
      localStorage.setItem('mode','light')
    }
    const theme = useMemo(
      () =>
        createTheme({
          palette: {
            mode,
          },
        }),
      [mode]
    );
    
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastContainer
        closeOnClick
        closeButton={false}
        theme="colored"
        position="bottom-center"
      />
      <Header mode={mode} setMode={setMode} forceUpdate={handleForceUpdate} />

      <Routes>
        <Route path="/" element={<HomePage darkMode={mode} />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route
          path="/signup"
          element={<Signup forceUpdate={handleForceUpdate} />}
        ></Route>
        <Route
          path="/login"
          element={<Login forceUpdate={handleForceUpdate} />}
        ></Route>
        <Route
          path="/business-card/add"
          element={<CreateBusinessCard />}
        ></Route>
        <Route path="/edit/:businessId" element={<EditBusinessCard />}></Route>
        <Route path="/favorite/:userId" element={<FavoriteCards />}></Route>
        <Route path='/my-cards' element={<MyCard darkMode={mode}/>}></Route>
        <Route path='/sandbox' element={<Sandbox/>}></Route>
      </Routes>

      {getUserAuth()&&
        <div className="add-btn">
          <BusinessCardAddBtn darkMode={mode} />
        </div>
      }
      <Footer />
    </ThemeProvider>
  );
}

export default App;
