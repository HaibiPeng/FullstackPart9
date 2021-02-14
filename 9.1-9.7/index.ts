import express = require('express');
const app = express();

import { calculateBmi } from './calcbmi';
import { calculateExercises } from './calcexercise';

const bodyParser = require('body-parser')
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({ 
  extended: true
})); 

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    if (!height || !weight) {
        res.send({ error: "malformatted parameters" });
    } else {
        res.send(calculateBmi(height, weight));
    }
    
});

app.post('/exercises', (req, res, error) => {
    const data = req.body;
    const daily_exercises = Array.isArray(data.daily_exercises) === true ? data.daily_exercises : null;
    const target = typeof(data.target) === 'number' ? data.target : null;
    if (!daily_exercises || !target || error) {
        res.send({ error: "malformatted parameters" });
    } else {
        res.send(calculateExercises(daily_exercises, target));
    }
    
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});