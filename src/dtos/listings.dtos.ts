import { IsString, IsNumber, IsOptional } from 'class-validator';

// Data transfer object for validation
export default class CreateListingDto {
  @IsString()
  public title: string;

  @IsNumber()
  public price: number;

  @IsOptional()
  @IsString()
  public description: string;
}
