import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from "@/components/Layout/Sidebar";
import MainContainer from "@/components/Layout/MainContainer";
import NotFound from "@/pages/NotFound";

function Layout(){
	return (
		<div className={'flex flex-row h-screen w-full'}>
			<Sidebar />

			<Router>
				<Routes>
					<Route path={'/'}>
						<Route index element={<MainContainer />} />
						<Route path={'*'} element={<NotFound />} />
					</Route>
				</Routes>
			</Router>
		</div>
	)
}

export default Layout
