import { Router } from 'express';

import * as UserController from './controller';

const routes = new Router();

routes.post('/users/auth0', UserController.loginWithAuth0);
routes.post('/user/participate',UserController.ParticipateOnEvent);
routes.post('/user/unparticipate',UserController.UnparticipateOnEvent);
routes.get('/user/:userId/myevs',UserController.GetMyEvents);
routes.post('/user/:userId/ev',UserController.createEv);
routes.post('/user/suser',UserController.makeSuperUser);
export default routes;
