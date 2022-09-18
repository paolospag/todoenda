import TodoListItem from './TodoListItem';
import TodoListForm from './TodoListForm';
import TodoListSummary from './TodoListSummary';
import './TodoList.css';

export default function TodoList({
	items,
	emptyText,
	addText,
	clearText,
	onAddTask,
	onUpdateTask,
	onRemoveTask,
	onClearTasks,
}) {
	const pending = items.filter((item) => !item.completed);
	return (
		<div className="todolist">
			<TodoListForm label={addText} onSubmit={onAddTask} />
			{items.length ? (
				<>
					<ul className="todolist__list">
						{items.map((item) => (
							<TodoListItem key={item.id} task={item} onUpdate={onUpdateTask} onRemove={onRemoveTask} />
						))}
					</ul>
					<TodoListSummary label={clearText} count={pending.length} onClear={onClearTasks} />
				</>
			) : (
				<p className="todolist__empty">{emptyText}</p>
			)}
		</div>
	);
}
