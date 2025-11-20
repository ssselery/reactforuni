import "@a1rth/css-normalize";
import "./styles/index.scss";
import "./App.scss";

import TechnologyCard from "./components/TechnologyCard.jsx";
import ProgressHeader from "./components/ProgressHeader.jsx";

function App() {
	const technologies = [
		{
			id: 1,
			title: "React Components",
			description: "Изучение базовых компонентов",
			status: "in-progress",
		},
		{
			id: 2,
			title: "JSX Syntax",
			description: "Освоение синтаксиса JSX",
			status: "in-progress",
		},
		{
			id: 3,
			title: "State Management",
			description: "Работа с состоянием компонентов",
			status: "not-started",
		},
	];
	
	return (
		<div className="App container">
			{/* Заголовок прогресса */}
			<ProgressHeader technologies={technologies} />
			
			{/* Основной заголовок */}
			<h2>Моя дорожная карта</h2>
			
			{/* Список карточек */}
			<div className="tech-list">
				{technologies.map((tech) => (
					<TechnologyCard
						key={tech.id}
						title={tech.title}
						description={tech.description}
						status={tech.status}
					/>
				))}
			</div>
		</div>
	);
}

export default App;
