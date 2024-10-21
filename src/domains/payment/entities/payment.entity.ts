import { Expose } from 'class-transformer';

export class Payment {
  @Expose()
  public readonly id: number;
  @Expose()
  public readonly userId: number;
  @Expose()
  public readonly createdAt: Date;
  @Expose()
  public readonly updatedAt: Date;

  constructor(data: Partial<Payment> & Pick<Payment, 'userId'>) {
    Object.assign(this, data);
  }
}
