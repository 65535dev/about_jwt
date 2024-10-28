import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { LoggerMiddleware } from './logger/logger.middleware';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [UserModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*'); //전역으로 로깅 등록
    // .forRoutes('users'); //user 경로에만 등록
    // .forRoutes({ path: 'users', method: RequestMethod.GET }); //users 경로에서 GET 요청에만 등록
    // .forRoutes({ path: 'ab*cd', method: RequestMethod.ALL }); //패턴 기반 경로

    // consumer.apply(LoggerMiddleware).forRoutes(UserController); //컨트롤러 등록도 가능
    //  .apply(LoggerMiddleware).exclude({ path: 'user', method: RequestMethod.GET }, { path: 'user', method: RequestMethod.POST }, 'user/(.*)',) //특정경로 제외도 가능
  }
}
