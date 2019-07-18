import { Module } from '@nestjs/common';
import { UniqueKeyGeneratorController } from './unique-key-generator.controller';
import { UniqueKeyGeneratorService } from './unique-key-generator.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UniqueKeyEntity } from './unique-key.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UniqueKeyEntity
    ])
  ],
  controllers: [UniqueKeyGeneratorController],
  providers: [UniqueKeyGeneratorService],
  exports: [UniqueKeyGeneratorService]
})
export class UniqueKeyGeneratorModule { }
