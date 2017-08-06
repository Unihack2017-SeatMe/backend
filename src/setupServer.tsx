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
  app.use(function (req, res, next) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept-Type');
      res.header('Access-Control-Allow-Credentials', 'true');
      next();
  });
  app.use(bodyParser.urlencoded({ extended: false }));
  app.get('/', (req, res) => {
    res.json({ hello: 'world' });
  });

  app.post('/devices', (req, res) => {
    req.body.id = parseInt(req.body.id);
    req.body.capacity = parseInt(req.body.capacity);
    req.body.count = parseInt(req.body.count);
    console.log(req.body);
    //console.info(req.body);
    res.json(req.body);
    mapState.addRoomData(parseInt(req.body.id), new RoomData(req.body));
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


}

export { setupServer };
