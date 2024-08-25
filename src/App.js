import React, { useState } from 'react';
import './App.css';

function App() {
    const [jsonInput, setJsonInput] = useState('');
    const [response, setResponse] = useState(null);
    const [filter, setFilter] = useState([]);

    const handleSubmit = async () => {
        try {
            const parsedInput = JSON.parse(jsonInput);
            const res = await fetch('YOUR_BACKEND_API_URL/bfhl', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ data: parsedInput.data })
            });
            const data = await res.json();
            setResponse(data);
        } catch (error) {
            console.error('Invalid JSON or API error:', error);
        }
    };

    const handleFilterChange = (e) => {
        const value = e.target.value;
        setFilter(prev => prev.includes(value) ? prev.filter(f => f !== value) : [...prev, value]);
    };

    return (
        <div className="App">
            <h1>BFHL Challenge</h1>
            <textarea 
                value={jsonInput} 
                onChange={(e) => setJsonInput(e.target.value)} 
                placeholder="Enter JSON input"
                className="json-input"
            />
            <button onClick={handleSubmit}>Submit</button>
            {response && (
                <div className="response">
                    <select multiple onChange={handleFilterChange}>
                        <option value="numbers">Numbers</option>
                        <option value="alphabets">Alphabets</option>
                        <option value="highest_lowercase_alphabet">Highest Lowercase Alphabet</option>
                    </select>
                    <div>
                        {filter.includes('numbers') && <div>Numbers: {response.numbers.join(', ')}</div>}
                        {filter.includes('alphabets') && <div>Alphabets: {response.alphabets.join(', ')}</div>}
                        {filter.includes('highest_lowercase_alphabet') && <div>Highest Lowercase Alphabet: {response.highest_lowercase_alphabet.join(', ')}</div>}
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
