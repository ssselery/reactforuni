import Task from './Task';

function TaskList({ tasks, onToggle, onDelete }) {
	return (
		<div className="task-list">
			{tasks.length === 0 ? (
				<p className="task-list__empty">Пока нет задач. Добавьте первую!</p>
			) : (
				tasks.map((task, index) => (
					<Task
						key={index}
						text={task.text}
						completed={task.completed}
						onToggle={() => onToggle(index)}
						onDelete={() => onDelete(index)}
					/>
				))
			)}
		</div>
	);
}

export default TaskList;