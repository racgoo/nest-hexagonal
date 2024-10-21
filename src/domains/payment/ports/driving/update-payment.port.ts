import { Payment } from '../../entities/payment.entity';

export interface UpdatePaymentPort {
  execute(id: number, paymentData: Partial<Payment>): Promise<Payment>;
}
