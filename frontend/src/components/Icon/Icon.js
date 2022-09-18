import 'bootstrap-icons/font/bootstrap-icons.css';

export default function Icon({ name, size = 16, color = 'inherit' }) {
	return <i className={`bi bi-${name}`} style={{ fontSize: size, color: color }} aria-hidden="true"></i>;
}
