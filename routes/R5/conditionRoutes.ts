import { Router } from "https://deno.land/x/oak@v17.1.3/mod.ts";
import {
  getCondition,
  getConditions,
} from "../../controllers/conditionController.ts";

const router = new Router();

router.get("/", getConditions).get("/:id", getCondition);

export default router;
