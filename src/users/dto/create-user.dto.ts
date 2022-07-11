import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'Email' })
  readonly email: string;
  @ApiProperty({ description: 'Password' })
  readonly password: string;
  @ApiProperty({ description: 'FUll name' })
  readonly fullname: string;
}
