import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentRepositoryPort } from 'src/domains/payment/ports/driven/payment.repository.interface';
import { Payment } from 'src/domains/payment/entities/payment.entity';
import { SqlitePaymentEntity } from '../entities/sqlite-payment.entity';

@Injectable()
export class SqlitePaymentRepository implements PaymentRepositoryPort {
  constructor(
    @InjectRepository(SqlitePaymentEntity)
    private readonly userRepository: Repository<SqlitePaymentEntity>,
  ) {}

  async findById(id: number): Promise<Payment | null> {
    const paymentEntity = await this.userRepository.findOne({
      where: { id },
    });
    return paymentEntity ? this.mapToDomain(paymentEntity) : null;
  }

  async save(payment: Payment): Promise<Payment> {
    const paymentEntity = this.mapToEntity(payment);
    const savedEntity = await this.userRepository.save(paymentEntity);
    return this.mapToDomain(savedEntity);
  }

  async update(id: number, user: Partial<Payment>): Promise<Payment> {
    await this.userRepository.update(id, user);
    const updatedEntity = await this.userRepository.findOne({
      where: { id },
    });
    return this.mapToDomain(updatedEntity);
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  private mapToDomain(entity: SqlitePaymentEntity): Payment {
    return new Payment({
      id: entity.id,
      userId: entity.userId,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }

  private mapToEntity(payment: Payment): SqlitePaymentEntity {
    const entity = new SqlitePaymentEntity();
    entity.id = payment.id;
    entity.userId = payment.userId;
    entity.createdAt = payment.createdAt;
    entity.updatedAt = payment.updatedAt;
    return entity;
  }
}
