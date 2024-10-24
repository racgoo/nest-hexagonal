import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentRepositoryPort } from 'src/domains/payment/ports/driven/payment.repository.port';

import {
  PaymentRelations,
  SqlitePaymentEntity,
} from '../entities/sqlite-payment.entity';
import { Payment } from 'src/domains/payment/models/payment.model';

@Injectable()
export class SqlitePaymentRepository implements PaymentRepositoryPort {
  constructor(
    @InjectRepository(SqlitePaymentEntity)
    private readonly paymentRepository: Repository<SqlitePaymentEntity>,
  ) {}

  async findById(id: number): Promise<Payment | null> {
    const paymentEntity = await this.paymentRepository.findOne({
      where: { id },
    });
    return paymentEntity ? SqlitePaymentEntity.toDomain(paymentEntity) : null;
  }

  async findByIdWithItems(id: number): Promise<Payment | null> {
    const paymentEntity = await this.paymentRepository.findOne({
      where: { id },
      relations: [PaymentRelations.PAYMENT_ITEMS],
    });
    return paymentEntity ? SqlitePaymentEntity.toDomain(paymentEntity) : null;
  }

  async save(payment: Payment): Promise<Payment> {
    const paymentEntity = SqlitePaymentEntity.toEntity(payment);
    console.log(paymentEntity);
    console.log(SqlitePaymentEntity.toDomain(paymentEntity));

    const savedEntity = await this.paymentRepository.save(paymentEntity);

    console.log(SqlitePaymentEntity.toDomain(savedEntity));
    return SqlitePaymentEntity.toDomain(savedEntity);
  }

  async update(
    id: number,
    payment: Omit<Partial<Payment>, 'user' | 'paymentItems'>,
  ): Promise<Payment> {
    await this.paymentRepository.update(id, payment);
    const updatedEntity = await this.paymentRepository.findOne({
      where: { id },
    });
    return updatedEntity ? SqlitePaymentEntity.toDomain(updatedEntity) : null;
  }

  async delete(id: number): Promise<void> {
    await this.paymentRepository.delete(id);
  }
}
