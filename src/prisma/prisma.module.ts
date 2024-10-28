import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() //전역으로 사용하기 위해 추가함
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
