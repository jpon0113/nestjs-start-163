import { Controller, Get, Version } from '@nestjs/common';
import { PrismaService } from './database/prisma/prisma.service';

@Controller()
export class AppController {
  constructor(private prismaService: PrismaService) {}

  @Get()
  // @Version('1')
  async getHello(): Promise<any> {
    const res = await this.prismaService.user.findMany({});
    return res;
  }

  @Get()
  @Version('2')
  getHelloV2(): string {
    return 'hello V2';
  }
}
