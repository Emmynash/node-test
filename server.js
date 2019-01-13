const expres = require('express');
const app = expres();
const port = process.env.PORT || 8080;
const hbs = require('hbs');
const fs = require('fs');

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})

app.set("view engine", "hbs");
// app.use(expres.static(__dirname + '/public'));

app.use((req, res, next) => {
    const log = `Time visit: ${new Date().toString()} + /n, Http method: ${req.method} +/n, url: ${req.url}`
    console.log(log);
    fs.appendFile('sever.log', log + '/n');
    next();
});

// app.use((req, res, next) => {
//     res.render('update.hbs');
// })

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: "Home Page"
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: "About Page"
    });
});

app.get('/bad', (req, res) => {
    res.send({
        error: "Page not found",
        code: 404
    });
});

app.listen(port, (error, res) => {
    if (error) {
        console.log(`Sever unable to start ${error}`);
    } else {
        console.log(`Sever running on port: ${port}`);
    }
});