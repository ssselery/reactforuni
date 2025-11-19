import { useState } from 'react';

function AddTask({ onAdd }) {
	const [text, setText] = useState('');
	
	const handleSubmit = (e) => {
		e.preventDefault();
		if (text.trim()) {
			onAdd(text.trim());
			setText('');
		}
	};
	
	return (
		<form className="add-task" onSubmit={handleSubmit}>
			<input
				type="text"
				placeholder="Что нужно сделать?"
				value={text}
				onChange={(e) => setText(e.target.value)}
				className="add-task__input"
			/>
			<button type="submit" className="add-task__button">
				Add
			</button>
		</form>
	);
}

export default AddTask;