import Icon from '../Icon/Icon';
import './Button.css';

export default function Button({
	label,
	name = 'default',
	icon = null,
	iconPosition = 'left',
	type = 'submit',
	onClick = null,
	hideLabel = false,
}) {
	return (
		<button className={`btn btn-${name}`} type={type} onClick={onClick}>
			{icon && iconPosition === 'left' && <Icon name={icon} />}
			{hideLabel ? <span className="sr-only">{label}</span> : <span>{label}</span>}
			{icon && iconPosition === 'right' && <Icon name={icon} />}
		</button>
	);
}
