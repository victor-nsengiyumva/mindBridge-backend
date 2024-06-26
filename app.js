var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');


var app = express();  


// configuring the .env file
require('dotenv').config();


// database tracking
const database = require("./database/index");
console.log(database.sequelise_instance);
database.sequelise_instance.sync().then(() => { console.log("synced the database") }).catch((err) => { console.log("failed to sync the database") });



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// other middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// routing
var indexRouter = require('./routes/index');
var sendMailRoute = require("./routes/send_mail");
var patientauthRoute = require("./routes/patient_auth");
var doctorauthRoute = require("./routes/doctor_auth");
var scheduleRoute = require("./routes/schedule");
var get_video_sdkRoute = require("./routes/get_vidoesdk_key_route");
var allDoctorsRoute = require("./routes/get_all_doctors");
var diagnosisRoute = require("./routes/diagnosis");
var appointmentsRoute = require("./routes/appointments");
var paymentsRoute = require("./routes/payments");
var {router} = require("./routes/upload_image");

app.use('/', indexRouter);
app.use("/sendmail", sendMailRoute);
app.use("/patientauth", patientauthRoute);
app.use("/doctorauth", doctorauthRoute);
app.use("/schedule", scheduleRoute);
app.use("/vidoesdk", get_video_sdkRoute);
app.use("/alldoctors", allDoctorsRoute);
app.use("/diagnosis", diagnosisRoute);
app.use("/appointments" , appointmentsRoute)
app.use("/payments", paymentsRoute);
app.use("/uploads", router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});


// setting up server
app.listen(process.env.PORT || 3000, () => console.log('server is started'));

module.exports = app;
