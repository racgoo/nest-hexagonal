import { Injectable } from '@nestjs/common';
import { PaymentItemRepositoryPort } from '../ports/driven/payment-item.repository.port';
import { PaymentItem } from '../models/payment-item.model';

@Injectable()
export class PaymentItemService {
  constructor(
    private readonly paymentItemRepository: PaymentItemRepositoryPort,
  ) {}

  async findById(id: number): Promise<PaymentItem> {
    const paymentItem = await this.paymentItemRepository.findById(id);
    if (!paymentItem) {
      throw new Error('페이먼트 아이템을 찾을 수 없습니다.');
    }
    return paymentItem;
  }

  async create(paymentItem: PaymentItem): Promise<PaymentItem> {
    return this.paymentItemRepository.save(paymentItem);
  }

  async update(
    id: number,
    paymentItem: Partial<PaymentItem>,
  ): Promise<PaymentItem> {
    return this.paymentItemRepository.update(id, paymentItem);
  }

  async delete(id: number): Promise<void> {
    await this.paymentItemRepository.delete(id);
  }
}
