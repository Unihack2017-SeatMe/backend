import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import SocketIo from 'socket.io';
import http from 'http';
import { autorun } from 'mobx'; 
function createJsonFromMapState() {
  return mapState.allRoomData.values().map(
    roomData => {
      return roomData;
    }
  )
}
function setupServer(mapState, port) {

  const app = express();

  const server = http.Server(app);

  const io = SocketIo(server);

  server.listen(port, undefined, undefined, () => {
    console.log("Server running on port " + port);
  });
  // uncomment after placing your favicon in /public
  //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.get('/', (req, res) => {
    res.json({ hello: 'world' });
  });

  app.post('/devices', (req, res) => {
    mapState.addRoomData(req.body);
    console.info(req.body);
    res.status(204);
  });

  autorun(()=>{
    io.emit(
     allRoomDataKey,
     createJsonFromMapState()
    );
  });

  io.on('connection', (socket) => {
    console.info("Client connected");
    socket.emit(
      allRoomDataKey,
      createJsonFromMapState()
    );
  })


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

}

export { setupServer };