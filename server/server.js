const express = require('express');
const app = express();
require('dotenv').config();

const mongoose = require('mongoose');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const routes = require('./routes');
const passport = require('passport');
const { jwtStrategy } = require('./middleware/passport')

const { handleError, convertToApiError } = require('./middleware/ApiError');

// mongodb+srv://adminpijar:<password>@pijarcampdb.w26wfzd.mongodb.net/?retryWrites=true&w=majority
const mongoUri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_HOST}?retryWrites=true&w=majority`;
mongoose.connect(mongoUri,{
    // useNewUrlParser: true,
    // useUnifiedTopology: true
})
.then(console.log('MongoDB connected'))
.catch(err => console.log(`error: ${err}`))

/// BODY PARSE
app.use(express.json());


/// SANITIZE
app.use(xss());
app.use(mongoSanitize());

/// PASSPORT
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

/// ROUTES
app.use('/api',routes)


/// HANDLE ERRORS
/// if the error not recognized.... convert to api error
app.use(convertToApiError)
app.use((err,req,res,next)=>{
    handleError(err,res)
})



const port = process.env.PORT || 3001
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
});
