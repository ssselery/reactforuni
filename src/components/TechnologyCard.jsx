import "./TechnologyCard.scss";
import TechnologyNotes from "./TechnologyNotes.jsx"

function TechnologyCard({ id, title, description, status, notes, onStatusChange, onNotesChange }) {
	const statusText = {
		"not-started": "Не начато",
		"in-progress": "В процессе",
		completed: "Изучено",
	};
	
	return (
		<div className="tech-card">
			<h3 className="tech-card__title">{title}</h3>
			<p className="tech-card__description">{description}</p>
			
			<span
				className={`tech-card__status tech-card__status--${status}`}
				onClick={(e) => {
					e.stopPropagation();
					onStatusChange();
				}}
			>
        {statusText[status]}
      </span>
			
			<TechnologyNotes
				notes={notes}
				techId={id}
				onNotesChange={onNotesChange}
			/>
		
		</div>
	);
}

export default TechnologyCard;
