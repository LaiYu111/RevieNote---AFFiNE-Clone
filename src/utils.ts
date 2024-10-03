import { jwtDecode } from 'jwt-decode';
export const validateEmail = (email: string): boolean => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
};


export interface TokenPayload {
	email: string
	username: string
	_id: string
}

export const parseToken = (token: string): TokenPayload | null => {
	try {
		return jwtDecode<TokenPayload>(token);
	} catch (error) {
		console.error("Failed to decode token:", error);
		return null;
	}
};

// 以秒为单位的时间戳与token时间戳匹配
export const isTokenExpired = (tokenExpireTime: number) => {
	return Math.floor(Date.now() / 1000) >= tokenExpireTime
}
