import { REST_API_URL } from '../config/constants';

async function getTodoItems() {
	const res = await fetch(`${REST_API_URL}/todos/`);
	const data = await res.json();
	return data || [];
}

async function getTodoItem(id) {
	const res = await fetch(`${REST_API_URL}/todos/?id=${id}`);
	const data = await res.json();
	return data || {};
}

async function createTodoItem(task) {
	const res = await fetch(`${REST_API_URL}/todos/`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(task),
	});
	const json = await res.json();
	return json || {};
}

async function updateTodoItem(id, toUpdate) {
	const res = await fetch(`${REST_API_URL}/todos/`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ id, ...toUpdate }),
	});
	const json = await res.json();
	return json || {};
}

async function deleteTodoItem(id = 0) {
	const toDelete = id ? { id } : {};
	const res = await fetch(`${REST_API_URL}/todos/`, {
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(toDelete),
	});
	const json = await res.json();
	return json || {};
}

export { getTodoItems, getTodoItem, createTodoItem, updateTodoItem, deleteTodoItem };
