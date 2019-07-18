import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { URLEntity } from './url/url.entity';
import { UrlModule } from './url/url.module';
import { UniqueKeyGeneratorModule } from './unique-key-generator/unique-key-generator.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UrlModule,
    UniqueKeyGeneratorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
