import { Body, Controller, Get, HttpStatus, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/users/schema/user.schema';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.tdo';
import { RegisterUserDto } from './dto/register-user.dto';
import { VerifyUserDto } from './dto/verify-user.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @ApiOperation({
    summary: 'create a new non-active user in db => send verification code',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: User,
    description: 'return user',
  })
  async register(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }

  @Put('/verify')
  @ApiOperation({ summary: 'verify a new user after they register' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'active a user',
  })
  async verify(@Body() verifyUserDto: VerifyUserDto) {
    return this.authService.verifyOtp(verifyUserDto);
  }

  @Post('/login')
  @ApiOperation({ summary: 'login' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'user information && jwt token',
  })
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }
}
