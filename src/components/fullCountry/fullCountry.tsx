import './fullCountry.css';

interface Props {
	src: string;
	name: string;
	code: string;
	capital: string;
	population: number;
	subregion: string;
	borders: string[];
}

const FullCountry = ({ src, name, code, capital, population, subregion, borders }: Props) => {
	let counter = 0;

	return (
		<div className='full-country__container'>
			<img className='full-country__image' src={src} alt="flag" />
			<p className="full-country__name">{name}</p>
			<p className="full-country__info">Country code: {code}</p>
			<p className="full-country__info">Capital: {capital}</p>
			<p className="full-country__info">Population: {population}</p>
			<p className="full-country__info">Subregion: {subregion}</p>
			<ul className={borders.length <= 11 ? "full-country__borders" : "full-country__borders overflow"}>
				Borders:
				{borders.length === 0 ?
					<li className="full-country__border">This country has no borders</li> :
					borders.map((border) =>
						<li key={counter} className="full-country__border">{counter += 1}. {border}</li>
					)}
			</ul>
		</div>
	)
}

export default FullCountry;