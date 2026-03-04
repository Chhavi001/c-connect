import express from 'express';
const router = express.Router();
//the middlewares execute in order  -so requests get rate limited first,then authenticated.
//this is actully more efficient since unauthwnticated requests get blocked by rate limiting before hitting the  auth middleware.


router.use(arcjetProtection,protectRoute);
router.get("/contacts",getAllContacts);
router.get("/chats",getChatPartners);
router.get("/:id",getMessageByUserId);
router.get("/send/:id",sendMessage);

export default router;