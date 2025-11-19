function Task({ text, completed, onToggle, onDelete }) {
	return (
		<div className={`task ${completed ? 'task--completed' : ''}`}>
			<label className="task__checkbox">
				<input
					type="checkbox"
					checked={completed}
					onChange={onToggle}
					className="task__checkbox-input"
				/>
				<span className="task__checkbox-custom"></span>
			</label>
			
			<span className="task__text">{text}</span>
			
			<button onClick={onDelete} className="task__delete">
				×
			</button>
		</div>
	);
}

export default Task;