const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors({ origin: "http://89.107.108.231:36180"}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const ip = "localhost"
const port = 18787
i = 0;

//databse connection
var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "aimtrainer"
})
if(con){
    console.log('Connection Success');
} else {
    console.log('Cant connect to db, Check ur db connection');
}

//sparber des honi lei auskommentiert weil sünst wenn man die datenbank net hot direkt dor server obstürzt un man net probieren konn... wosche woll
/*
con.query("SELECT COUNT(*) AS usernameCount FROM benutzer", function (err, rows, fields){
    if(err) throw err;
    i = rows[0].usernameCount        
});
*/

app.get('/', (req, res) =>{
    console.log("jemand hot gegettet!!!")
    res.send("Seppele")
})

app.get("/profile/classic/:username", (req, res) =>{
    let username = req.params['username']
    console.log(username + " will stats hoben")

    con.query("SELECT * FROM classic WHERE `username` = '"+username+"'", function (err, result, fields) {
        if (err) throw err;
        if (result.length == 0) {
            console.log("hot ahnsceinend nocht drinnen  ")
            return res.status(300).send(username + " hot gorkoane classic stats omegalel")
        } else {
            console.log("gib normale classic results")
            res.setHeader('Content-Type', 'application/json');
            return res.status(200).send(result)
        }
    });

    //res.send("hallo " + username + " du bisch zu schlecht für stats!!!")

})

app.get("/profile/flick/:username", (req, res) =>{
    let username = req.params['username']
    console.log(username + " will stats hoben")

    con.query("SELECT * FROM flick WHERE `username` = '"+username+"'", function (err, result, fields) {
        if (err) throw err;
        if (result.length == 0) {
            console.log("hot ahnsceinend nocht drinnen  ")
            return res.status(300).send(username + " hot gorkoane flick stats omegalel")
        } else {
            console.log("gib normale flick results")
            return res.send(result)
        }
    });

    //res.send("hallo " + username + " du bisch zu schlecht für stats!!!")

})

app.post("/register", (req, res) => {

    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;

    console.log("user " + username + " probiert zu registrieren")

    if (!username || !password || !email) return res.sendStatus(400);

    checkUser(username, email, (username) => {
        if (username == -1) {
            return res.status(405).send("kloppit net, username schun besetzt");
        } else if (username == -2) {
            return res.status(406).send("kloppit net, email schun besetzt");       //irgendwie wenn man zuerst username schon in der DB vorhanden ist und man das dann ausbessert und die Email auch schon vorhandnen ist kommt so: cannot set headers after they are sent to client....
        } else {
            let sql = "INSERT INTO benutzer (`email`, `username`, `passwort`) VALUES ('" + email + "', '" + username + "', '" + password + "')";
            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log("user hat registriert glabiholt")
                return res.status(200).send('kloppit')
                //return res.redirect(302, "http://localhost:36187/");
            });
        }
    });


    
});
  
const checkUser = (username, email, createUser) => {
    con.query("SELECT `username` FROM benutzer WHERE `username` = ?", [username], function (err, result, fields) {
        if (err) throw err;
        if (result?.length > 0){
            return createUser(-1);
        } 
    });
    con.query("SELECT * FROM benutzer WHERE `email` = ?", [email], function (err, result, fields) {
        if(err) throw err;
        if (result.length > 0) {
            return createUser(-2)
        }
        return createUser(username)
    })
};

app.post("/login", (req, res) => {

    let username = req.body.username
    let password = req.body.password

    console.log(username + " will inloggen!")
    con.query("SELECT `username`, `passwort` FROM benutzer WHERE `username` = ?", [username] , function (err, result, fields) {
        if(err) throw err;
        if (result.length > 1) {
            return res.status(400).send('do isch gorawian epes folsch gongen...')
        } else if (result.length <= 0) {
            return res.status(405).send('username gibs net')
        } else {
            if (result[0].passwort == password) {
                console.log("login check")
                return res.status(200).send('kloppit a')
            } else {
                return res.status(406).send("folsches password")
            }
        }
    })
    
})

app.post("/classic", (req, res) => {
    //console.log("hallo, bin im post iatz von classic")
    let score = req.body.score
    let klicks = req.body.clicks 
    let anschlaegeProSekunde = klicks /30
    let accuracy = score/klicks * 100
    let username = req.body.username
    let spielid = 1
 
    if (username !== "guest") {
        let sql = "INSERT INTO classic (`anschlaege`, `score`, `anschlaegeProSekunde`, `trefferquote`, `spielid`, `zeit`, `username`) VALUES ('"+klicks+"', '"+score+"', '"+anschlaegeProSekunde+"', '"+accuracy+"', '"+spielid+"', '00:00:30', '"+username+"' )";
        con.query(sql, function (err, result){
            if (err) throw err;
            console.log("1 record inserted into classic")
        })
    }
 
    res.send("honn classic score eingetrogen")
 })

 app.post("/flick", (req, res) => {
    //console.log("hallo, bin im post iatz von flick")
    let score = req.body.score
    let klicks = req.body.clicks
    let anschlaegeProSekunde = klicks /30
    let accuracy = score/klicks * 100
    let username = req.body.username
    let spielid = 2
 
    if (username !== "guest") {
        let sql = "INSERT INTO flick (`anschlaege`, `score`, `anschlaegeProSekunde`, `trefferquote`, `spielid`, `zeit`, `username`) VALUES ('"+klicks+"', '"+score+"', '"+anschlaegeProSekunde+"', '"+accuracy+"', '"+spielid+"', '00:00:30', '"+username+"' )";
        con.query(sql, function (err, result){
            if (err) throw err;
            console.log("1 record inserted into flick")
        })
    }
 
 })


app.listen(port, () => {
    console.log("Server running on: http://" + ip + ":" + port)
})