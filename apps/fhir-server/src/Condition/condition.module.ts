import { Module } from "@nestjs/common";
import { ConditionController } from "./condition.controller";
import { ConditionService } from "./condition.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Condition } from "./condition.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Condition])],
  controllers: [ConditionController],
  providers: [ConditionService],
})
export class ConditionModule {}
