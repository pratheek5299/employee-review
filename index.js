const express = require('express');
const port = 8000;
const app = express();
const expressLayouts =  require('express-ejs-layouts');
const sassMiddleware = require('node-sass-middleware');

app.use(sassMiddleware({
    src: './assests/scss',
    dest: './assests/css',
    debug: true,
    outputStyle: 'expanded',
    prefix: '/css'
}));
app.use(express.static('./assests'));
app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
// for getting data from parameters
app.use(express.urlencoded());
//set up a view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/', require('./routes'));
app.listen(port, function(err){
    if(err){
        console.log(`Error while running the server ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
})