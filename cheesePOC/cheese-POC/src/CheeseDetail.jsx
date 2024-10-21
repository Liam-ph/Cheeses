import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './CheeseDetail.css';

function CheeseDetail() {
    const { cheeseId } = useParams();
    const [cheese, setCheese] = useState(null);
    const [error, setError] = useState(null);
    const [kilograms, setKilograms] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        async function fetchCheese() {
            const apiUrl = `http://localhost:3000/cheeses/${cheeseId}`;

            try {
                const response = await fetch(apiUrl);

                if (!response.ok) {
                    const message = `An error has occurred: ${response.status}`;
                    throw new Error(message);
                }

                const data = await response.json();
                setCheese(data);
            } catch (error) {
                setError(error.message);
                console.error('Error fetching data:', error);
            }
        }

        fetchCheese();
    }, [cheeseId]);

    const handleKilogramsChange = (event) => {
        const newKilograms = event.target.value;
        setKilograms(newKilograms);
        if (cheese) {
            setTotalPrice(newKilograms * cheese.price_per_kilo);
        }
    };

    if (error) {
        return <p>Error: {error}</p>;
    }
    if (!cheese) {
        return <p>Loading...</p>;
    }

    return (
        <div className="cheese-detail">
            <h2>{cheese.name}</h2>
            <p>Colour: {cheese.colour}</p>
            <p>Price Per Kilogram: ${cheese.price_per_kilo.toFixed(2)}</p>
            <div className='price-calculator'>
                <h3>Price Calculator</h3>
                <label htmlFor="kilograms">Kilograms: </label>
                <input
                    type="number"
                    min="0"
                    id="kilograms"
                    name="kilograms"
                    value={kilograms}
                    onChange={handleKilogramsChange}
                    placeholder="Enter kgs"
                />
                <p>Total Price: ${totalPrice.toFixed(2)}</p>
            </div>
            {cheese.picture && (
                <img
                    src={cheese.picture}
                    alt={cheese.name}
                    className="cheese-image"
                />
            )}
        </div>
    );
}

export default CheeseDetail;