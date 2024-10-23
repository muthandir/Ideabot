import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { IdeasModule } from './ideas/ideas.module';
import { ChatModule } from './chat/chat.module';
import { PrismaModule } from './prisma/prisma.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    IdeasModule,
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 10,
        },
      ],
    }),
    ChatModule,
  ],
})
export class AppModule {}
