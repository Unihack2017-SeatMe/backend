import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';

const port = process.env.PORT || 8080;

const app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.json({ hello: 'world' });
});

app.post('/room', (req, res) => {
	res.status(204);
  res.send();
});

app.listen(port, () => {
	console.log("Server running on port " + port);
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
