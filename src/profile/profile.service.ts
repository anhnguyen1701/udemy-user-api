import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/schema/user.schema';
import { EditProfileDto } from './dto/edit-profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async findProfile(id: number) {
    return await this.userModel.findById(id);
  }

  async editProfile(id: number, editProfileDto: EditProfileDto) {
    console.log(editProfileDto);
    console.log(id);
    const user = await this.userModel.findOneAndUpdate(
      { id: id },
      editProfileDto,
      { new: true },
    );

    return user;
  }
}
