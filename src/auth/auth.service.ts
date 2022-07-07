import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { SendgridService } from 'src/sendgrid/sendgrid.service';
import { UsersService } from 'src/users/users.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { VerifyUserDto } from './dto/verify-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly sendGridService: SendgridService,
    @Inject(Redis) private redisClient: Redis,
  ) {}
  async register(registerUserDto: RegisterUserDto) {
    try {
      //hash password
      const salt = 10;
      const hashPassword = await bcrypt.hash(registerUserDto.password, salt);

      // create new user in database
      const user = await this.userService.create({
        ...registerUserDto,
        password: hashPassword,
      });

      //generate otp code
      const otpCode = Math.floor(100000 + Math.random() * 900000);

      //save otp to redis
      await this.redisClient.set(registerUserDto.email, otpCode);
      await this.redisClient.expire(registerUserDto.email, 300);

      //send otp mail to user email
      await this.sendGridService.sendMailSes(registerUserDto.email, otpCode);

      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async verifyOtp(verifyUserDto: VerifyUserDto) {
    const otpRedis = await this.redisClient.get(verifyUserDto.email);
    if (otpRedis != null) {
      if (otpRedis == verifyUserDto.otp + '') {
        return this.userService.activeUser(verifyUserDto.email);
      } else {
        return {
          status: 400,
          message: 'otp code is not match',
        };
      }
    } else {
      return {
        status: 400,
        message: 'your otp code has expried',
      };
    }
  }
}
