import "@a1rth/css-normalize";
import "./styles/index.scss";
import "./App.scss";

import { useState, useEffect } from "react";
import TechnologyCard from "./components/TechnologyCard.jsx";
import ProgressHeader from "./components/ProgressHeader.jsx";

import "./styles/components/Filters.scss";
import "./styles/components/Search.scss";

function App() {

	const [technologies, setTechnologies] = useState(() => {
		const saved = localStorage.getItem("techTrackerData");
		return saved
			? JSON.parse(saved)
			: [
				{
					id: 1,
					title: "React Components",
					description: "Изучение базовых компонентов",
					status: "not-started",
					notes: "",
				},
				{
					id: 2,
					title: "JSX Syntax",
					description: "Освоение синтаксиса JSX",
					status: "not-started",
					notes: "",
				},
				{
					id: 3,
					title: "State Management",
					description: "Работа с состоянием компонентов",
					status: "not-started",
					notes: "",
				},
			];
	});
	
	const [filter, setFilter] = useState("all");
	const [search, setSearch] = useState("");
	
	useEffect(() => {
		localStorage.setItem("techTrackerData", JSON.stringify(technologies));
	}, [technologies]);

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

	const updateTechnologyNotes = (id, newNotes) => {
		setTechnologies((prev) =>
			prev.map((tech) =>
				tech.id === id ? { ...tech, notes: newNotes } : tech
			)
		);
	};

	const resetProgress = () => {
		setFilter("all");
		setTechnologies((prev) =>
			prev.map((tech) => ({
				...tech,
				status: "not-started",
				notes: "",
			}))
		);
	};

	const filteredTechnologies = technologies.filter((t) => {
		const statusMatch = filter === "all" || t.status === filter;
		
		const searchMatch =
			t.title.toLowerCase().includes(search.toLowerCase()) ||
			t.description.toLowerCase().includes(search.toLowerCase());
		
		return statusMatch && searchMatch;
	});

	return (
		<div className="App container">
			
			<ProgressHeader technologies={technologies} />
			
			<input
				type="text"
				className="search-input"
				placeholder="Поиск по технологиям..."
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
			
			<div className="filters">
				<button className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>Все</button>
				<button className={filter === "not-started" ? "active" : ""} onClick={() => setFilter("not-started")}>Не начато</button>
				<button className={filter === "in-progress" ? "active" : ""} onClick={() => setFilter("in-progress")}>В процессе</button>
				<button className={filter === "completed" ? "active" : ""} onClick={() => setFilter("completed")}>Изучено</button>
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
						onNotesChange={updateTechnologyNotes}
					/>
				))}
			</div>
		</div>
	);
}

export default App;
