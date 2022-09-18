import Button from '../Button/Button';
import './TodoListItem.css';

export default function TodoListItem({ task, onUpdate, onRemove }) {
	return (
		<li id={task.id} className={`todolist__item${task.completed ? ' todolist__item--completed' : ''}`}>
			<div className="todolist__item__task">
				<h6>{task.title}</h6>
				{task.hasOwnProperty('description') && <p>{task.description}</p>}
				{task.hasOwnProperty('date') && <time dateTime={task.date}>{task.date}</time>}
			</div>
			<div className="todolist__item__actions">
				{!task.completed && (
					<Button
						label="Completa"
						hideLabel={true}
						icon="check-circle"
						onClick={onUpdate.bind(null, task.id)}
					/>
				)}
				{task.completed && (
					<Button
						label="Ripristina"
						hideLabel={true}
						icon="arrow-90deg-left"
						onClick={onUpdate.bind(null, task.id)}
					/>
				)}
				<Button label="Rimuovi" hideLabel={true} icon="trash3" onClick={onRemove.bind(null, task.id)} />
			</div>
		</li>
	);
}
