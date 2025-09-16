import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core/constants';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { Modules } from './modules/modules';
import { TypeOrmModule } from '@nestjs/typeorm';
import asyncConfigTypeORM from './shared/typeorm/typeorm.config';
import { ClerkAuthGuard } from './modules/auth/strategies/ClerkAuthGuard';

const RATE_LIMIT_GUARD = {
  provide: APP_GUARD,
  useClass: ThrottlerGuard,
};

const CLERK_GUARD = { provide: APP_GUARD, useClass: ClerkAuthGuard };

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 10,
        },
      ],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () => await asyncConfigTypeORM(),
    }),
    Modules,
  ],
  exports: [Modules],
  providers: [RATE_LIMIT_GUARD, CLERK_GUARD],
})
export class AppModule {}
