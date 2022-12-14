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
        response.render('alert', {error: '이미 ' + request.session.username + ' 로 로그인되어 있습니다.'});
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
                response.render('alert', {error: '이름이나 패스워드가 올바르지 않습니다.'});
                response.end();
            }
        });
    }
    else {
        response.render('alert', {error: '이름과 비밀번호를 입력해 주세요.'});
        response.end();
    }

});

app.get('/register', function(request, response) {
    if(request.session.loggedin == true) {
        response.render('alert', {error: '현재 ' + request.session.username + ' 로 로그인되어 있습니다.'});
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
        response.render('alert', {error: '두 비밀번호가 일치하지 않습니다.'});
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
                response.render('alert2', {message: '성공적으로 등록되었습니다.'});
            }
            else {
                response.render('alert', {error: username + '은 이미 가입된 이름입니다.'});
            }
        response.end();
        });
    }
    else {
        console.log(username, password);
        response.render('alert', {error: '정보를 모두 기입해주세요.'});
        response.end();
    }
});

app.get('/logout', function(request, response) {
    if(request.session.loggedin != true) {
        response.render('alert', {error: '로그인되지 않았습니다.'});
    }
    else {
        request.session.loggedin = false;
        request.session.username = '';
        response.render('alert2', {message: '로그아웃 되었습니다.'});
        response.end();
    }
});

app.get('/choicer', function(request, response) {
    response.sendFile(path.join(__dirname + '/public/choicer.html')); 
});

app.get('/getchoice', function(request, response) {
    var username;
    if(request.session.loggedin != true) {
        username = '';
    }
    else {
        username = request.session.username;
    }
    connection.query('select * from coffees where username = ?', [username], function(error, results, fields) {
        if(error) throw error;
        response.send(results);
    })
})

app.post('/mychoicer', function(request, response) {
    if(request.session.loggedin == true) {
        var username = request.session.username;
    }
    else {
        var username = 'anonymous';
    }
    var charname = request.body.data;
    console.log('charname : ', charname);
    connection.query('INSERT INTO coffees (username, coffee) VALUES(?,?)', [username, charname], function(error, data) {
        if(error) {
            console.log(error);
        }
        else {
            console.log(data);
        }
    });
});

app.get('/list', function (request, response) { 
    fs.readFile(__dirname + '/my/list.html', 'utf-8', function (error, data) {
        var username;
        if(request.session.loggedin == true) {
            username = request.session.username;
        }
        else {
            username = 'anonymous';
        }
        connection.query('select * from coffees where username = ?', [username], function (error, results) {
            response.send(ejs.render(data, {
                data: results
            }));
        });
    });
});

app.listen(3000, function() {
    console.log('Server Running at localhost:3000');
});