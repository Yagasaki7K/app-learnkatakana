import { useEffect, useState } from 'react'

function App() {

	const Katakana = [
		{ romanji: 'a', Katakana: 'ア' },
		{ romanji: 'i', Katakana: 'イ' },
		{ romanji: 'u', Katakana: 'ウ' },
		{ romanji: 'e', Katakana: 'エ' },
		{ romanji: 'o', Katakana: 'オ' },
		{ romanji: 'ka', Katakana: 'カ' },
		{ romanji: 'ki', Katakana: 'キ' },
		{ romanji: 'ku', Katakana: 'ク' },
		{ romanji: 'ke', Katakana: 'ケ' },
		{ romanji: 'ko', Katakana: 'コ' },
		{ romanji: 'sa', Katakana: 'サ' },
		{ romanji: 'shi', Katakana: 'シ' },
		{ romanji: 'su', Katakana: 'ス' },
		{ romanji: 'se', Katakana: 'セ' },
		{ romanji: 'so', Katakana: 'ソ' },
		{ romanji: 'ta', Katakana: 'タ' },
		{ romanji: 'chi', Katakana: 'チ' },
		{ romanji: 'tsu', Katakana: 'ツ' },
		{ romanji: 'te', Katakana: 'テ' },
		{ romanji: 'to', Katakana: 'ト' },
		{ romanji: 'na', Katakana: 'ナ' },
		{ romanji: 'ni', Katakana: 'ニ' },
		{ romanji: 'nu', Katakana: 'ヌ' },
		{ romanji: 'ne', Katakana: 'ネ' },
		{ romanji: 'no', Katakana: 'ノ' },
		{ romanji: 'ha', Katakana: 'ハ' },
		{ romanji: 'hi', Katakana: 'ヒ' },
		{ romanji: 'fu', Katakana: 'フ' },
		{ romanji: 'he', Katakana: 'ヘ' },
		{ romanji: 'ho', Katakana: 'ホ' },
		{ romanji: 'ma', Katakana: 'マ' },
		{ romanji: 'mi', Katakana: 'ミ' },
		{ romanji: 'mu', Katakana: 'ム' },
		{ romanji: 'me', Katakana: 'メ' },
		{ romanji: 'mo', Katakana: 'モ' },
		{ romanji: 'ya', Katakana: 'ヤ' },
		{ romanji: 'yu', Katakana: 'ユ' },
		{ romanji: 'yo', Katakana: 'ヨ' },
		{ romanji: 'ra', Katakana: 'ラ' },
		{ romanji: 'ri', Katakana: 'リ' },
		{ romanji: 'ru', Katakana: 'ル' },
		{ romanji: 're', Katakana: 'レ' },
		{ romanji: 'ro', Katakana: 'ロ' },
		{ romanji: 'wa', Katakana: 'ワ' },
		{ romanji: 'wo', Katakana: 'ヲ' },
		{ romanji: 'n', Katakana: 'ン' }
	]

	const [input, setInput] = useState('')
	const [current, setCurrent] = useState(0)
	
	const [streak, setStreak] = useState(0)
	const [maxStreak, setMaxStreak] = useState(0)

	const [error, setError] = useState(false)

	const setRandomKatakana = () => {
		const randomIndex = Math.floor(Math.random() * Katakana.length)
		setCurrent(randomIndex)
	}

	const handleChange = (e) => {
		setInput(e.target.value)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		 
		if (input.toLowerCase() === Katakana[current].romanji) {
			setStreak(streak + 1)
			setMaxStreak(streak + 1 > maxStreak ? streak + 1 : maxStreak)
			setError(false)

			localStorage.setItem('streak', streak + 1)
			localStorage.setItem('maxStreak', streak + 1 > maxStreak ? streak + 1 : maxStreak)
		} else {
			const h = Katakana[current].Katakana
			const r = Katakana[current].romanji
			setError(`Wrong! The correct answer for ${h} is ${r}`)
			setStreak(0)
			localStorage.setItem('streak', 0)
		}

		setInput('')
		setRandomKatakana()
	}

	useEffect(() => {
		setRandomKatakana()
		setStreak(parseInt(localStorage.getItem('streak')) || 0)
		setMaxStreak(parseInt(localStorage.getItem('maxStreak')) || 0)
	}, [])

	return (
		<div className="min-h-screen bg-slate-800 text-white text-center">
			<header className="p-6 mb-8">
				<h1 className="text-2xl font-bold uppercase">Katakana Quiz</h1>
				<div>
					<p>{streak} / {maxStreak}</p>
				</div>
			</header>

			<div className="text-9xl font-bold mb-8">
				<p>{Katakana[current].Katakana}</p>
			</div>

			<div className="mb-8">
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						onChange={handleChange}
						value={input}
						className="block w-24 bg-transparent border-b-2 border-b-white mx-auto outline-none text-center text-6xl pb-2" />
				</form>
			</div>
			{error && 
				<div>
					<p>{ error }</p>
				</div>
			}
		</div>
	)
}

export default App