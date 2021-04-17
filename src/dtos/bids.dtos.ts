import { IsString, IsNumber, IsOptional } from 'class-validator';

// Data transfer object for validation
export default class CreateBidDto {
  @IsNumber()
  public amount: number;
}
