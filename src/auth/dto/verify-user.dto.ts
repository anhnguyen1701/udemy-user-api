import { ApiProperty } from '@nestjs/swagger';

export class VerifyUserDto {
  @ApiProperty({ description: 'email' })
  readonly email: string;

  @ApiProperty({ description: 'otp' })
  readonly otp: number;
}
