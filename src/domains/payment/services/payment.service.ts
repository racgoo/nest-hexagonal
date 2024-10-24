import { Injectable } from '@nestjs/common';
import { PaymentRepositoryPort } from '../ports/driven/payment.repository.port';
import { Payment } from '../models/payment.model';

@Injectable()
export class PaymentService {
  constructor(private readonly paymentRepository: PaymentRepositoryPort) {}

  async findByIdWithItems(id: number): Promise<Payment> {
    const payment = await this.paymentRepository.findByIdWithItems(id);
    if (!payment) {
      throw new Error('페이먼트를 찾을 수 없습니다.');
    }
    return payment;
  }

  async findById(id: number): Promise<Payment> {
    const payment = await this.paymentRepository.findById(id);
    if (!payment) {
      throw new Error('페이먼트를 찾을 수 없습니다.');
    }
    return payment;
  }

  async create(payment: Payment): Promise<Payment> {
    return this.paymentRepository.save(payment);
  }

  async update(id: number, payment: Partial<Payment>): Promise<Payment> {
    return this.paymentRepository.update(id, payment);
  }

  async delete(id: number): Promise<void> {
    await this.paymentRepository.delete(id);
  }
}
