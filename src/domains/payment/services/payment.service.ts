import { Injectable } from '@nestjs/common';
import { PaymentRepositoryPort } from '../ports/driven/payment.repository.interface';
import { Payment } from '../entities/payment.entity';

@Injectable()
export class PaymentService {
  constructor(private readonly userRepository: PaymentRepositoryPort) {}

  async findById(id: number): Promise<Payment> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error('페이먼트를 찾을 수 없습니다.');
    }
    return user;
  }

  async create(payment: Payment): Promise<Payment> {
    return this.userRepository.save(payment);
  }

  async update(id: number, payment: Partial<Payment>): Promise<Payment> {
    return this.userRepository.update(id, payment);
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
