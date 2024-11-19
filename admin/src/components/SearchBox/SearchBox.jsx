import { useEffect, useState } from 'react';
import './SearchBox.css';
import SearchTable from './SearchTable';
import axios from 'axios';
import { useAuthStore } from '@/store/authStore';
import loop_icon from './loop_icon.svg';
import procent_icon from './procent_icon.svg';
import toast from 'react-hot-toast';


function SearchBox() {
	const { setRabat } = useAuthStore();
	const [list, setList] = useState([]);

	const { fetchMailList } = useAuthStore();

	const fetchList = async () => {
		const response = await fetchMailList();

		if (response.data.success) {
			setList(response.data.data);
		} else {
			toast.error('Problem z pobraniem danych');
			toast.success('Spróbuj odświeżyć stronę');
		}
	};

	useEffect(() => {
		fetchList();
	}, [list.length]);
	//fetch datas

	const [value, setValue] = useState('');

	const handleChange = (e) => {
		if (e.target.value == '10' || e.target.value == '100') {
			setValue(e.target.value);
		} else {
			if (e.target.value == '0') {
				e.preventDefault();
				return;
			}

			if (e.target.value.split('').length > 2) {
				e.preventDefault();
				return;
			}
		}
		setValue(e.target.value.replace(/[^0-9]/g, ''));

	};

	//data changing in input

	const [query, setQuery] = useState('');

	const [checkedData, setCheckedData] = useState([]);

	const handleChangeCheck = (e) => {
		if (e.target.checked == true) {
			setCheckedData((checkedData) => [...checkedData, e.target.id]);
		}
		if (e.target.checked == false) {
			let newArr = checkedData;
			let index = newArr.indexOf(e.target.id);
			if (index !== -1) {
				console.log(e.target.checked);
				newArr.splice(index, 1);
				setCheckedData(newArr);
			}
		}
	};

	const [rabatCode, setRabatCode] = useState('');

	//send selected data

	const handleSubmit = async (e) => {
		e.preventDefault();

		let rabatValue = (value / 100).toString().replace('0.', '.');
		let emailArr = checkedData;


			
		try {

			const response = await setRabat(rabatValue, emailArr);

			if(response.data.success){
				toast.success(`Rabat ${value}% ustawiony pomyślnie`);
				setCheckedData([]);
				setValue('');
				setRabatCode(response.data.rabatCode)
				//uncheck all checkboxes if success
				let checkboxesArr = document.querySelectorAll("input[type='checkbox']")
				checkboxesArr.forEach(i=>i.checked=false)
				
			  }else{
				toast.error(errorMessage)
			  }


		} catch (error) {
			toast.error('Problem z ustawieniem rabatu');
		}
	};

	//coppy to clipboard npm i react-copy-to-clipboard

	async function copyTextToClipboard(text) {
		if (navigator.clipboard) {
		  await navigator.clipboard.writeText(text);
		} else {
		  document.execCommand('copy', true, text);
		}
	  }

	  const textToCopy = rabatCode;

	  const handleCopyClick = (e) => {
		e.preventDefault(); //cause form
		copyTextToClipboard(textToCopy);
		toast.success('rabatskopiowanydo schowka');
	  };

	return (
		<form className='SearchBox' /* onClick={handleSubmit} */>
			<p>Wybierz adresy e-mail, którym chcesz przyznać rabat</p>
			{rabatCode&&<div  className='buttonBox'>
			<div className='rabatCode search'>{textToCopy}</div>
			<button onClick={(e)=>handleCopyClick(e)}>Skopiuj kod rabatowy</button>
    		</div>}
			<div className='inputBox'>
				<div className='iconBox'>
					<img src={loop_icon} alt='Wyszukaj adres email' className='icon' />
				</div>
				<input
					className='search'
					placeholder='Wyszukaj...'
					onChange={(e) => setQuery(e.target.value.toLowerCase())}
				/>
			</div>

			<div className='buttonBox'>
				<div className='inputBox'>
					<div className='iconBox'>
						<img src={procent_icon} alt='wpisz % rabatu' className='icon' />
					</div>
					<input
						className='search'
						placeholder='Wpisz wysokość rabatu'
						value={value}
						onChange={handleChange}
					/>
				</div>
				<button onClick={handleSubmit} type='submit'>
					zatwierdź
				</button>
			</div>

			<div className='list'>
				{list
					.filter((asd) => asd.includes(query))
					.map((item, i) => (
						<div className='listItem' key={i}>
							<div className='checkbox-wrapper'>
								<input type='checkbox' id={item} onChange={handleChangeCheck} />
								<label htmlFor={item}>
									<div className='tick_mark'></div>
								</label>
							</div>
							<p>{item}</p>
						</div>
					))}
			</div>
		</form>
	);
}

///////////////////////SEARCH ON A DATASearchTable

// function SearchBox() {
//   const [query, setQuery] = useState("");
//   const keys = ["first_name", "last_name", "email"];
//   const search = (data) => {
//     return data.filter((item) =>
//       keys.some((key) => item[key].toLowerCase().includes(query))
//     );
//   };
// return (
//   <div className="SearchBox">
//       <input
//         className="search"
//         placeholder="Search..."
//         onChange={(e) => setQuery(e.target.value.toLowerCase())}
//       />
//     {<SearchTable data={Search(Users)} />}
//   </div>
// );
// }

////////////////////// API SEARCH
/* 
function SearchBox() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:5000?q=${query}`);
      setData(res.data);
    };
    if (query.length === 0 || query.length > 2) fetchData();
  }, [query]);

  return (
    <div className="SearchBox">
        <input
          className="search"
          placeholder="Search..."
          onChange={(e) => setQuery(e.target.value.toLowerCase())}
        />
      {<SearchTable data={data} />}
    </div>
  );
} */

export default SearchBox;
