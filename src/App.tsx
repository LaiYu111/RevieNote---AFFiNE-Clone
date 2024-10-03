import {useEffect, useState} from "react";
import {useAppDispatch} from "@/redux/store.ts";
import {setStatus} from "@/redux/slices/systemSlice.ts";
import {TOKEN, TOKEN_EXPIRES_IN} from "@/config.ts";
import {isTokenExpired} from "@/utils.ts";
import {Route, Routes, useNavigate, } from "react-router-dom";
import Sidebar from "@/components/Layout/Sidebar";
import JumpTo from "@/components/Layout/JumpTo.tsx";
import Login from "@/pages/Login.tsx";
import CreateWorkspace from "@/pages/CreateWorkspace.tsx";
import MainContainer from "@/components/Layout/MainContenter";
import NotFound from "@/pages/NotFound.tsx";
import Home from "@/pages/Home.tsx";

function App() {
  const dispatch = useAppDispatch()
  const navigation = useNavigate()
  const updateOnlineStatus = () => {
    dispatch(setStatus(navigator.onLine?'online':'offline'))
  };
  const [wsId, setWsID] = useState("")

  useEffect(() => {
    const token = localStorage.getItem(TOKEN)
    const tokenExpiredTime = localStorage.getItem(TOKEN_EXPIRES_IN)

    if (token && tokenExpiredTime) {
      const expiresIn =  Number(tokenExpiredTime);

      if (isTokenExpired(expiresIn)) {
        localStorage.removeItem(TOKEN);
        localStorage.removeItem(TOKEN_EXPIRES_IN);
        console.log('Token expired and removed.');
        navigation('/login')
      }
    }

    if (!token || !tokenExpiredTime){
      navigation('/login')
    }
  }, []);

  useEffect(() => {
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);


  return (
    <div className={'flex flex-row h-screen w-full'}>
      <Sidebar ws_id={wsId}/>
      <Routes>
        <Route path={'/'}>
          <Route index element={<JumpTo/>}/>
          <Route path={'jumpto'} element={<JumpTo/>}/>
          <Route path={'login'} element={<Login/>}/>
          <Route path={'create_workspace'} element={<CreateWorkspace/>}/>
        </Route>
        <Route path={'/ws/'}>
          <Route path={':ws_id'} element={<Home setWsID={setWsID}/>}/>
          <Route path={':ws_id/p/:p_id'} element={<MainContainer/>}/>
        </Route>
        <Route path={'*'} element={<NotFound/>}/>
      </Routes>
    </div>
  )
}

export default App
