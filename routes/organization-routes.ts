import { Router } from "https://deno.land/x/oak@v17.1.3/mod.ts";
import {
  getOrganization,
  getOrganizations,
} from "../controllers/organization-controller.ts";

const router = new Router();

router.get("/", getOrganizations).get("/:id", getOrganization);

export default router;
