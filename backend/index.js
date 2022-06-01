const connectToMongo = require('./db');
const express = require('express')
const cors = require('cors');

connectToMongo();

const app = express();
const port = 5000; // we used port: 5000 here because 3000 will be used for react server

app.use(express.json()) //middleware to handle the request - we can use req.body by using middleware here
app.use(cors()); // To enable fetching/calling api form local client to local server

// available routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));


app.listen(port, () => {
  console.log(`CloudNotebook backend listening at http://localhost:${port}`)
})