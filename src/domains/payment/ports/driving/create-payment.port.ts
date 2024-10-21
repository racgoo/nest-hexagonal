import { Payment } from '../../entities/payment.entity';

export interface CreatePaymentPort {
  execute(
    paymentData: Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Payment>;
}
