import './ProgessHeader.scss'

function ProgressHeader({ technologies }) {
	const total = technologies.length;
	const completed = technologies.filter((t) => t.status === 'completed').length;
	const percent = Math.round((completed / total) * 100);
	
	return (
		<header className="progress-header">
			<h2>Прогресс изучения</h2>
			
			<div className="progress-header__stats">
				<span>Всего: {total}</span>
				<span>Изучено: {completed}</span>
				<span className="percent">{percent}%</span>
			</div>
			
			<div className="progress-header__bar">
				<div
					className="progress-header__bar-fill"
					style={{ width: `${percent}%` }}
				></div>
			</div>
		</header>
	);
}

export default ProgressHeader;
