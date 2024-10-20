const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

// In-memory "database" for cheeses
let cheeses = [];

// Load Swagger documentation from YAML file
const swaggerDocument = YAML.load('./swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// CRUD operations
app.get('/cheeses', (req, res) => {
    res.json(cheeses);
});

app.post('/cheeses', (req, res) => {
    const { name, picture, colour, price_per_kilo } = req.body;
    const newCheese = { id: cheeses.length + 1, name, picture, colour, price_per_kilo };
    cheeses.push(newCheese);
    res.status(201).json(newCheese);
});

app.get('/cheeses/:id', (req, res) => {
    const cheese = cheeses.find(c => c.id === parseInt(req.params.id));
    if (!cheese) return res.status(404).json({ message: 'Cheese not found' });
    res.json(cheese);
});

app.put('/cheeses/:id', (req, res) => {
    const cheese = cheeses.find(c => c.id === parseInt(req.params.id));
    if (!cheese) return res.status(404).json({ message: 'Cheese not found' });

    const { name, picture, colour, price_per_kilo } = req.body;
    cheese.name = name || cheese.name;
    cheese.picture = picture || cheese.picture;
    cheese.colour = colour || cheese.colour;
    cheese.price_per_kilo = price_per_kilo || cheese.price_per_kilo;

    res.json(cheese);
});

app.delete('/cheeses/:id', (req, res) => {
    const cheeseIndex = cheeses.findIndex(c => c.id === parseInt(req.params.id));
    if (cheeseIndex === -1) return res.status(404).json({ message: 'Cheese not found' });

    cheeses.splice(cheeseIndex, 1);
    res.status(204).send();
});

// Start the server
app.listen(port, () => {
    console.log(`API server is running at http://localhost:${port}`);
    console.log(`Swagger UI is available at http://localhost:${port}/api-docs`);
});
