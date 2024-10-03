import Sidebar from "@/components/Sidebar";
import {Route, Routes,  } from "react-router-dom";
import NotFound from "@/pages/NotFound.tsx";
import {useEffect, useRef} from "react";
import JumpTo from "@/JumpTo.tsx";
import {useAppDispatch, useAppSelector} from "@/redux/store.ts";
import {fetchDefaultWorkspaceAsync} from "@/redux/slices/workspaceSlice.ts";

import Page from "@/components/Page";
import Workspace from "@/components/Workspace";


function App() {

  const dispatch = useAppDispatch()
  const {
    currentWorkspace: workspace
  } = useAppSelector(state => state.workspace)

  const isFirstRun = useRef(true); //避免React 严格模式执行两次

  useEffect(() => {
    if (isFirstRun.current){
      isFirstRun.current = false
      dispatch(fetchDefaultWorkspaceAsync())
    }
  }, []);


  return (
    <div className={'flex flex-row h-screen w-full'}>
      <Sidebar  workspace={workspace} />
      <Routes>
        <Route path={'/'}>
          <Route index element={<JumpTo workspace={workspace}/>} />
          <Route path={'jumpto'} element={<JumpTo workspace={workspace}/>} />
        </Route>
        <Route path={'/ws/'}>
          <Route path={':ws_id'} element={workspace?<Workspace workspace={workspace}/>:<NotFound/>} />
          <Route path={':ws_id/p/:p_id'} element={workspace?<Page />:<NotFound/>} />
        </Route>
        <Route path={'*'} element={<NotFound/>}/>
      </Routes>
    </div>
  )
}

export default App
