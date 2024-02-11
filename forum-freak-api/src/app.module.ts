import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './features/auth/auth.module';
import { CategoryModule } from './features/category/category.module';
import { Category } from './features/category/entities/category.entity';
import { CommentsModule } from './features/comments/comments.module';
import { Comments } from './features/comments/entities/comments.entity';
import { Topics } from './features/topics/entities/topics.entity';
import { TopicsModule } from './features/topics/topics.module';
import { Users } from './features/users/entities/users.entity';
import { UsersModule } from './features/users/users.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TopicsModule,
    CommentsModule,
    CategoryModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseFloat(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Users, Category, Topics, Comments],
      synchronize: true,
      migrationsRun: true,
      autoLoadEntities: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
