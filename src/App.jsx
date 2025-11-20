import "@a1rth/css-normalize";
import "./styles/index.scss";
import "./App.scss";

import { useState } from "react";

import useTechnologies from "./hooks/useTechnologies";

import TechnologyCard from "./components/TechnologyCard.jsx";
import ProgressHeader from "./components/ProgressHeader.jsx";
import Modal from "./components/Modal.jsx";
import QuickActions from "./components/QuickActions.jsx";

import "./styles/components/Filters.scss";
import "./styles/components/Search.scss";
import "./styles/components/Toast.scss";

function App() {
	const {
		technologies,
		updateStatus,
		updateNotes,
		resetAll,
		updateAll,
		markAllCompleted,
		progress,
	} = useTechnologies();
	
	const [filter, setFilter] = useState("all");
	const [search, setSearch] = useState("");
	
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedTech, setSelectedTech] = useState(null);
	
	const [toast, setToast] = useState(null);
	
	const importData = (file) => {
		const reader = new FileReader();
		
		reader.onload = (event) => {
			try {
				const parsed = JSON.parse(event.target.result);
				
				if (!Array.isArray(parsed)) {
					showToast("Файл должен содержать массив", "error");
					return;
				}
				
				const valid = parsed.every(
					(item) =>
						typeof item.id === "number" &&
						typeof item.title === "string" &&
						typeof item.status === "string"
				);
				
				if (!valid) {
					showToast("Неверная структура", "error");
					return;
				}
				
				updateAll(parsed);
				
				showToast("Импорт успешно выполнен!", "success");
			} catch {
				showToast("Ошибка чтения файла", "error");
			}
		};
		
		const showToast = (message, type = "success") => {
			setToast({ message, type });
			
			setTimeout(() => {
				setToast(null);
			}, 3000);
		};
		
		reader.readAsText(file);
	};
	
	
	const resetProgress = () => {
		setFilter("all");
		resetAll();
	};
	
	const filteredTechnologies = technologies.filter((t) => {
		const statusMatch = filter === "all" || t.status === filter;
		
		const searchMatch =
			t.title.toLowerCase().includes(search.toLowerCase()) ||
			t.description.toLowerCase().includes(search.toLowerCase());
		
		return statusMatch && searchMatch;
	});
	
	const openModal = (tech) => {
		setSelectedTech(tech);
		setIsModalOpen(true);
	};
	
	const closeModal = () => {
		setIsModalOpen(false);
		setSelectedTech(null);
	};
	
	return (
		<div className="App container">
			<ProgressHeader technologies={technologies} progress={progress} />
			
			<input
				type="text"
				className="search-input"
				placeholder="Поиск по технологиям..."
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
			
			<QuickActions
				onMarkAll={markAllCompleted}
				onExport={() => {
					const blob = new Blob([JSON.stringify(technologies)], {
						type: "application/json",
					});
					const url = URL.createObjectURL(blob);
					const a = document.createElement("a");
					a.href = url;
					a.download = "technologies.json";
					a.click();
					URL.revokeObjectURL(url);
				}}
				onImport={importData}
			/>
			
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
						onStatusChange={updateStatus}
						onNotesChange={(id, note) => updateNotes(id, note)}
						onDetails={() => openModal(tech)}
					/>
				))}
			</div>
			
			<Modal
				isOpen={isModalOpen}
				onClose={closeModal}
				title={selectedTech ? selectedTech.title : "Загрузка..."}
			>
				{selectedTech && (
					<div className="modal-info">
						<div
							className={`modal-status modal-status--${selectedTech.status}`}
						>
							{{
								"not-started": "Не начато",
								"in-progress": "В процессе",
								"completed": "Изучено",
							}[selectedTech.status]}
						</div>
						
						<p>
							<strong>Описание:</strong> {selectedTech.description}
						</p>
						
						{selectedTech.links && selectedTech.links.length > 0 && (
							<>
								<h4>Полезные материалы:</h4>
								<ul className="modal-links">
									{selectedTech.links.map((link) => (
										<li key={link.url}>
											<a
												href={link.url}
												target="_blank"
												rel="noreferrer"
											>
												{link.label}
											</a>
										</li>
									))}
								</ul>
							</>
						)}
						
						<h4>Заметка:</h4>
						<p>{selectedTech.notes || "—"}</p>
					</div>
				)}
				
				<div className="modal-footer">
					<button className="modal-close-btn" onClick={closeModal}>
						Закрыть
					</button>
				</div>
			</Modal>
			
			{toast && (
				<div className={`toast toast--${toast.type}`}>
					{toast.message}
				</div>
			)}
		
		</div>
	);
}

export default App;
