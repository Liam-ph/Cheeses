const request = require('supertest');
const { app } = require('../server'); // Adjust the path as necessary
const assert = require('assert'); // Import assert from Node.js

describe('Cheese API', () => {
    let server;

    before((done) => {
        server = app.listen(4000, done);  // Start the server on a different port for testing
    });

    after((done) => {
        server.close(done);  // Close the server after tests
    });

    // Test for getting all cheeses
    it('should get all cheeses', async () => {
        const res = await request(server).get('/cheeses');
        assert.strictEqual(res.statusCode, 200);
        assert(Array.isArray(res.body)); // Check if the body is an array
    });

    // Test for creating a new cheese
    it('should create a new cheese', async () => {
        const newCheese = {
            name: 'Cheddar',
            picture: 'https://www.cheese.com/media/img/cheese/cheddar_large.jpg',
            colour: 'Yellow',
            price_per_kilo: 27.60
        };
        const res = await request(server).post('/cheeses').send(newCheese);
        assert.strictEqual(res.statusCode, 201);
        assert('id' in res.body); // Check if the body has an 'id' property
        assert.strictEqual(res.body.name, newCheese.name);
    });

    // Test for getting a cheese by id
    it('should get a cheese by id', async () => {
        const newCheese = {
            name: 'Gouda',
            picture: 'https://www.cheese.com/media/img/cheese-suggestion/Old_Gouda_-_48_Month.jpg',
            colour: 'Yellow',
            price_per_kilo: 36.11
        };
        const postRes = await request(server).post('/cheeses').send(newCheese);
        const cheeseId = postRes.body.id;

        const res = await request(server).get(`/cheeses/${cheeseId}`);
        assert.strictEqual(res.statusCode, 200);
        assert.strictEqual(res.body.id, cheeseId);
    });

    // Test for updating a cheese by id
    it('should update a cheese by id', async () => {
        const newCheese = {
            name: 'Brie',
            picture: 'https://www.cheese.com/media/img/cheese-suggestion/Briefermier.jpg',
            colour: 'Cream',
            price_per_kilo: 36.00
        };
        const postRes = await request(server).post('/cheeses').send(newCheese);
        const cheeseId = postRes.body.id;

        const updatedCheese = {
            name: 'Brie',
            picture: 'https://www.cheese.com/media/img/cheese-suggestion/Briefermier.jpg',
            colour: 'White',  // Fixed typo here
            price_per_kilo: 37.50
        };
        const res = await request(server).put(`/cheeses/${cheeseId}`).send(updatedCheese);
        assert.strictEqual(res.statusCode, 200);
        assert.strictEqual(res.body.name, updatedCheese.name);
    });

    // Test for deleting a cheese by id
    it('should delete a cheese by id', async () => {
        const newCheese = {
            name: 'Camembert',
            picture: 'https://www.cheese.com/media/img/cheese-suggestion/CamembertStLoup_800x.jpg',
            colour: 'Pale Yellow',
            price_per_kilo: 27.50
        };
        const postRes = await request(server).post('/cheeses').send(newCheese);
        const cheeseId = postRes.body.id;

        const res = await request(server).delete(`/cheeses/${cheeseId}`);
        assert.strictEqual(res.statusCode, 204);
    });

    // Test for getting a non-existing cheeses
    it('should return 404 for non-existing cheese', async () => {
        const res = await request(server).get('/cheeses/999');
        assert.strictEqual(res.statusCode, 404);
        assert.strictEqual(res.body.message, 'Cheese not found');
    });
});
