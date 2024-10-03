import {useAppDispatch, useAppSelector} from "@/redux/store.ts";
import NotFound from "@/pages/NotFound.tsx";
import BodyContainer from "@/components/Page/BodyContainer.tsx";
import {useParams} from "react-router-dom";
import Header from "@/components/Header";
import {useEffect} from "react";
import {fetchPage} from "@/redux/slices/pageSlice.ts";



function Page() {
	const {p_id, ws_id} = useParams()
	const page = useAppSelector(state => state.page.currentPage)
	const dispatch = useAppDispatch()

	useEffect(() => {
		if(p_id && ws_id){
			dispatch(fetchPage({
				pageId: p_id,
				workspaceId: ws_id
			}))
		}
	}, [p_id]);


	return (
		<div className={'h-full w-full flex flex-col'}>
			{
				page && ws_id ? (
					<>
						<Header workspaceId={ws_id} title={page.title}/>
						<BodyContainer className='mx-auto h-full overflow-y-auto w-full max-w-4xl px-4' page={page} workspaceId={ws_id} />
					</>
				):
				<NotFound />
			}
		</div>
	)
}

export default Page
