import {
  beforeEach,
  describe,
  it,
} from "https://deno.land/std@0.151.0/testing/bdd.ts";
import { assertEquals } from "jsr:@std/assert";
import { EpisodeService } from "../episode-service.ts";
import { testDataStore } from "./testDataStore.ts";

describe("EpisodeService", () => {
  let episodeService: EpisodeService;

  beforeEach(() => {
    episodeService = new EpisodeService(testDataStore);
  });

  it("should return all episodes", () => {
    const episodes = episodeService.getAll();
    assertEquals(episodes, testDataStore.episodes);
  });

  it("should return a episode by ID", () => {
    const episodeId = testDataStore.episodes[0].id;
    const episode = episodeService.getById(episodeId);
    assertEquals(episode, testDataStore.episodes[0]);
  });

  it("should return undefined if episode ID does not exist", () => {
    const episode = episodeService.getById("nonexistent-id");
    assertEquals(episode, undefined);
  });

  it("should return episodes by patient ID", () => {
    const patientId = "1";
    const episodes = episodeService.getByPatientId(patientId);
    const expectedEpisodes = [testDataStore.episodes[0]];
    assertEquals(episodes, expectedEpisodes);
  });

  it("should return an empty array if no episodes match the patient ID", () => {
    const episodes = episodeService.getByPatientId("nonexistent-patient-id");
    assertEquals(episodes, []);
  });
});
