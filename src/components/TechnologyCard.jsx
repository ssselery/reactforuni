import "./TechnologyCard.scss";
import TechnologyNotes from "./TechnologyNotes.jsx";

function TechnologyCard({
	                        id,
	                        title,
	                        description,
	                        status,
	                        notes,
	                        onStatusChange,
	                        onNotesChange,
													onDetails,
                        }) {
	const statusText = {
		"not-started": "Не начато",
		"in-progress": "В процессе",
		completed: "Изучено",
	};
	
	const nextStatus = {
		"not-started": "in-progress",
		"in-progress": "completed",
		completed: "not-started",
	};
	
	return (
		<div className="tech-card">
			<h3 className="tech-card__title">{title}</h3>
			<p className="tech-card__description">{description}</p>
			
			<button
				className="tech-card__details-btn"
				onClick={(e) => {
					e.stopPropagation();
					onDetails();
				}}
			>
				Подробнее
			</button>
			
			
			<span
				className={`tech-card__status tech-card__status--${status}`}
				onClick={(e) => {
					e.stopPropagation();
					onStatusChange(id, nextStatus[status]);
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
