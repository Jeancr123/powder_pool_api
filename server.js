require('dotenv').config();
const express = require('express')
const cors = require('cors');
const authenticateUser = require('./utils/auth_check')
const signUp = require('./controllers/sign_up')
const login = require('./controllers/login')
const getResorts = require('./controllers/get_resorts')
const getCarpools = require('./controllers/get_carpools')
const getCarpoolsByResortId = require('./controllers/get_carpools_by_resort_id')
const newCarpool = require('./controllers/save_carpool')
// const joinCarpool = require('./controllers/join_carpool')
const getConversationByCarpoolId = require('./controllers/get_carpool_conversation')
const conversationMessage = require('./controllers/new_conversation_message')
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
app.get('/resorts', getResorts);
app.post('/new_carpool', authenticateUser, newCarpool);
// app.get('/join_carpool', authenticateUser, joinCarpool);
app.get('/get_carpools_by_resort/:resortId', authenticateUser, getCarpoolsByResortId);
app.get('/get_conversation_by_carpool/:carpoolId', authenticateUser, getConversationByCarpoolId);
// app.get('/get_carpool/:carpoolId', authenticateUser, getCarpool);
app.post('/new_conversation_message', authenticateUser, conversationMessage)
app.get('/healthz', (req, res) => {
    res.status(200).json({ message: 'OK' });
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
});

