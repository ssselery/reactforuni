import "@a1rth/css-normalize";

import "./styles/index.scss";
import "./App.scss";
import "./styles/components/Filters.scss"

import { useState } from "react";
import TechnologyCard from "./components/TechnologyCard.jsx";
import ProgressHeader from "./components/ProgressHeader.jsx";

function App() {
	const [technologies, setTechnologies] = useState([
		{
			id: 1,
			title: "React Components",
			description: "Изучение базовых компонентов",
			status: "not-started",
		},
		{
			id: 2,
			title: "JSX Syntax",
			description: "Освоение синтаксиса JSX",
			status: "not-started",
		},
		{
			id: 3,
			title: "State Management",
			description: "Работа с состоянием компонентов",
			status: "not-started",
		},
	]);
	
	const [filter, setFilter] = useState("all");
	
	const toggleStatus = (id) => {
		setTechnologies((prev) =>
			prev.map((tech) => {
				if (tech.id !== id) return tech;
				
				const order = ["not-started", "in-progress", "completed"];
				const next = order[(order.indexOf(tech.status) + 1) % order.length];
				
				return { ...tech, status: next };
			})
		);
	};
	
	const resetProgress = () => {
		setFilter("all");
		setTechnologies((prev) =>
			prev.map((tech) => ({ ...tech, status: "not-started" }))
		);
	};
	
	
	const filteredTechnologies = technologies.filter((t) => {
		if (filter === "all") return true;
		return t.status === filter;
	});
	
	return (
		<div className="App container">
			<ProgressHeader technologies={technologies} />
			
			<div className="filters">
				<button
					className={filter === "all" ? "active" : ""}
					onClick={() => setFilter("all")}
				>
					Все
				</button>
				
				<button
					className={filter === "not-started" ? "active" : ""}
					onClick={() => setFilter("not-started")}
				>
					Не начато
				</button>
				
				<button
					className={filter === "in-progress" ? "active" : ""}
					onClick={() => setFilter("in-progress")}
				>
					В процессе
				</button>
				
				<button
					className={filter === "completed" ? "active" : ""}
					onClick={() => setFilter("completed")}
				>
					Изучено
				</button>
			</div>
			
			<button className="reset-btn" onClick={resetProgress}>
				Сбросить прогресс
			</button>
			
			<h2>Моя дорожная карта</h2>
			
			<div className="tech-list">
				{filteredTechnologies.map((tech) => (
					<TechnologyCard
						key={tech.id}
						{...tech}
						onStatusChange={() => toggleStatus(tech.id)}
					/>
				))}
			</div>
		</div>
	);
}

export default App;
