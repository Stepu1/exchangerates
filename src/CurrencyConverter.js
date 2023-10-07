import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = ''; // Tähän oma api key
const URL = 'https://api.freecurrencyapi.com/v1/latest';

const CurrencyConverter = () => {
  const [exchangeRate, setExchangeRate] = useState(null);
  const [amountInEur, setAmountInEur] = useState(1);
  const [convertedAmountInGbp, setConvertedAmountInGbp] = useState(null);

  useEffect(() => {
    fetchExchangeRate();
  }, []);

  const fetchExchangeRate = async () => {
    try {
      const response = await axios.get(`${URL}?apikey=${API_KEY}&base_currency=EUR`);
      const exchangeRatesData = response.data.data;
      const gbpExchangeRate = exchangeRatesData['GBP'];
      setExchangeRate(gbpExchangeRate);
    } catch (error) {
      console.error('Error fetching exchange rate:', error);
    }
  };

  const handleConversion = () => {
    if (exchangeRate !== null) {
      const result = amountInEur * exchangeRate;
      setConvertedAmountInGbp(result);
    }
  };

  return (
    <div className="currency-converter">
      <h1>Currency Converter</h1>
      
      <div>
        <label>Amount in EUR:</label>
        <input
          type="number"
          value={amountInEur}
          onChange={(e) => setAmountInEur(e.target.value)}
        />
      </div>
      <div>
        <button onClick={handleConversion}>Convert</button>
      </div>
      {convertedAmountInGbp !== null && (
        <div>
          <label>Converted Amount in Pounds:</label>
          <span>{convertedAmountInGbp.toFixed(2)}</span>
        </div>
      )}
    </div>
  );
};

export default CurrencyConverter;