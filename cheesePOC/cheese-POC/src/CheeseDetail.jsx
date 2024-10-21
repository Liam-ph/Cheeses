import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function CheeseDetail() {
    const { cheeseId } = useParams();
    const [cheese, setCheese] = useState(null);
    const [error, setError] = useState(null);

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
            <p>Price Per Kilogram: ${cheese.price_per_kilo}</p>
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