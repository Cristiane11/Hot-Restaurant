//Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

//Sets up the Express App
var app = express();
var PORT = process.env.PORT || 3000;

//Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//New reservations
var reservations = [
    {
        routeName: "Nicole",
        name: "Nicole",
        phoneNumber: 2033769156,
        email: "123@yahoo.com",
        uniqueID: 5
    },
    {
        routeName: "Jocelyn",
        name: "Jocelyn",
        phoneNumber: 9735555555,
        email: "jocelyn@gmail.com",
        uniqueID: 4
    }
];


//Routes to home page **UPDATED**
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
});

//Route to add reservation
app.get("/reservation", function (req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
});

//Route to all reservation
app.get("/reservation", function (req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
});

//Displays all reservations
app.get("/api/reservations", function (req, res) {
    return res.json(reservations);
});

// //Displays a single reservation based on name or returns false
// app.get("/api/reservations/:reservation", function (req, res) {
//     var chosen = req.params.reservation;

//     console.log(chosen);

//     for (var i = 0; i < reservations.length; i++) {
//         if (chosen === reservations[i].routeName) {
//             return res.json(reservations[i]);
//         }
//     }
//     return res.json(false);
// });

app.post("/api/reservations", function(req, res){
    //req.body hosts is equal to the JSON post sent from the user
    //This works because of our body parser middleware
    var newreservation = req.body;

    newreservation.routeName = newreservation.name.replace(/\s+/g, "").toLowerCase();

    console.log(newreservation);

    reservations.push(newreservation);

    res.json(newreservation);

});

//Starts the server to begin listening
app.listen(PORT, function () {
    console.log("App is listening on PORT " + PORT);
});