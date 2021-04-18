import { IsString } from 'class-validator';

// Data transfer object for validation
export default class CreateCategoryDto {
  @IsString()
  public name: string;
}
