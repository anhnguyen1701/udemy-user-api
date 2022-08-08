import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Put,
  HttpStatus,
  UploadedFile,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { AuthUserGuard } from 'src/guard/auth-user.guard';
import { EditProfileDto } from './dto/edit-profile.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from 'src/users/schema/user.schema';
import { ChangePasswordDto } from './dto/change-password.dto';
import * as Multer from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('profile')
@UseGuards(AuthUserGuard)
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  @ApiOperation({ summary: 'get user profile' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: User,
    description: 'return logged user',
  })
  @ApiBearerAuth()
  getProfile(@Req() request: any) {
    const id = request.user_id;
    return this.profileService.findProfile(id);
  }

  @Put()
  @ApiOperation({ summary: 'edit user profile' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: User,
    description: 'return logged user after edited',
  })
  @ApiBearerAuth()
  editProfile(@Req() request: any, @Body() editProfileDto: EditProfileDto) {
    const id = request.user_id;

    return this.profileService.editProfile(id, editProfileDto);
  }

  @Patch('/change-password')
  @ApiOperation({ summary: 'change password' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: User,
    description: 'return user after changepassword',
  })
  @ApiBearerAuth()
  changePassword(
    @Req() request: any,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    const id = request.user_id;

    return this.profileService.changePassword(id, changePasswordDto);
  }

  @Patch('/upload-avatar')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiBearerAuth()
  uploadAvatar(
    @Req() request: any,
    @Res() response: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const id = request.user_id;
    return this.profileService.uploadAvatar(id, file, response);
  }
}
