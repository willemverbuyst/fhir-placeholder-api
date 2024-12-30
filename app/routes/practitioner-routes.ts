import { Router } from "https://deno.land/x/oak@v17.1.3/mod.ts";
import {
  getPractitioner,
  getPractitioners,
} from "../controllers/practitioner-controllers.ts";

const router = new Router();

router.get("/", getPractitioners).get("/:id", getPractitioner);

export default router;
