const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

let app = express();


const PORT = 3000;
const PAGE_ERROR_MESSAGE = "OOPS! Something went wrong.";
const HEADER_TITLE = "My Website";
const NEW_LINE = '\n';


hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + NEW_LINE, (err) => {
        if(err){
            console.log(now + 'unable to append to server.log');
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs', {
//         headerTitle: 'Site Maintenance',
//         pageTitle: 'SITE MAINTENANCE',
//         welcomeMessage: 'Welcome to the Website'
//     });
//     //next();
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});//console.log(__dirname);

//routes
app.get('/', (req, res) => {
    res.render('home.hbs', {
        headerTitle: HEADER_TITLE,
        pageTitle: 'home page',
        welcomeMessage: 'Welcome to the Website'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        headerTitle: HEADER_TITLE,
        pageTitle: 'about page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: PAGE_ERROR_MESSAGE
    });
});


//listen
app.listen(PORT, () => {
    console.log('Server is up on port 3000');
});
