import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Cheese.css';

function Cheese() {
    const [cheeses, setCheeses] = useState([]);
    const [error, setError] = useState(null);

    async function fetchCheeses() {
        const apiUrl = 'http://localhost:3000/cheeses'; // Fetch all cheeses from API

        try {
            const response = await fetch(apiUrl);

            if (!response.ok) {
                const message = `An error has occurred: ${response.status}`;
                throw new Error(message);
            }

            const data = await response.json();
            setCheeses(data); // Assuming data is an array of cheese objects
        } catch (error) {
            setError(error.message);
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        fetchCheeses(); // Fetch all cheese data on component mount
    }, []);

    if (error) {
        return <p>Error: {error}</p>;
    }

    // HTML for rendering cheese data
    return (
        <div className="cheese-container">
            {cheeses.map(cheese => (
                <div className="cheese-item" key={cheese.id}>
                    <h2>
                        <Link to={`/cheeses/${cheese.id}`}>{cheese.name}</Link>
                    </h2>
                    <p>Colour: {cheese.colour}</p>
                    <p>Price Per Kilogram: ${cheese.price_per_kilo}</p>
                    {cheese.picture && (
                        <img
                            src={cheese.picture}
                            alt={cheese.name}
                            className="cheese-image" 
                        />
                    )}
                </div>
            ))}
        </div>
    );
}

export default Cheese;
