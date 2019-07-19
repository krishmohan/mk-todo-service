import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { URLEntity } from './url.entity';
import { URLDTO } from './url.dto';

@Injectable()
export class UrlService {
    constructor(
        @InjectRepository(URLEntity)
        private urlRepository: Repository<URLEntity>
    ) { }

    public async createURL(data: URLDTO) {
        const urlEntity = await this.urlRepository.create(data);
        await this.urlRepository.save(urlEntity);
        return urlEntity;
    }

    public async findURL(shortUrl: string) {
        return await this.urlRepository.findOne({ shortUrl });
    }

    public async deleteURL(shortUrl: string) {
        return await this.urlRepository.delete({ shortUrl });
    }
}
