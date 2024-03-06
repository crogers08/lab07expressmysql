const express = require("express");
const app = express();
const connection = require("./connection.js");

app.set('view engine','ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true })); //needed for POST requests

app.get("/", (req, res)=>{
    res.render("index",{title:"My TV shows"});
})

app.get("/select", (req, res)=>{
    const readsql = `SELECT * FROM my_shows`;
    connection.query(readsql,(err,rows)=>{
        if(err) throw err;
        res.render('shows', {title:'List of shows', rowdata: rows});
        // let stringdata = JSON.stringify(rows);
        // res.send(`<h2>My TV</h2><code>${stringdata}</code>`)
    });
    
});

app.get("/row",(req, res)=>{
    const showid = req.query.tvid;
    const readsql = `SELECT * FROM my_shows where id = ? ;`;
    connection.query(readsql,[showid],(err,rows)=>{
        if(err) throw err;
        const showData = {
            name : rows[0]['showname'],
            imgp : rows[0]['imgpath'],
            details : rows[0]['descript'],
        };

        res.render("series", {show: showData});

        // res.send(`<h2>My TV</h2><code>${rows[0].showname}</code><img src='${rows[0].imgpath}'>`);
    });
});

app.get('/admin/add', (req, res) => {
    res.render("addtv");
});

app.post('/admin/add', (req, res) => {
    const title = req.body.showField;
    const imgp = req.body.imgField;
    const descr = req.body.desField;

    const createsql = `INSERT INTO my_shows (showname, imgpath, descript) 
                        VALUES( ? , ? , ?);` ;
                        
    connection.query(createsql,[title, imgp, descr],(err, rows) => {
        if(err) throw err;
        res.send(`You have added::: <p>${title}</p> <p>${imgp}</p> <p>${descr}</p>`);
    });
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running at port 3000");
});