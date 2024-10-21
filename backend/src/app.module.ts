import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { IdeasModule } from './ideas/ideas.module';
import { ChatModule } from './chat/chat.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    IdeasModule,
    ChatModule,
  ],
})
export class AppModule {}
