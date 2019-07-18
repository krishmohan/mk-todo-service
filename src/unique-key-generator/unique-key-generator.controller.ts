import { Controller, Post } from '@nestjs/common';
import { UniqueKeyGeneratorService } from './unique-key-generator.service';

@Controller('uk-gen')
export class UniqueKeyGeneratorController {

    constructor(private uniqueKeyGeneratorService: UniqueKeyGeneratorService) { }

    @Post()
    generateUniqueKeys() {
        this.uniqueKeyGeneratorService.populateUniqueKeys();
        return 'successs!!';
    }

}
