import { Request, Response } from "npm:express";
import { db } from "../main.ts";

export function getConditions(_: Request, res: Response) {
  try {
    const conditions = db.data.conditions;

    res.send({
      status: "success",
      lengtt: conditions.length,
      data: conditions,
    });
  } catch (error) {
    console.error("Error fetching conditions", error);
    res.status(500).send({ status: "error", message: "internal server error" });
  }
}

export function getCondition(req: Request, res: Response) {
  try {
    const condition = db.data.conditions.find((c) => c.id === req.params.id);

    if (!condition) {
      res.status(404).send({
        status: "fail",
        data: null,
        message: "condition not found",
      });
    } else {
      res.send({ status: "success", data: condition });
    }
  } catch (error) {
    console.error("Error fetching condition", error);
    res.status(500).send({ status: "error", message: "internal server error" });
  }
}
