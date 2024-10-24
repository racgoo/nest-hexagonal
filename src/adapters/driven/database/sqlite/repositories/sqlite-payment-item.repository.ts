import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PaymentItem } from 'src/domains/payment/models/payment-item.model';
import { SqlitePaymentItemEntity } from '../entities/sqlite-payment-item.entity';
import { PaymentItemRepositoryPort } from 'src/domains/payment/ports/driven/payment-item.repository.port';
@Injectable()
export class SqlitePaymentItemRepository implements PaymentItemRepositoryPort {
  constructor(
    @InjectRepository(SqlitePaymentItemEntity)
    private readonly paymentItemRepository: Repository<SqlitePaymentItemEntity>,
  ) {}

  async findById(id: number): Promise<PaymentItem | null> {
    const paymentItemEntity = await this.paymentItemRepository.findOne({
      where: { id },
    });
    return paymentItemEntity
      ? SqlitePaymentItemEntity.toDomain(paymentItemEntity)
      : null;
  }

  async save(paymentItem: PaymentItem): Promise<PaymentItem> {
    const paymentItemEntity = SqlitePaymentItemEntity.toEntity(paymentItem);
    const savedEntity =
      await this.paymentItemRepository.save(paymentItemEntity);
    return SqlitePaymentItemEntity.toDomain(savedEntity);
  }

  async update(
    id: number,
    paymentItem: Partial<PaymentItem>,
  ): Promise<PaymentItem> {
    await this.paymentItemRepository.update(id, paymentItem);
    const updatedEntity = await this.paymentItemRepository.findOne({
      where: { id },
    });
    return updatedEntity
      ? SqlitePaymentItemEntity.toDomain(updatedEntity)
      : null;
  }

  async delete(id: number): Promise<void> {
    await this.paymentItemRepository.delete(id);
  }
}
