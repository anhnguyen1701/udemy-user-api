import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/schema/user.schema';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async findProfile(id: number) {
    return await this.userModel.findById(id);
  }
}
