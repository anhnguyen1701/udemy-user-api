import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument, UserSchema } from './schema/user.schema';
import { Model } from 'mongoose';
import { SendgridService } from 'src/sendgrid/sendgrid.service';
import { RedisModule } from 'src/redis/redis.module';
import Redis from 'ioredis';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly sendGridService: SendgridService,

    @Inject(Redis) private redisClient: Redis,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const createdUser = await this.userModel.create(createUserDto);
    return createdUser;
  }

  async activeUser(email: string) {
    try {
      const updateUser = await this.userModel
        .findOneAndUpdate({ email: email }, { verify: true })
        .exec();

      return {
        status: 200,
        message: 'your account is actived',
      };
    } catch (error) {
      console.log(error);
    }
  }
}
