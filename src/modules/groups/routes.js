import { Router } from 'express';
import * as GroupController from './controller';
import { requireJwtAuth } from '../../utils/requireJwtAuth';

const routes = new Router();

routes.post('/groups/new', GroupController.createGroup);
routes.post('/groups/:groupId/evs/new', GroupController.createGroupEv);
routes.get('/groups/:groupId/evs', requireJwtAuth, GroupController.getGroupEvs);
routes.get('/groups', requireJwtAuth, GroupController.getAllGroups);

export default routes;
