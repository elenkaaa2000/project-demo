import { Router } from "express";

import authController from "../controllers/authController.js";
import dataController from '../controllers/dataController.js'

const routes = Router()

routes.use(authController);
routes.use('/data', dataController);
    

export default routes