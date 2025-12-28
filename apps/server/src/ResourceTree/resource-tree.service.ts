import { Injectable } from "@nestjs/common";
import { DataStoreService } from "../db/dataStore.service";

@Injectable()
export class ResourceTreeService {
  constructor(private readonly repo: DataStoreService) {}

  async generateTree(): Promise<Record<string, unknown>> {
    return this.repo.generateTree();
  }
}
