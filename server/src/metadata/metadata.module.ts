import { Module } from '@nestjs/common';
import { MetadataController } from './metadata.controller';

@Module({
  controllers: [MetadataController],
  providers: [],
})
export class MetadataModule {}
