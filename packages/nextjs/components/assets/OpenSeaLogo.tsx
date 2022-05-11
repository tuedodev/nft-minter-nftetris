import { Box } from '@mui/material';

type OpenSeaLogoType = {
	sx?: React.CSSProperties;
};

const OpenSeaLogo = (props: OpenSeaLogoType) => {
	const { sx } = props;
	return (
		<Box sx={{ '& > img, & > svg': { width: '100%', height: 'auto' }, ...sx }}>
			<svg width="437" height="100" viewBox="0 0 437 100" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M100 50C100 77.6127 77.6127 100 50 100C22.3873 100 0 77.6127 0 50C0 22.3873 22.3873 0 50 0C77.6185 0 100 22.3873 100 50Z"
					fill="#2081E2"
				/>
				<path
					d="M24.6679 51.6801L24.8836 51.341L37.8906 30.9932C38.0807 30.6953 38.5276 30.7261 38.6714 31.0497C40.8444 35.9196 42.7194 41.9762 41.841 45.7468C41.466 47.2982 40.4386 49.3992 39.2827 51.341C39.1338 51.6236 38.9694 51.901 38.7947 52.1681C38.7125 52.2914 38.5738 52.3633 38.4248 52.3633H25.048C24.6884 52.3633 24.4778 51.9729 24.6679 51.6801Z"
					fill="white"
				/>
				<path
					d="M82.6444 55.461V58.6819C82.6444 58.8668 82.5314 59.0312 82.367 59.1031C81.3602 59.5346 77.9132 61.1168 76.48 63.11C72.8224 68.2008 70.0279 75.48 63.7812 75.48H37.721C28.4847 75.48 21 67.9697 21 58.7024V58.4045C21 58.1579 21.2003 57.9576 21.4469 57.9576H35.9745C36.2621 57.9576 36.4727 58.2247 36.4471 58.5072C36.3443 59.4524 36.519 60.4182 36.9659 61.2966C37.8289 63.0484 39.6166 64.1426 41.5481 64.1426H48.74V58.5278H41.6303C41.2656 58.5278 41.0499 58.1065 41.2605 57.8086C41.3375 57.6904 41.4249 57.5672 41.5173 57.4285C42.1903 56.473 43.1509 54.9884 44.1064 53.2983C44.7588 52.1579 45.3906 50.9404 45.8992 49.7178C46.002 49.4969 46.0841 49.2708 46.1663 49.0499C46.305 48.6595 46.4489 48.2948 46.5516 47.9301C46.6544 47.6218 46.7365 47.2982 46.8187 46.9951C47.0602 45.9574 47.1629 44.8581 47.1629 43.7177C47.1629 43.2708 47.1424 42.8033 47.1013 42.3564C47.0807 41.8684 47.0191 41.3803 46.9574 40.8923C46.9163 40.4608 46.8393 40.0344 46.7571 39.5875C46.6544 38.9351 46.5105 38.2879 46.3461 37.6354L46.2896 37.3889C46.1663 36.9419 46.0636 36.5156 45.9198 36.0687C45.5139 34.6662 45.0465 33.2998 44.5533 32.0207C44.3735 31.5121 44.168 31.0241 43.9625 30.5361C43.6595 29.8015 43.3512 29.1337 43.0687 28.5018C42.9249 28.2141 42.8016 27.9521 42.6783 27.685C42.5396 27.3819 42.3958 27.0788 42.2519 26.7912C42.1492 26.5703 42.031 26.3648 41.9488 26.1593L41.0704 24.536C40.9471 24.3151 41.1526 24.0531 41.394 24.1199L46.8907 25.6096H46.9061C46.9163 25.6096 46.9215 25.6148 46.9266 25.6148L47.6509 25.8151L48.4472 26.0412L48.74 26.1233V22.8562C48.74 21.2791 50.0037 20 51.5654 20C52.3462 20 53.0551 20.3185 53.5637 20.8373C54.0722 21.3562 54.3907 22.0651 54.3907 22.8562V27.7056L54.9764 27.8699C55.0226 27.8854 55.0688 27.9059 55.1099 27.9367C55.2538 28.0446 55.4592 28.2038 55.7212 28.3991C55.9267 28.5634 56.1476 28.7638 56.4147 28.9693C56.9438 29.3956 57.5757 29.9453 58.2692 30.5772C58.4541 30.7364 58.6339 30.9008 58.7983 31.0652C59.6922 31.8974 60.6939 32.8734 61.6494 33.9522C61.9165 34.2553 62.1785 34.5635 62.4456 34.8871C62.7127 35.2159 62.9953 35.5395 63.2418 35.8632C63.5655 36.2947 63.9148 36.7416 64.2179 37.2091C64.3617 37.43 64.5261 37.656 64.6648 37.8769C65.0552 38.4676 65.3994 39.079 65.7282 39.6903C65.8669 39.9728 66.0107 40.281 66.134 40.5841C66.4987 41.4009 66.7864 42.2331 66.9713 43.0653C67.0278 43.2451 67.0689 43.4403 67.0895 43.615V43.6561C67.1511 43.9026 67.1717 44.1646 67.1922 44.4317C67.2744 45.2845 67.2333 46.1372 67.0484 46.9951C66.9713 47.3599 66.8686 47.704 66.7453 48.0688C66.622 48.4181 66.4987 48.7828 66.3395 49.127C66.0313 49.841 65.6665 50.5551 65.235 51.2229C65.0963 51.4695 64.9319 51.7315 64.7675 51.9781C64.5877 52.24 64.4028 52.4866 64.2384 52.7281C64.0124 53.0363 63.771 53.3599 63.5244 53.6476C63.3035 53.9507 63.0775 54.2538 62.8309 54.5209C62.4867 54.9267 62.1579 55.312 61.8137 55.6819C61.6083 55.9233 61.3874 56.1699 61.1613 56.3908C60.9405 56.6373 60.7144 56.8582 60.5089 57.0637C60.1648 57.4079 59.8771 57.675 59.6356 57.8959L59.0706 58.4148C58.9884 58.4867 58.8805 58.5278 58.7675 58.5278H54.3907V64.1426H59.8976C61.1305 64.1426 62.3018 63.7059 63.247 62.9045C63.5706 62.622 64.9833 61.3994 66.6528 59.5552C66.7093 59.4935 66.7813 59.4473 66.8635 59.4268L82.0742 55.0295C82.3568 54.9473 82.6444 55.163 82.6444 55.461Z"
					fill="white"
				/>
				<path
					d="M148.723 73.9966C144.203 73.9966 140.048 72.9837 136.259 70.9579C132.515 68.932 129.524 66.1135 127.287 62.5023C125.096 58.847 124 54.7513 124 50.2153C124 45.6792 125.096 41.6055 127.287 37.9943C129.524 34.3831 132.515 31.5645 136.259 29.5387C140.048 27.5129 144.203 26.5 148.723 26.5C153.243 26.5 157.375 27.5129 161.119 29.5387C164.909 31.5645 167.876 34.3831 170.022 37.9943C172.214 41.6055 173.309 45.6792 173.309 50.2153C173.309 54.7513 172.214 58.847 170.022 62.5023C167.831 66.1135 164.863 68.932 161.119 70.9579C157.375 72.9837 153.243 73.9966 148.723 73.9966ZM148.723 63.6913C152.558 63.6913 155.617 62.4582 157.9 59.992C160.229 57.5258 161.393 54.2669 161.393 50.2153C161.393 46.1196 160.229 42.8607 157.9 40.4385C155.617 37.9723 152.558 36.7392 148.723 36.7392C144.842 36.7392 141.738 37.9503 139.409 40.3724C137.126 42.7946 135.985 46.0755 135.985 50.2153C135.985 54.3109 137.126 57.5919 139.409 60.0581C141.738 62.4803 144.842 63.6913 148.723 63.6913Z"
					fill="white"
				/>
				<path
					d="M191.536 41.8918C192.677 40.1743 194.252 38.787 196.261 37.7301C198.27 36.6731 200.621 36.1446 203.315 36.1446C206.465 36.1446 209.319 36.9153 211.876 38.4567C214.432 39.9981 216.441 42.2001 217.902 45.0626C219.409 47.9252 220.162 51.2502 220.162 55.0376C220.162 58.825 219.409 62.172 217.902 65.0786C216.441 67.9412 214.432 70.1651 211.876 71.7506C209.319 73.292 206.465 74.0626 203.315 74.0626C200.667 74.0626 198.316 73.5342 196.261 72.4772C194.252 71.4203 192.677 70.0551 191.536 68.3815V84.5H179.825V36.6731H191.536V41.8918ZM208.246 55.0376C208.246 52.2191 207.424 50.0171 205.78 48.4317C204.182 46.8022 202.196 45.9875 199.822 45.9875C197.494 45.9875 195.508 46.8022 193.864 48.4317C192.266 50.0611 191.467 52.2851 191.467 55.1036C191.467 57.9222 192.266 60.1462 193.864 61.7756C195.508 63.4051 197.494 64.2198 199.822 64.2198C202.151 64.2198 204.137 63.4051 205.78 61.7756C207.424 60.1021 208.246 57.8561 208.246 55.0376Z"
					fill="white"
				/>
				<path
					d="M262.329 54.5091C262.329 55.5661 262.261 56.667 262.124 57.8121H235.62C235.803 60.1021 236.556 61.8637 237.88 63.0968C239.25 64.2859 240.916 64.8804 242.88 64.8804C245.802 64.8804 247.833 63.6913 248.975 61.3132H261.439C260.8 63.7354 259.636 65.9153 257.946 67.8531C256.303 69.7908 254.225 71.3102 251.714 72.4112C249.203 73.5121 246.395 74.0626 243.291 74.0626C239.547 74.0626 236.214 73.292 233.292 71.7506C230.37 70.2092 228.087 68.0072 226.443 65.1446C224.8 62.2821 223.978 58.9351 223.978 55.1036C223.978 51.2722 224.777 47.9252 226.375 45.0626C228.018 42.2001 230.301 39.9981 233.223 38.4567C236.145 36.9153 239.501 36.1446 243.291 36.1446C246.989 36.1446 250.276 36.8933 253.152 38.3907C256.029 39.888 258.266 42.0239 259.864 44.7984C261.508 47.5729 262.329 50.8098 262.329 54.5091ZM250.345 51.5364C250.345 49.5987 249.66 48.0573 248.29 46.9123C246.92 45.7673 245.208 45.1948 243.154 45.1948C241.19 45.1948 239.524 45.7453 238.154 46.8462C236.83 47.9472 236.008 49.5106 235.689 51.5364H250.345Z"
					fill="white"
				/>
				<path
					d="M291.793 36.2768C296.267 36.2768 299.828 37.686 302.476 40.5046C305.17 43.279 306.517 47.1105 306.517 51.9989V73.5342H294.874V53.5182C294.874 51.052 294.212 49.1363 292.888 47.7711C291.564 46.4058 289.784 45.7232 287.547 45.7232C285.309 45.7232 283.529 46.4058 282.205 47.7711C280.881 49.1363 280.219 51.052 280.219 53.5182V73.5342H268.508V36.6731H280.219V41.5615C281.406 39.932 283.004 38.6549 285.013 37.7301C287.021 36.7612 289.281 36.2768 291.793 36.2768Z"
					fill="white"
				/>
				<path
					d="M332.05 73.9966C328.535 73.9966 325.384 73.4461 322.599 72.3451C319.814 71.2441 317.577 69.6147 315.888 67.4567C314.244 65.2988 313.376 62.7005 313.285 59.6617H325.749C325.932 61.3793 326.548 62.7005 327.599 63.6253C328.649 64.5061 330.018 64.9465 331.708 64.9465C333.443 64.9465 334.812 64.5721 335.817 63.8235C336.821 63.0308 337.324 61.9518 337.324 60.5866C337.324 59.4415 336.913 58.4947 336.091 57.746C335.315 56.9973 334.333 56.3808 333.146 55.8964C332.004 55.4119 330.361 54.8614 328.215 54.2449C325.11 53.32 322.576 52.3952 320.613 51.4704C318.65 50.5456 316.961 49.1803 315.545 47.3747C314.13 45.5691 313.422 43.213 313.422 40.3064C313.422 35.9905 315.043 32.6215 318.285 30.1993C321.526 27.7331 325.749 26.5 330.954 26.5C336.251 26.5 340.519 27.7331 343.761 30.1993C347.003 32.6215 348.738 36.0125 348.966 40.3724H336.296C336.205 38.8751 335.634 37.708 334.584 36.8713C333.534 35.9905 332.187 35.5501 330.543 35.5501C329.128 35.5501 327.987 35.9244 327.119 36.6731C326.252 37.3777 325.818 38.4127 325.818 39.7779C325.818 41.2752 326.548 42.4423 328.01 43.279C329.471 44.1158 331.753 45.0186 334.858 45.9875C337.963 47.0004 340.474 47.9692 342.391 48.8941C344.355 49.8189 346.044 51.1621 347.459 52.9237C348.875 54.6853 349.582 56.9533 349.582 59.7278C349.582 62.3702 348.875 64.7703 347.459 66.9282C346.09 69.0862 344.081 70.8037 341.433 72.0809C338.785 73.358 335.657 73.9966 332.05 73.9966Z"
					fill="white"
				/>
				<path
					d="M392.813 54.5091C392.813 55.5661 392.744 56.667 392.607 57.8121H366.103C366.286 60.1021 367.039 61.8637 368.363 63.0968C369.733 64.2859 371.4 64.8804 373.363 64.8804C376.285 64.8804 378.317 63.6913 379.458 61.3132H391.922C391.283 63.7354 390.119 65.9153 388.43 67.8531C386.786 69.7908 384.709 71.3102 382.197 72.4112C379.686 73.5121 376.878 74.0626 373.774 74.0626C370.03 74.0626 366.697 73.292 363.775 71.7506C360.853 70.2092 358.57 68.0072 356.926 65.1446C355.283 62.2821 354.461 58.9351 354.461 55.1036C354.461 51.2722 355.26 47.9252 356.858 45.0626C358.501 42.2001 360.784 39.9981 363.706 38.4567C366.628 36.9153 369.984 36.1446 373.774 36.1446C377.472 36.1446 380.759 36.8933 383.636 38.3907C386.512 39.888 388.749 42.0239 390.347 44.7984C391.991 47.5729 392.813 50.8098 392.813 54.5091ZM380.828 51.5364C380.828 49.5987 380.143 48.0573 378.773 46.9123C377.403 45.7673 375.691 45.1948 373.637 45.1948C371.674 45.1948 370.007 45.7453 368.637 46.8462C367.313 47.9472 366.491 49.5106 366.172 51.5364H380.828Z"
					fill="white"
				/>
				<path
					d="M396.662 55.0376C396.662 51.2502 397.393 47.9252 398.854 45.0626C400.36 42.2001 402.392 39.9981 404.949 38.4567C407.506 36.9153 410.359 36.1446 413.51 36.1446C416.203 36.1446 418.555 36.6731 420.564 37.7301C422.618 38.787 424.193 40.1743 425.289 41.8918V36.6731H437V73.5342H425.289V68.3155C424.148 70.033 422.55 71.4203 420.495 72.4772C418.486 73.5342 416.135 74.0626 413.441 74.0626C410.336 74.0626 407.506 73.292 404.949 71.7506C402.392 70.1651 400.36 67.9412 398.854 65.0786C397.393 62.172 396.662 58.825 396.662 55.0376ZM425.289 55.1036C425.289 52.2851 424.467 50.0611 422.824 48.4317C421.226 46.8022 419.262 45.9875 416.934 45.9875C414.605 45.9875 412.619 46.8022 410.976 48.4317C409.378 50.0171 408.579 52.2191 408.579 55.0376C408.579 57.8561 409.378 60.1021 410.976 61.7756C412.619 63.4051 414.605 64.2198 416.934 64.2198C419.262 64.2198 421.226 63.4051 422.824 61.7756C424.467 60.1462 425.289 57.9222 425.289 55.1036Z"
					fill="white"
				/>
			</svg>
		</Box>
	);
};

export default OpenSeaLogo;
