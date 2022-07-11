import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongoModule } from './mongo/mongo.module';
import { RedisModule } from './redis/redis.module';
import { SendgridModule } from './sendgrid/sendgrid.module';
import { AuthModule } from './auth/auth.module';
import { UtilsModule } from './utils/utils.module';
import * as mongoose from 'mongoose';
import config from './config';

if (config.NODE_ENV !== 'production') {
  mongoose.set('debug', true);
}

@Module({
  imports: [
    UsersModule,
    MongoModule.forRoot(config.MONGO_URI, {
      ignoreUndefined: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: true,
      minPoolSize: 5,
    }),
    RedisModule.forRoot(config.REDIS_URI),
    SendgridModule.forRoot(config.SENDGRID_API_KEY, config.SENDGRID_SENDER),
    AuthModule,
    UtilsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
