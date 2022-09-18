import Button from '../Button/Button';
import './TodoListSummary.css';

export default function TodoListSummary({ count, label, onClear }) {
	return (
		<div className="todolist__summary">
			<div className="todolist__summary__group">
				<p>
					Hai ancora <strong>{count}</strong> task da completare
				</p>
				<Button label={label} name="danger" icon="x-octagon" onClick={onClear} />
			</div>
		</div>
	);
}
