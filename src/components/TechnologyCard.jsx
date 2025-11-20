import "./TechnologyCard.scss";

function TechnologyCard({ title, description, status, onStatusChange }) {
	const statusText = {
		"not-started": "Не начато",
		"in-progress": "В процессе",
		completed: "Изучено",
	};
	
	return (
		<div className="tech-card" onClick={onStatusChange}>
			<h3 className="tech-card__title">{title}</h3>
			<p className="tech-card__description">{description}</p>
			
			<span className={`tech-card__status tech-card__status--${status}`}>
        {statusText[status]}
      </span>
		</div>
	);
}

export default TechnologyCard;
