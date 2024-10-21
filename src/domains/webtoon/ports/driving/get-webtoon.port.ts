import { Webtoon } from '../../entities/webtoon.entity';

export interface GetWebtoonPort {
  execute(id: number): Promise<Webtoon>;
}
