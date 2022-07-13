import { Injectable, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/schema/user.schema';
import { ChangePasswordDto } from './dto/change-password.dto';
import { EditProfileDto } from './dto/edit-profile.dto';
import * as bcrypt from 'bcrypt';
const { Storage } = require('@google-cloud/storage');
import { v4 as uuidv4 } from 'uuid';
import { response } from 'express';

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


  //todo: add type of file upload to storage
  async uploadAvatar(
    id: string,
    inputFile: Express.Multer.File,
    @Res() response,
  ) {
    let projectId = 'rising-amp-350807'; // Get this from Google Cloud
    let keyFilename = '/home/anhnguyen/dev/gitlab/user-api/gckey.json'; // Get this from Google Cloud -> Credentials -> Service Accounts
    const storage = new Storage({
      projectId,
      keyFilename,
    });
    const bucket = storage.bucket('rising-amp-350807.appspot.com'); // Get this from Google Cloud -> Storage

    try {
      if (inputFile) {
        const file_name = uuidv4();

        const file = bucket.file(file_name);
        const stream = file.createWriteStream();
        await stream.on('finish', async () => {
          const url =
            'https://storage.googleapis.com/' +
            projectId +
            '.appspot.com/' +
            file_name;

          const user = await this.userModel.findOneAndUpdate(
            { id },
            { avatar: url },
            { new: true },
          );

          response.status(200).send(user);
        });

        stream.end(inputFile.buffer);
      } else throw 'error';
    } catch (error) {
      console.log(error);
    }
  }
}
