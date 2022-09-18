import { Slide } from 'react-toastify';

const REST_API_URL = 'https://www.paolospagnuolo.it/todoenda/api';

const TOAST_OPTIONS = {
	position: 'bottom-right',
	autoClose: 4000,
	hideProgressBar: true,
	closeOnClick: true,
	pauseOnHover: false,
	draggable: false,
	progress: undefined,
	theme: 'colored',
	transition: Slide,
};

export { REST_API_URL, TOAST_OPTIONS };
