function Greeting({ name = 'Друг' }) {
	
	const hour = new Date().getHours();
	let greeting;
	
	if (hour < 6) greeting = 'Доброй ночи';
	else if (hour < 12) greeting = 'Доброе утро';
	else if (hour < 18) greeting = 'Добрый день';
	else greeting = 'Добрый вечер';
	
	return (
		<div className="greeting">
			<h2 className="greeting__title">
				{greeting}, {name}!
			</h2>
			<p className="greeting__text">
				Рады видеть вас в нашем приложении.
			</p>
		</div>
	);
}

export default Greeting;