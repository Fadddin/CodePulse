import express from "express";
import { 
    deleteHistory,
    getHistory,
    getParticular,
    getPres
} from "../controllers/presController.js";
import { isAuthenticatedUser } from "../middleware/auth.js";

const router = express.Router();

router.route("/pres").post(isAuthenticatedUser, getPres);
router.route("/history").get(isAuthenticatedUser, getHistory);
router.route("/history/:id")
    .get(isAuthenticatedUser, getParticular)
    .delete(isAuthenticatedUser, deleteHistory);

export default router;