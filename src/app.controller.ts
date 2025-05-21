import { Controller, Get, Version } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  // @Version('1')
  getHello(): string {
    return 'hello';
  }

  @Get()
  @Version('2')
  getHelloV2(): string {
    return 'hello V2';
  }
}
