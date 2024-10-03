import clsx from "clsx";
import { useState } from "react";
import {BACKEND_URL, TOKEN} from "@/config.ts";
import usePost from "@/hooks/usePost.ts";
import {parseToken} from "@/utils.ts";
import {useNavigate} from "react-router-dom";

function CreateWorkspace() {
	const [workspaceName, setWorkspaceName] = useState<string>("");
	const navigation = useNavigate()
	const {postData} = usePost(BACKEND_URL)
	const maxCharacters = 20;

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const token = localStorage.getItem(TOKEN)
		const userId = token? parseToken(token)?._id : undefined

		if (workspaceName.length ===0){
			alert("长度不能为0/length cannot be 0")
		}
		else {
			const result = await postData('/api/workspace', {
				name: workspaceName,
				userId: userId
			})
			if (result){
				navigation('/jumpto')
			}
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value.length <= maxCharacters) {
			setWorkspaceName(e.target.value);
		}
	};

	return (
		<div className="flex items-center justify-center h-screen w-screen">
			<div className="w-full max-w-xl">
				<form
					onSubmit={handleSubmit}
					className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
				>
					<h2 className="text-center text-xl font-bold mb-4">
						创建工作间/Create Workspace
					</h2>
					<div className="mb-4">
						<label
							htmlFor="workspace-name"
							className="block text-sm font-bold mb-2"
						>
							工作间名字/Workspace Name
						</label>
						<input
							type="text"
							id="workspace-name"
							placeholder="如：我的第一个工作间/Eg: My First Workspace"
							value={workspaceName}
							onChange={handleChange}
							className={clsx(
								"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							)}
						/>
						<p className="text-right text-sm text-gray-500">
							{workspaceName.length}/{maxCharacters} 字/characters
						</p>
					</div>

					<button
						type="submit"
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
					>
						提交/submit
					</button>
				</form>
			</div>
		</div>
	);
}

export default CreateWorkspace;
