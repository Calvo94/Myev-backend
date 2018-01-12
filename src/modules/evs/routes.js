import { Router } from 'express';

import * as EvController from './controller';
import { requireJwtAuth } from '../../utils/requireJwtAuth';

const routes = new Router();

routes.post('/ev', EvController.createEv);
routes.get('/evs', EvController.getAllEvs);
routes.get('/evs/unverified', EvController.getUnverifiedEvs);
routes.get('/evs/verified', EvController.getVerifiedEvs);
routes.post('/ev/:evId', EvController.updateEv);
routes.post('/ev/:evId/img', EvController.imgEv);
routes.post('/ev/:evId/note', EvController.noteEv);
routes.post('/ev/:evId/verif', EvController.make_Ev_verified);
routes.delete('/ev/:evId/delete', EvController.deleteEv);





export default routes;
