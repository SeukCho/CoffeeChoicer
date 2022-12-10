var fs = require('fs');
var path = require('path');
var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var ejs = require('ejs');
const exp = require('constants');



var connection = mysql.createConnection({
    host : 'localhost',
    user : 'web2022',
    password : 'web2022',
    database : 'web'
});

var app = express();
app.use(session({
    secret : 'iwanttogohomerightnow',
    resave : true,
    saveUninitialized : true
}));

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', function(request,response, next) {
    response.sendFile(path.join(__dirname + '/my/main.html'));
})

app.get('/login', function(request, response) {
    if(request.session.loggedin == true) {
        response.render('alert', {error: 'You are already logged in as ' + request.session.username});
    }
    else {
        response.sendFile(path.join(__dirname + '/my/login.html'));
    }
});

app.post('/login', function(request, response) {
    var username = request.body.username;
    var password = request.body.password;
    if (username && password) {
        connection.query('select * from user where username = ? and password = ?', [username, password], function(error, results, fields) {
            if(error) throw error;
            if (results.length > 0) {
                request.session.loggedin = true;
                request.session.username = username;
                response.redirect('/');
                response.end();
            }
            else {
                response.render('alert', {error: 'Incorrect Username or Password!'});
                response.end();
            }
        });
    }
    else {
        response.render('alert', {error: 'Please enter Username and Password!'});
        // response.send('Please enter Username and Password!');
        response.end();
    }

});

app.get('/register', function(request, response) {
    if(request.session.loggedin == true) {
        response.render('alert', {error: 'You are already logged in as ' + request.session.username});
    }
    else {
        response.sendFile(path.join(__dirname + '/my/register.html'));
    }
});

app.post('/register', function(request, response) {
    var username = request.body.username;
    var password = request.body.password;
    var password2 = request.body.password2;
    if(password != password2) {
        response.render('alert', {error: 'Passwords does not match!'});
        // response.send('Passwords does not match!');
        response.end();
    }
    else if(username && password) {
        console.log(username, password);
        connection.query('select * from user where username = ? and password = ?', [username, password], function(error, results, fields) {
            if(error) throw error;
            if(results.length <= 0) {
                connection.query('INSERT INTO user (username, password) VALUES(?,?)', [username, password], function(error, data) {
                    if(error) {
                        console.log(error);
                    }
                    else {
                        console.log(data);
                    }
                });
                response.render('alert2', {message: 'Registered Successfully!'});
                // response.send(username + 'Registered Successfully! <br> <a href = "/">Return</a>');
            }
            else {
                // response.send(username + 'Already exists! <br><a href = "/">Return</a>');
                response.render('alert', {error: username + 'Already exists!'});
            }
        response.end();
        });
    }
    else {
        console.log(username, password);
        response.render('alert', {error: 'Please enter User Information!'});
        response.end();
    }
});

app.get('/logout', function(request, response) {
    if(request.session.loggedin != true) {
        response.render('alert', {error: 'You are not logged in!'});
    }
    else {
        request.session.loggedin = false;
        response.render('alert2', {message: 'Successfully Logged out.'});
        response.end();
    }
});

app.listen(3000, function() {
    console.log('Server Running at localhost:3000');
});