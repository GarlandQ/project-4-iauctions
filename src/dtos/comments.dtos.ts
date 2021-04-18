import { IsString } from 'class-validator';

// Data transfer object for validation
export default class CreateCommentDto {
  @IsString()
  public description: string;
}
