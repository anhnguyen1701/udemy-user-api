import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SendgridService } from 'src/sendgrid/sendgrid.service';
import { UsersService } from 'src/users/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/schema/user.schema';
import { UtilsService } from 'src/utils/utils.service';

@Module({
  controllers: [AuthController],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [AuthService, UsersService, SendgridService, String, UtilsService],
})
export class AuthModule {}
