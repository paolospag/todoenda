import { useRef } from 'react';
import { v4 as uuid } from 'uuid';
import Button from '../Button/Button';
import './TodoListForm.css';

export default function TodoListForm({ label, onSubmit }) {
	const titleRef = useRef(null);
	const submitTaskDataHandler = (e) => {
		e.preventDefault();
		onSubmit({
			id: uuid(),
			completed: false,
			title: titleRef.current.value,
		});
		return e.target.reset();
	};
	return (
		<form className="todolist__form" autoComplete="off" onSubmit={submitTaskDataHandler}>
			<fieldset className="todolist__form__group">
				<label htmlFor="title" className="sr-only">
					Task
				</label>
				<input
					id="title"
					name="title"
					type="text"
					ref={titleRef}
					placeholder="es. Comprare Risiko su Amazon"
				/>
			</fieldset>
			<Button label={label} name="primary" icon="plus-lg" />
		</form>
	);
}
