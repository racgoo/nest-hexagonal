// import {
//   Controller,
//   Get,
//   Post,
//   Put,
//   Delete,
//   Param,
//   Body,
// } from '@nestjs/common';
// import { WebtoonService } from '../../../../domains/webtoon/services/webtoon.service';
// import { Webtoon } from '../../../../domains/webtoon/entities/webtoon.entity';

// @Controller('webtoons')
// export class WebtoonController {
//   constructor(private readonly webtoonService: WebtoonService) {}

//   @Get(':id')
//   async getWebtoon(@Param('id') id: number): Promise<Webtoon> {
//     return this.webtoonService.getWebtoon(id);
//   }

//   @Post()
//   async createWebtoon(@Body() webtoon: Webtoon): Promise<Webtoon> {
//     return this.webtoonService.createWebtoon(webtoon);
//   }

//   @Put(':id')
//   async updateWebtoon(
//     @Param('id') id: number,
//     @Body() webtoon: Partial<Webtoon>,
//   ): Promise<Webtoon> {
//     return this.webtoonService.updateWebtoon(id, webtoon);
//   }

//   @Delete(':id')
//   async deleteWebtoon(@Param('id') id: number): Promise<void> {
//     await this.webtoonService.deleteWebtoon(id);
//   }
// }
