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
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { AuthUserGuard } from 'src/guard/auth-user.guard';

@UseGuards(AuthUserGuard)
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  findOne(@Req() request: any) {
    const id = request.user_id;
    return this.profileService.findProfile(id);
  }
}
