import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { URLEntity } from './url.entity';
import { UrlController } from './url.controller';
import { UrlService } from './url.service';
import { UniqueKeyGeneratorModule } from './../unique-key-generator/unique-key-generator.module';

@Module({
    imports: [
        UniqueKeyGeneratorModule,
        TypeOrmModule.forFeature([URLEntity])
    ],
    controllers: [UrlController],
    providers: [
        UrlService
    ]
})
export class UrlModule { }
