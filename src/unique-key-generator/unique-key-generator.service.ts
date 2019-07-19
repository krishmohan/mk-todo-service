import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UniqueKeyEntity } from './unique-key.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UniqueKeyGeneratorService {

    private static BASE_62_ARRAY = [
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
    ];
    constructor(
        @InjectRepository(UniqueKeyEntity)
        private uniqueKeyEntityRepo: Repository<UniqueKeyEntity>
    ) { }

    public async populateUniqueKeys() {
        const noOfKeysToPopulate = 1000;
        const lastRow = await this.uniqueKeyEntityRepo.findOne({ order: { id: "DESC" } });
        const startId = (lastRow && lastRow.id) || 1;
        const uniqueKeys: UniqueKeyEntity[] = [];
        for (let counter = startId + 1; counter <= startId + noOfKeysToPopulate; counter++) {
            const uniqueKeyEntity = new UniqueKeyEntity();
            const base62Key = UniqueKeyGeneratorService.base10Tobase62(counter);
            uniqueKeyEntity.uniqueKey = base62Key;
            uniqueKeys.push(this.uniqueKeyEntityRepo.create(uniqueKeyEntity))
        }
        await this.uniqueKeyEntityRepo.save(uniqueKeys);
    }

    public async getAvailableKey() {
        try {
            const uniqueKeyEntity = await this.uniqueKeyEntityRepo.findOne({ available: true }, { order: { id: "DESC" } });
            if (uniqueKeyEntity) {
                uniqueKeyEntity.available = false;
                uniqueKeyEntity.save();
                return uniqueKeyEntity.uniqueKey;
            }
            return null;
        } catch (err) {
            Logger.error("Error while getting unique key from DB: ", err);
        }
    }

    private static base10Tobase62(value: number): string {
        let base62Value = '';
        while (value > 0) {
            const mod = value % 62;
            value = Math.floor(value / 62);
            base62Value = base62Value + this.BASE_62_ARRAY[mod];
        }
        return base62Value;
    }

}
