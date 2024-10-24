import { Webtoon } from '../../models/webtoon.model';

export interface GetWebtoonPort {
  execute(id: number): Promise<Webtoon>;
}
