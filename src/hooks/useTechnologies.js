import useLocalStorage from "./useLocalStorage";

const initialTechnologies = [
	{
		id: 1,
		title: "React Components",
		description: "Изучение базовых компонентов React и создание своих.",
		status: "not-started",
		notes: "",
		links: [
			{ label: "Официальная документация", url: "https://react.dev" },
			{ label: "Компоненты React", url: "https://react.dev/learn/your-first-component" }
		]
	},
	{
		id: 2,
		title: "JSX Syntax",
		description: "Понимание JSX — основного синтаксиса React.",
		status: "not-started",
		notes: "",
		links: [
			{ label: "JSX — документация", url: "https://react.dev/learn/writing-markup-with-jsx" },
			{ label: "Учебник JSX", url: "https://legacy.reactjs.org/docs/introducing-jsx.html" }
		]
	},
	{
		id: 3,
		title: "State Management",
		description: "Работа с состоянием компонентов через useState.",
		status: "not-started",
		notes: "",
		links: [
			{ label: "Состояние в React", url: "https://react.dev/learn/state-a-components-memory" },
			{ label: "useState пример", url: "https://react.dev/reference/react/useState" }
		]
	}
];

function useTechnologies() {
	const [technologies, setTechnologies] = useLocalStorage(
		"technologies",
		initialTechnologies
	);

	const updateStatus = (techId, newStatus) => {
		setTechnologies((prev) =>
			prev.map((tech) =>
				tech.id === techId ? { ...tech, status: newStatus } : tech
			)
		);
	};

	const updateNotes = (techId, newNotes) => {
		setTechnologies((prev) =>
			prev.map((tech) =>
				tech.id === techId ? { ...tech, notes: newNotes } : tech
			)
		);
	};

	const resetAll = () => {
		setTechnologies(initialTechnologies);
	};
	
	const markAllCompleted = () => {
		setTechnologies((prev) =>
			prev.map((t) => ({
				...t,
				status: "completed"
			}))
		);
	};
	
	const calculateProgress = () => {
		if (technologies.length === 0) return 0;
		const completed = technologies.filter(
			(tech) => tech.status === "completed"
		).length;
		return Math.round((completed / technologies.length) * 100);
	};
	
	const updateAll = (newData) => {
		setTechnologies(newData);
	};
	
	return {
		technologies,
		updateStatus,
		updateNotes,
		resetAll,
		markAllCompleted,
		updateAll,
		progress: calculateProgress(),
	};
}

export default useTechnologies;
