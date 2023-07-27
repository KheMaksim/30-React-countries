import './country.css';

interface Props {
	name: string;
	onClick: () => void;
}

const Country = ({ name, onClick }: Props) => {
	return (
		<p className='country' onClick={onClick}>
			{name}
		</p>
	)
}

export default Country;