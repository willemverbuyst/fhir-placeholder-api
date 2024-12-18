import { Router } from "npm:express";
import {
  getCondition,
  getConditions,
} from "../controllers/conditionController.ts";

const router = Router();

router.get("/", getConditions).get("/:id", getCondition);

export default router;
