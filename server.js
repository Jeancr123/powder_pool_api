require('dotenv').config();
const express = require('express')
const cors = require('cors');
const authenticateUser = require('./utils/auth_check')
const signUp = require('./controllers/signup')
const login = require('./controllers/login')
const getCarpools = require('./controllers/get_plans')
const newCarpool = require('./controllers/new_carpool')
const joinCarpool = require('./controllers/join_carpool')
const getCarpool = require('./controllers/get_carpool')
const carpoolMessage = require('./controllers/carpool_message')
const seedAndSync = require('./controllers/seed_and_sync')


const port = process.env.PORT || 8000;

const app = express()

app.use(cors());
app.use(express.json())


app.get('/', (req, res) => {
    res.json({'message': 'OK'})
});


app.get('/seed_and_sync', seedAndSync)
app.post('/signup', signUp)
app.post('/login', login)
app.get('/carpools', getCarpools);
app.post('/new_carpool', authenticateUser, newCarpool);
app.get('/join_carpool', authenticateUser, joinCarpool);
app.get('/get_carpool/:carpoolId', authenticateUser, getCarpool);
app.post('/carpool_message', authenticateUser, carpoolMessage)


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
});

app.post('/healthz', (req, res) => {
    res.status(200).json({ message: 'OK' });
})