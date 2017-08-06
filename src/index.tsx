import { setupServer } from './setupServer';
import { mapState } from './shared/state/appState';
let envPort = process.env.PORT || 8080;
setupServer(mapState, envPort);
