import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/schema/user.schema';
import { ChangePasswordDto } from './dto/change-password.dto';
import { EditProfileDto } from './dto/edit-profile.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async findProfile(id: number) {
    return await this.userModel.findById(id);
  }

  async editProfile(id: number, editProfileDto: EditProfileDto) {
    const user = await this.userModel.findOneAndUpdate(
      { id: id },
      editProfileDto,
      { new: true },
    );

    return user;
  }

  async changePassword(id: string, changePasswordDto: ChangePasswordDto) {
    const { newPassword } = changePasswordDto;

    const salt = 10;
    const hashPassword = await bcrypt.hash(newPassword, salt);

    const user = await this.userModel.findOneAndUpdate(
      { id },
      { password: hashPassword },
      { new: true },
    );

    return {
      status: 200,
      message: user,
    };
  }
}
