require("dotenv").config();
require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan"); //morgan--dev return in cmd api source
var helmet = require("helmet"); //cashe source request
var cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var guidesRouter = require("./routes/guides");
var verificationsRouter = require("./routes/verifications");
var categoriesRouter = require("./routes/categories");
var privateCircuitsRouter = require("./routes/privateCircuits");
var proposedCircuitsRouter = require("./routes/proposedCircuits");
var publicCircuitsRouter = require("./routes/publicCircuits");

var app = express();
const { default: mongoose } = require("mongoose");

let connectDB = require("./Database/DB.js");
connectDB();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors());
app.use(helmet());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/guides", guidesRouter);
app.use("/verifications", verificationsRouter);
app.use("/categories", categoriesRouter);

app.use("/privateCircuits", privateCircuitsRouter);
app.use("/publicCircuits", publicCircuitsRouter);
app.use("/proposedCircuits", proposedCircuitsRouter);

// catch 404 and forward to error handler
/*app.use(function(req, res, next) {
    next(createError(404));
});*/

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(process.env.PORT, () => {
  console.log("server run:3001");
});
