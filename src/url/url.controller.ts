import { UniqueKeyGeneratorService } from './../unique-key-generator/unique-key-generator.service';
import { UrlService } from './url.service';
import { Controller, Post, Get, Body, Res, Param } from '@nestjs/common';
import { URLDTO } from './url.dto';
import * as express from 'express';

@Controller('url')
export class UrlController {

    constructor(
        private urlService: UrlService,
        private uniqueKeyGeneratorService: UniqueKeyGeneratorService
    ) { }

    @Post()
    createShortURL(@Body() createShortURLDTO: URLDTO) {
        this.uniqueKeyGeneratorService.getAvailableKey().then((data) => {
            createShortURLDTO.shortUrl = data.uniqueKey;
            return this.urlService.createURL(createShortURLDTO);
        });
    }

    @Get(":id")
    redirectToOriginalURL(@Param("id") id: string, @Res() res: express.Response) {
        this.urlService.findURL(id).then((data) => {
            return res.redirect(data.longUrl);
        });
    }
}
