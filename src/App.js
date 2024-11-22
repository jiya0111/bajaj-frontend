import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

const options = [
  { value: 'alphabets', label: 'Alphabets' },
  { value: 'numbers', label: 'Numbers' },
  { value: 'highest_lowercase_alphabet', label: 'Highest Lowercase Alphabet' },
];

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async () => {
    try {
      const jsonInput = JSON.parse(input); // Validate JSON
      const res = await axios.post('https://your-backend-url/bfhl', jsonInput); // Replace with backend URL
      setResponse(res.data);
    } catch (error) {
      alert('Invalid JSON or server error');
    }
  };

  const renderResponse = () => {
    if (!response) return null;

    const filteredResponse = selectedOptions.reduce((acc, option) => {
      acc[option.value] = response[option.value];
      return acc;
    }, {});

    return <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>;
  };

  return (
    <div className="App" style={{ padding: '20px' }}>
      <h1>Your Roll Number</h1>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter JSON input here"
        rows="5"
        cols="50"
        style={{ marginBottom: '10px' }}
      />
      <br />
      <button onClick={handleSubmit} style={{ marginBottom: '10px' }}>Submit</button>
      <br />

      {response && (
        <div>
          <Select
            isMulti
            options={options}
            onChange={(selected) => setSelectedOptions(selected)}
          />
          {renderResponse()}
        </div>
      )}
    </div>
  );
}

export default App;
