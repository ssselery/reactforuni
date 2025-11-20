import "./QuickActions.scss";

function QuickActions({ onMarkAll, onExport, onImport }) {
	return (
		<div className="quick-actions">
			<input
				type="file"
				accept="application/json"
				id="import-file-input"
				style={{ display: "none" }}
				onChange={(e) => e.target.files[0] && onImport(e.target.files[0])}
			/>
			
			<button onClick={onMarkAll} className="qa-btn qa-btn--success">
				Отметить все как выполненные
			</button>
			
			<button onClick={onExport} className="qa-btn qa-btn--info">
				Экспорт данных
			</button>
			
			<button
				className="qa-btn qa-btn--import"
				onClick={() => document.getElementById("import-file-input").click()}
			>
				Импорт данных
			</button>
		</div>
	);
}

export default QuickActions;
