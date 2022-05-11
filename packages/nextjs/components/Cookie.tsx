import { useEffect } from 'react';

type CookiePropsType = {
	fingerprint: string;
};
const Cookie = (props: CookiePropsType) => {
	const { fingerprint } = props;

	useEffect(() => {
		fetch('./api/cookie', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ fingerprint }),
		})
			.then((response) => {
				if (!response.ok) {
					return Promise.reject(response.statusText);
				}
				return response.json();
			})
			.catch((error) => {
				console.log(error.message || error);
			});
	}, []);

	return null;
};

export default Cookie;
