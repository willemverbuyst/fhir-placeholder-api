import { IsOptional, IsString } from 'class-validator';

export class GetConditionDto {
  @IsString()
  @IsOptional()
  patient: string;
}
