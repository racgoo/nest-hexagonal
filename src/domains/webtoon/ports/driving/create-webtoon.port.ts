import { Webtoon } from '../../entities/webtoon.entity';

export interface CreateWebtoonPort {
  execute(
    webtoonData: Omit<Webtoon, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Webtoon>;
}
