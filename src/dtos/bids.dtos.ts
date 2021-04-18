import { IsNumber } from 'class-validator';

// Data transfer object for validation
export default class CreateBidDto {
  @IsNumber()
  public amount: number;
}
