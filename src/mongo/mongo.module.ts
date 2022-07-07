import { DynamicModule, Module } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';

export class MongoModule {
  public static forRoot(
    uri: string,
    options?: MongooseModuleOptions,
  ): DynamicModule {
    const mongooseModule = MongooseModule.forRoot(uri, options);

    return {
      global: true,
      imports: [mongooseModule],
      module: MongoModule,
      providers: [],
      exports: [],
    };
  }
}
