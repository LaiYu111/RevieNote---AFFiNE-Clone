import {FormEvent, useEffect, useState} from "react";
import {validateEmail} from "@/utils.ts";
import {BACKEND_URL, TOKEN, TOKEN_EXPIRES_IN} from "@/config.ts";
import usePost from "@/hooks/usePost.ts";
import clsx from "clsx";
import {useNavigate} from "react-router-dom";


function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isValidEmail, setIsValidEmail] = useState(false)
	const {postData, error} = usePost(BACKEND_URL)
	const navigation = useNavigate()

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		if (isValidEmail){
			const result = await postData('/api/auth/login', {
				email: email,
				password: password
			})

			if (result){
				localStorage.setItem(TOKEN, result.access_token)
				localStorage.setItem(TOKEN_EXPIRES_IN, result.expires_in )
				navigation('/jumpto')
			}
		}
	};

	useEffect(() => {
		setIsValidEmail(validateEmail(email))
	}, [email]);

	return (
		<div className="flex items-center justify-center h-screen w-screen">
			<div className="w-full max-w-xs">
				<form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
					<h2 className="text-center text-xl font-bold mb-4">Login</h2>
					<div className="mb-4">
						<label htmlFor="email" className="block text-sm font-bold mb-2">
							Email
						</label>
						<input
							type="text"
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className={clsx(
								"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
								isValidEmail?"":"border-red-500"
							)}
							placeholder="邮箱/Email"
						/>
					</div>
					<div className="mb-6">
						<label htmlFor="password" className="block text-sm font-bold mb-2">
							Password
						</label>
						<input
							type="password"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
							placeholder="密码/Password"
						/>
					</div>
					{error && (
						<p className="text-red-500 text-xs italic mb-4">{error}</p>
					)}
					<button
						type="submit"
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
					>
						Login
					</button>
				</form>
			</div>
		</div>
	);
}

export default Login;
