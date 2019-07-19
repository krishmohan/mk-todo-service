import { UniqueKeyGeneratorService } from './../unique-key-generator/unique-key-generator.service';
import { UrlService } from './url.service';
import { Controller, Post, Get, Body, Res, Param, InternalServerErrorException, NotFoundException, Delete } from '@nestjs/common';
import { URLDTO } from './url.dto';
import * as express from 'express';
import { async } from 'rxjs/internal/scheduler/async';

@Controller()
export class UrlController {

    constructor(
        private urlService: UrlService,
        private uniqueKeyGeneratorService: UniqueKeyGeneratorService
    ) { }

    @Post()
    async createShortURL(@Body() createShortURLDTO: URLDTO) {
        const uniqueKey = await this.uniqueKeyGeneratorService.getAvailableKey();
        if (!uniqueKey) {
            throw new InternalServerErrorException("Short url not available");
        }
        createShortURLDTO.shortUrl = uniqueKey;
        return await this.urlService.createURL(createShortURLDTO);
    }

    @Get(":id")
    async redirectToOriginalURL(@Param("id") shortUrl: string, @Res() res: express.Response) {
        const urlData = await this.urlService.findURL(shortUrl);
        if (!urlData) {
            throw new NotFoundException("URL Not Found!!");
        }
        return res.redirect(urlData.longUrl);
    }

    @Delete(":id")
    async deleteURL(@Param("id") shortUrl: string) {
        await this.uniqueKeyGeneratorService.markAsAvailable(shortUrl);
        return await this.urlService.deleteURL(shortUrl);
    }
}
