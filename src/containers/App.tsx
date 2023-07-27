import { useEffect, useState } from 'react';
import Country from '@/components/country/country';
import FullCountry from '@/components/fullCountry/fullCountry';
import api from '@/components/api/apiService';
import { NAME_URL, COUNTRY_URL } from '@/components/api/URL';
import './App.css';

interface Country {
	name: { official: string };
	cca3: string;
	capital: string[];
	population: number;
	subregion: string;
	borders: string[];
	flags: { png: string },
}

const App = () => {
	const [names, setNames] = useState<string[]>([]);
	const [showInfo, setShowInfo] = useState(false);
	const [borders, setBorders] = useState<string[]>([]);
	const [country, setCountry] = useState<Country>({
		name: { official: '' },
		cca3: '',
		capital: [],
		population: 0,
		subregion: '',
		borders: [],
		flags: { png: '' },
	});

	const requestCountries = async () => {
		const { data: countries } = await api.get<Country[]>(NAME_URL);
		const promises = countries.map(async (country) => country.name.official)
		const countriesNames = (await Promise.all(promises)).sort();
		setNames(countriesNames);
	}

	const requestBorders = async (country: Country) => {
		const bordersFullName = country.borders.map(async (border) => {
			const { data: borderFullName } = await api.get<Country>(`alpha/${border}` + COUNTRY_URL);
			return borderFullName.name.official;
		});
		const newBorders = (await Promise.all(bordersFullName)).sort();
		setBorders(newBorders);
	}

	const requestCountry = async (nameCountry: string) => {
		const { data: country } = await api.get<[Country]>(`name/${nameCountry}` + COUNTRY_URL);
		setCountry(country[0]);
		requestBorders(country[0]);
		setShowInfo(true);
	}

	useEffect(() => {
		requestCountries();
	}, [])

	let counter = 0;
	return (
		<>
			<div className="countries">
				<p className='countries__title'>Countries</p>
				{names.map((name) => {
					return <Country key={counter}
						name={`${counter += 1}. ${name}`}
						onClick={() => requestCountry(name)} />
				})}
			</div>
			{showInfo === true ? <FullCountry
				src={country.flags.png}
				name={country.name.official}
				code={country.cca3}
				capital={country.capital[0]}
				population={country.population}
				subregion={country.subregion}
				borders={borders}
			/> : <p className='full-country__no-info'>Choose the country</p>}
		</>
	)
}

export default App;