import { Expose } from 'class-transformer';
import { User } from 'src/domains/user/models/user.model';
import { PaymentItem } from './payment-item.model';

export class Payment {
  @Expose()
  public readonly id: number;
  @Expose()
  public readonly userId: number;
  @Expose()
  public readonly paymentItems: PaymentItem[] = [];
  @Expose()
  public readonly user: User | null = null;
  @Expose()
  public readonly createdAt: Date;
  @Expose()
  public readonly updatedAt: Date;

  constructor(data: Partial<Payment> & Pick<Payment, 'userId'>) {
    Object.assign(this, data);
  }
}
