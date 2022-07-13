import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @ApiProperty({ description: 'email' })
  @Prop({ required: true, unique: true })
  email: string;

  @ApiProperty({ description: 'password' })
  @Prop({ required: true })
  password: string;

  @ApiProperty({ description: 'fullname' })
  @Prop({ required: true })
  fullname: string;

  @ApiProperty({ description: 'verify' })
  @Prop({ default: false })
  verify: boolean;

  @ApiProperty({ description: 'avatar' })
  @Prop({ default: '' })
  avatar: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
