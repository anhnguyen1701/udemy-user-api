import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
  @ApiProperty({ description: 'email' })
  readonly email: string;
  @ApiProperty({ description: 'password' })
  readonly password: string;
  @ApiProperty({ description: 'fullname' })
  readonly fullname: string;
}
