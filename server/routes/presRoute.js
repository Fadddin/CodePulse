import express from "express";
import { 
    getPres
} from "../controllers/presController.js";
import { isAuthenticatedUser, authorizeRoles } from "../middleware/auth.js";

const router = express.Router();

router.route("/pres").post(isAuthenticatedUser, getPres);

export default router;