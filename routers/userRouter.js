import express from 'express';
import { signIn, signUp, deleteUser, updateUser, getSingleUser, getAllUsers, getMentorOrMenteeUsers } from '../controllers/userController.js';

const router = express.Router()

router.post('/signin', signIn);
router.post('/signup', signUp);
router.delete('/deleteUser/:userId', deleteUser);
router.put('/updateUser/:userId', updateUser);

router.get("/",getAllUsers);
router.get("/:userId",getSingleUser);

router.get("/userRole/:roleId",getMentorOrMenteeUsers);

export default router