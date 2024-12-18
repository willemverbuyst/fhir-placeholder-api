import { Request, Response } from "npm:express";
import { db } from "../main.ts";

export function getAllPatients(_: Request, res: Response) {
  try {
    const patients = db.data.patients;

    res.send({ status: "success", lengtt: patients.length, data: patients });
  } catch (error) {
    console.error("Error fetching patients", error);
    res.status(500).send({ status: "error", message: "internal server error" });
  }
}

export function getPatient(req: Request, res: Response) {
  try {
    const patient = db.data.patients.find((p) => p.id === req.params.id);

    if (!patient) {
      res
        .status(404)
        .send({ status: "fail", data: null, message: "patient not found" });
    } else {
      res.send({ status: "success", data: patient });
    }
  } catch (error) {
    console.error("Error fetching patient", error);
    res.status(500).send({ status: "error", message: "internal server error" });
  }
}

export function getEpisodesForPatient(req: Request, res: Response) {
  try {
    const episodes = db.data.episodes.filter(
      (e) => e.patient.reference?.split("/")[1] === req.params.id
    );

    res.send({ status: "success", lengtt: episodes.length, data: episodes });
  } catch (error) {
    console.error("Error fetching patient", error);
    res.status(500).send({ status: "error", message: "internal server error" });
  }
}
