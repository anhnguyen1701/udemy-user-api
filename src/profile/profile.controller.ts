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
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { AuthUserGuard } from 'src/guard/auth-user.guard';
import { EditProfileDto } from './dto/edit-profile.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from 'src/users/schema/user.schema';
import { ChangePasswordDto } from './dto/change-password.dto';

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
}
