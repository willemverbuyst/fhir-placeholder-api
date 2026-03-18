import { Module } from "@nestjs/common";
import { DataStoreModule } from "../db/dataStore.module";
import { CommunicationController } from "./communication.controller";
import { CommunicationService } from "./communication.service";

@Module({
  imports: [DataStoreModule],
  controllers: [CommunicationController],
  providers: [CommunicationService],
})
export class CommunicationModule {}
