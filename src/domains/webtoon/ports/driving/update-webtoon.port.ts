import { Webtoon } from '../../models/webtoon.model';

export interface UpdateWebtoonPort {
  execute(id: number, webtoonData: Partial<Webtoon>): Promise<Webtoon>;
}
