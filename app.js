var Express = require("express");
var Mongoose = require("mongoose");
var bodyParser = require("body-parser");
var port = process.env.PORT || 4000;
var app = Express();

function cors(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
};

if (process.env.MONGOLAB_URI) {
  Mongoose.connect(process.env.MONGOLAB_URI);
} else {
  Mongoose.connect("localhost", "barandi-training");
}

app.use(cors);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", Express.static(__dirname + "/public"));

// Connected or Connecting
if (Mongoose.connection.readyState == 1 || Mongoose.connection.readyState == 2) {
     var modules = ["User", "Project", "Role", "Skill"];


    modules.forEach(function(module) {
        require("./models/" + module + "Model")(Mongoose);
        require("./routers/" + module + "Router")(app, Mongoose);
    });
}

app.listen(port);
console.log("Started on port", port);