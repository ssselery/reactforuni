import './TechnologyCard.scss'

function TechnologyCard( {title, description, status }) {
	let statusText
	let statusClass
	
	if (status === 'completed') {
		statusText = 'Изучено'
		statusClass = 'tech-card__status tech-card__status--completed'
	} else if (status === 'in-progress') {
		statusText = 'В процессе'
		statusClass = 'tech-card__status tech-card__status--in-progress'
	} else {
		statusText = 'Не начато'
		statusClass = 'tech-card__status tech-card__status--not-started'
	}
	
	return (
		<article className={`tech-card tech-card--${status}`}>
			<h3 className="tech-card__title">{title}</h3>
			<p className="tech-card__description">{description}</p>
			<span className={statusClass}>{statusText}</span>
		</article>
	)
}

export default TechnologyCard