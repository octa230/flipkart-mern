const express = require('express');
const mongoose = require('mongoose')
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const errorMiddleware = require('./middlewares/error');
const dotenv = require('dotenv')
const port = 8000

dotenv.config()
mongoose
.connect(process.env.MONGODB_URI)
.then(()=>{
    console.info('connected to db')
})
.catch((err) =>{
    console.log(err.message)
})

const app = express();

// config
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: '/.env' });
}

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

const user = require('./routes/userRoute');
const product = require('./routes/productRoute');
const order = require('./routes/orderRoute');
const payment = require('./routes/paymentRoute');

app.use('/api/v1', user);
app.use('/api/v1', product);
app.use('/api/v1', order);
app.use('/api/v1', payment);



// deployment
__dirname = path.resolve();
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    });
} else {
    app.get('/', (req, res) => {
        res.send('Server is Running! 🚀');
    });
}

// error middleware
app.use(errorMiddleware);
app.listen(port, ()=>{
    console.log(`server on ${port}`)
})
