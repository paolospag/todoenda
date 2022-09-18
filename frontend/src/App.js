import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import TodoList from './components/Todo/TodoList';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { getTodoItems, createTodoItem, updateTodoItem, deleteTodoItem } from './data/todos';
import { TOAST_OPTIONS } from './config/constants';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

export default function App() {
	const [todos, setTodos] = useState([]);
	useEffect(() => {
		const fetchTodoItems = async () => {
			const items = await getTodoItems();
			setTodos(items);
		};
		fetchTodoItems();
	}, []);
	const addTaskHandler = async (task) => {
		setTodos((prevTodos) => [...prevTodos, task]);
		const result = await createTodoItem(task);
		toast.success(result?.message, TOAST_OPTIONS);
	};
	const updateTaskHandler = async (id) => {
		let newTodos = [...todos];
		let index = newTodos.findIndex((t) => t.id === id);
		let completed = newTodos[index]?.completed;
		newTodos[index] = {
			...newTodos[index],
			completed: !completed,
		};
		setTodos(newTodos);
		const result = await updateTodoItem(id, { completed: !completed });
		toast.success(result?.message, TOAST_OPTIONS);
	};
	const removeTaskHandler = async (id) => {
		setTodos((prevTodos) => prevTodos.filter((t) => t.id !== id));
		const result = await deleteTodoItem(id);
		toast.success(result?.message, TOAST_OPTIONS);
	};
	const clearTasksHanlder = async () => {
		setTodos([]);
		const result = await deleteTodoItem();
		toast.success(result?.message, TOAST_OPTIONS);
	};
	return (
		<>
			<Header />
			<main id="main-content">
				<TodoList
					items={todos}
					onAddTask={addTaskHandler}
					onUpdateTask={updateTaskHandler}
					onRemoveTask={removeTaskHandler}
					onClearTasks={clearTasksHanlder}
					addText="Aggiungi"
					clearText="Cancella tutto"
					emptyText="Non hai ancora inserito alcuna task, inizia adesso!"
				/>
			</main>
			<Footer />
			<ToastContainer />
		</>
	);
}
