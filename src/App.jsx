import { useEffect, useState } from 'react'

function App() {

	const Katakana = [
		{ romanji: 'a', katakana: 'ア' },
		{ romanji: 'i', katakana: 'イ' },
		{ romanji: 'u', katakana: 'ウ' },
		{ romanji: 'e', katakana: 'エ' },
		{ romanji: 'o', katakana: 'オ' },
		{ romanji: 'ka', katakana: 'カ' },
		{ romanji: 'ki', katakana: 'キ' },
		{ romanji: 'ku', katakana: 'ク' },
		{ romanji: 'ke', katakana: 'ケ' },
		{ romanji: 'ko', katakana: 'コ' },
		{ romanji: 'sa', katakana: 'サ' },
		{ romanji: 'shi', katakana: 'シ' },
		{ romanji: 'su', katakana: 'ス' },
		{ romanji: 'se', katakana: 'セ' },
		{ romanji: 'so', katakana: 'ソ' },
		{ romanji: 'ta', katakana: 'タ' },
		{ romanji: 'chi', katakana: 'チ' },
		{ romanji: 'tsu', katakana: 'ツ' },
		{ romanji: 'te', katakana: 'テ' },
		{ romanji: 'to', katakana: 'ト' },
		{ romanji: 'na', katakana: 'ナ' },
		{ romanji: 'ni', katakana: 'ニ' },
		{ romanji: 'nu', katakana: 'ヌ' },
		{ romanji: 'ne', katakana: 'ネ' },
		{ romanji: 'no', katakana: 'ノ' },
		{ romanji: 'ha', katakana: 'ハ' },
		{ romanji: 'hi', katakana: 'ヒ' },
		{ romanji: 'fu', katakana: 'フ' },
		{ romanji: 'he', katakana: 'ヘ' },
		{ romanji: 'ho', katakana: 'ホ' },
		{ romanji: 'ma', katakana: 'マ' },
		{ romanji: 'mi', katakana: 'ミ' },
		{ romanji: 'mu', katakana: 'ム' },
		{ romanji: 'me', katakana: 'メ' },
		{ romanji: 'mo', katakana: 'モ' },
		{ romanji: 'ya', katakana: 'ヤ' },
		{ romanji: 'yu', katakana: 'ユ' },
		{ romanji: 'yo', katakana: 'ヨ' },
		{ romanji: 'ra', katakana: 'ラ' },
		{ romanji: 'ri', katakana: 'リ' },
		{ romanji: 'ru', katakana: 'ル' },
		{ romanji: 're', katakana: 'レ' },
		{ romanji: 'ro', katakana: 'ロ' },
		{ romanji: 'wa', katakana: 'ワ' },
		{ romanji: 'wo', katakana: 'ヲ' },
		{ romanji: 'n', katakana: 'ン' }
	]

	const [input, setInput] = useState('')
	const [current, setCurrent] = useState(0)
	
	const [streak, setStreak] = useState(0)
	const [maxStreak, setMaxStreak] = useState(0)

	const [error, setError] = useState(false)

	const setRandomKatakana = () => {
		const randomIndex = Math.floor(Math.random() * katakana.length)
		setCurrent(randomIndex)
	}

	const handleChange = (e) => {
		setInput(e.target.value)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		 
		if (input.toLowerCase() === katakana[current].romanji) {
			setStreak(streak + 1)
			setMaxStreak(streak + 1 > maxStreak ? streak + 1 : maxStreak)
			setError(false)

			localStorage.setItem('streak', streak + 1)
			localStorage.setItem('maxStreak', streak + 1 > maxStreak ? streak + 1 : maxStreak)
		} else {
			const h = katakana[current].katakana
			const r = katakana[current].romanji
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
				<p>{katakana[current].katakana}</p>
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