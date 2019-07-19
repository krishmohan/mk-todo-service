import { IsUrl, IsNotEmpty } from 'class-validator';

export class URLDTO {

    shortUrl?: string;

    @IsUrl()
    @IsNotEmpty()
    longUrl: string;
}