import express from 'express';
import { arcjetMiddleware as arcjetProtection } from '../middleware/arcjet.middleware.js';
import { protectRoute } from '../middleware/auth.middleware.js';
import { getAllContacts, getMessagesByUserId, sendMessage } from '../controllers/message.controller.js';
const router = express.Router();
//the middlewares execute in order  -so requests get rate limited first,then authenticated.
//this is actully more efficient since unauthwnticated requests get blocked by rate limiting before hitting the  auth middleware.


router.use(arcjetProtection,protectRoute);
router.get("/contacts",getAllContacts);
router.get("/:id",getMessagesByUserId);
router.post("/send/:id",sendMessage);

export default router;