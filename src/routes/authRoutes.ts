import { login} from "../controllers/userControllers";
import { Router } from "express";

const router = Router();

router.post("/login",login);

export default router;