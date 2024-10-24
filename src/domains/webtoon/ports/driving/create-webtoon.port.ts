import { Webtoon } from '../../models/webtoon.model';

export interface CreateWebtoonPort {
  execute(
    webtoonData: Omit<Webtoon, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Webtoon>;
}
