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
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { AuthUserGuard } from 'src/guard/auth-user.guard';
import { EditProfileDto } from './dto/edit-profile.dto';

@UseGuards(AuthUserGuard)
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  getProfile(@Req() request: any) {
    const id = request.user_id;
    return this.profileService.findProfile(id);
  }

  @Put()
  editProfile(@Req() request: any, @Body() editProfileDto: EditProfileDto) {
    const id = request.user_id;

    return this.profileService.editProfile(id, editProfileDto);
  }
}
