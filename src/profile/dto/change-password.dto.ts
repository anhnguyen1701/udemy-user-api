import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class ChangePasswordDto {
  @ApiProperty({ description: 'new password' })
  @IsString()
  readonly newPassword: string;
}
