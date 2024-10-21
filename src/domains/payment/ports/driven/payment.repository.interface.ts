import { Payment } from '../../entities/payment.entity';

export abstract class PaymentRepositoryPort {
  abstract findById(id: number): Promise<Payment | null>;
  abstract save(payment: Payment): Promise<Payment>;
  abstract update(id: number, webtoon: Partial<Payment>): Promise<Payment>;
  abstract delete(id: number): Promise<void>;
}
