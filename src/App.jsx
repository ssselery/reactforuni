import './App.scss';
import Greeting from './components/Greeting';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';
import Tabs from './components/Tabs';
import { useState, useEffect } from 'react';

function App() {
	const [tasks, setTasks] = useState(() => {
		const saved = localStorage.getItem('todo-tasks-v1');
		if (saved && JSON.parse(saved).length > 0) return JSON.parse(saved);
		
		return [
			{ text: 'Поприветствовать пользователя', completed: true }
		];
	});
	
	const [filter, setFilter] = useState('all');
	
	useEffect(() => {
		localStorage.setItem('todo-tasks-v1', JSON.stringify(tasks));
	}, [tasks]);
	
	const addTask = (text) => {
		setTasks([...tasks, { text, completed: false }]);
	};
	
	const toggleTask = (index) => {
		setTasks(tasks.map((t, i) =>
			i === index ? { ...t, completed: !t.completed } : t
		));
	};
	
	const deleteTask = (index) => {
		setTasks(tasks.filter((_, i) => i !== index));
	};
	
	const clearCompleted = () => {
		setTasks(tasks.filter(task => !task.completed));
	};
	
	const activeCount = tasks.filter(t => !t.completed).length;
	const hasCompleted = tasks.some(t => t.completed);
	
	return (
		<div className="app">
			<div className="app__container">
				<header className="app__header">
					<h1 className="app__title">ToDo Mini-App</h1>
				</header>
				
				{}
				<Greeting name="ssselery" />
				
				<AddTask onAdd={addTask} />
				
				{}
				<Tabs filter={filter} setFilter={setFilter} />
				
				<TaskList
					tasks={tasks}
					filter={filter}
					onToggle={toggleTask}
					onDelete={deleteTask}
				/>
				
				{}
				{tasks.length > 0 && (
					<footer className="app__footer">
            <span className="app__footer-count">
              {activeCount} активных задач
            </span>
						
						{hasCompleted && (
							<button onClick={clearCompleted} className="app__footer-clear">
								Очистить выполненные
							</button>
						)}
					</footer>
				)}
			</div>
		</div>
	);
}

export default App;