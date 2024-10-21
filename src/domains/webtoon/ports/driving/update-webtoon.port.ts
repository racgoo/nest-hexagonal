import { Webtoon } from '../../entities/webtoon.entity';

export interface UpdateWebtoonPort {
  execute(id: number, webtoonData: Partial<Webtoon>): Promise<Webtoon>;
}
