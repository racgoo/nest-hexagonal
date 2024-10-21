import { Payment } from '../../entities/payment.entity';

export interface GetPaymentPort {
  execute(id: number): Promise<Payment>;
}
