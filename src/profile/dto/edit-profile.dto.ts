import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class EditProfileDto {
  @ApiProperty({ description: 'fullname' })
  @IsString()
  readonly fullname: string;

  @ApiProperty({ description: 'avatar' })
  @IsString()
  readonly avatar: string;
}
