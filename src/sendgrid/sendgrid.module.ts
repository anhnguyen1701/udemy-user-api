import { DynamicModule, Module, Provider } from '@nestjs/common';
import { SendgridService } from './sendgrid.service';

export class SendgridModule {
  public static forRoot(api_key: string, sender: string): DynamicModule {
    const sendgridService = new SendgridService(api_key, sender);
    const sendgridServiceProvider: Provider<SendgridService> = {
      provide: SendgridService,
      useValue: sendgridService,
    };

    return {
      global: true,
      module: SendgridModule,
      providers: [sendgridServiceProvider],
      exports: [sendgridServiceProvider],
    };
  }
}
