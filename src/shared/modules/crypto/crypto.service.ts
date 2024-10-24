import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
@Injectable()
export class CryptoService {
  hash(password: string): string {
    const saltRounds = 10;
    return bcrypt.hashSync(password, saltRounds);
  }
  compare({ origin, target }: { origin: string; target: string }) {
    return bcrypt.compareSync(origin, target);
  }
}
