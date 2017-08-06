import * as express from 'express';
import * as path from 'path';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as SocketIo from 'socket.io';
import * as http from 'http';
import { autorun } from 'mobx'; 
import { allRoomDataKey } from './shared/socket-keys';
import { RoomData } from './shared/model/RoomData';
function createJsonFromMapState(mapState) {
  const json = mapState.allRoomData.entries().map(
    ([key, roomData]) => {
      return {
        id: parseInt(key),
        capacity: roomData.capacity,
        count: roomData.count
      };
    }
  )
  return json;
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
  // app.use(logger('dev'));
  app.use(bodyParser.json());
  // app.use(bodyParser.urlencoded({ extended: false }));
  app.get('/', (req, res) => {
    res.json({ hello: 'world' });
  });

  app.post('/devices', (req, res) => {
    mapState.addRoomData(req.body.id, new RoomData(req.body));
    console.log(req.body);
    //console.info(req.body);
    res.status(200);
    res.json({});
  });

  autorun(()=>{
    io.emit(
     allRoomDataKey,
     createJsonFromMapState(mapState)
    );
  });

  io.on('connection', (socket) => {
    console.info("Client connected");
    socket.emit(
      allRoomDataKey,
      createJsonFromMapState(mapState)
    );
  })


  // catch 404 and forward to error handler
  /*app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });*/

  // error handler
  app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
  });

}

export { setupServer };