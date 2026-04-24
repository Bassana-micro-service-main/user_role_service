import { Module } from '@nestjs/common';
import { PrismaModule } from './infrastructure/database/prisma/prisma.module';
import { RoleModule } from './adapter/in/role/role.module';
// import { UserModule } from './users/user.module';
// import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    PrismaModule,
    RoleModule,
    // UserModule,
    // AuthModule,
  ],
})
export class AppModule {}
