function Tabs({ filter, setFilter }) {
	const tabs = [
		{ id: 'all', label: 'All' },
		{ id: 'active', label: 'Active' },
		{ id: 'completed', label: 'Completed' },
	];
	
	return (
		<div className="tabs">
			{tabs.map((tab) => (
				<button
					key={tab.id}
					className={`tabs__button ${filter === tab.id ? 'tabs__button--active' : ''}`}
					onClick={() => setFilter(tab.id)}
				>
					{tab.label}
				</button>
			))}
		</div>
	);
}

export default Tabs;