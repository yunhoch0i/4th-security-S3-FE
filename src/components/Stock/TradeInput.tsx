import React, { useState } from 'react';

const TradeInput = () => {
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('buy'); // 'buy' or 'sell'

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(e.target.value);
    };

    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setType(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle trade submission logic here
        console.log(`Submitting ${type} trade for amount: ${amount}`);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="trade-type">Trade Type:</label>
                <select id="trade-type" value={type} onChange={handleTypeChange}>
                    <option value="buy">Buy</option>
                    <option value="sell">Sell</option>
                </select>
            </div>
            <div>
                <label htmlFor="amount">Amount:</label>
                <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={handleAmountChange}
                    required
                />
            </div>
            <button type="submit">Submit Trade</button>
        </form>
    );
};

export default TradeInput;