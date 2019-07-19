import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlModule } from './url/url.module';
import { UniqueKeyGeneratorModule } from './unique-key-generator/unique-key-generator.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UrlModule,
    UniqueKeyGeneratorModule,
  ]
})
export class AppModule { }
