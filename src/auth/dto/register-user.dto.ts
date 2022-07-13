import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterUserDto {
  @ApiProperty({ description: 'email' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ description: 'password' })
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty({ description: 'fullname' })
  @IsNotEmpty()
  readonly fullname: string;

  @ApiProperty({ description: 'avatar' })
  readonly avatar: string;
}
