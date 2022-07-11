import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({ description: 'email' })
  readonly email: string;
  @ApiProperty({ description: 'password' })
  readonly password: string;
}
