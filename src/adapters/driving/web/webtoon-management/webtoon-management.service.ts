import { Injectable } from '@nestjs/common';
import { CreateWebtoonUseCase } from 'src/domains/webtoon/use-cases/create-webtoon.use-case';
import { DeleteWebtoonUseCase } from 'src/domains/webtoon/use-cases/delete-webtoon.use-case';
import { GetWebtoonUseCase } from 'src/domains/webtoon/use-cases/get-webtoon.use-case';
import { UpdateWebtoonUseCase } from 'src/domains/webtoon/use-cases/update-webtoon.use-case';
import { RegisterWebtoonRequest } from './dto/register-webtoon.dto';

@Injectable()
export class WebtoonManagementService {
  constructor(
    private readonly createWebtoonUseCase: CreateWebtoonUseCase,
    private readonly getWebtoonUseCase: GetWebtoonUseCase,
    private readonly deleteWebtoonUseCase: DeleteWebtoonUseCase,
    private readonly updateWebtoonUseCase: UpdateWebtoonUseCase,
  ) {}

  getWebtoonById(id: number) {
    return this.getWebtoonUseCase.execute(id);
  }

  registerWebtoon(webtoonData: RegisterWebtoonRequest) {
    return this.createWebtoonUseCase.execute(webtoonData);
  }
}
