import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AverageCalculator() {
  const [numberType, setNumberType] = useState('e');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:9876/numbers/${numberType}');
      setData(response.data);
    } catch (err) {
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [numberType]);

  return (
    <div>
      <h1>Average Calculator</h1>
      <div>
        <label>
          Select Number Type:
          <select value={numberType} onChange={e => setNumberType(e.target.value)}>
            <option value="p">Prime</option>
            <option value="f">Fibonacci</option>
            <option value="e">Even</option>
            <option value="r">Random</option>
          </select>
        </label>
      </div>
      <button onClick={fetchData}>Fetch Data</button>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {data && (
        <div>
          <h2>Results</h2>
          <p><strong>Previous State:</strong> {JSON.stringify(data.windowPrevState)}</p>
          <p><strong>Current State:</strong> {JSON.stringify(data.windowCurrState)}</p>
          <p><strong>Numbers:</strong> {JSON.stringify(data.numbers)}</p>
          <p><strong>Average:</strong> {data.avg}</p>
        </div>
      )}
    </div>
  );
}

export default AverageCalculator;