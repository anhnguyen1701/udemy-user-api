import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'Email' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ description: 'Password' })
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty({ description: 'FUll name' })
  @IsNotEmpty()
  readonly fullname: string;
}
