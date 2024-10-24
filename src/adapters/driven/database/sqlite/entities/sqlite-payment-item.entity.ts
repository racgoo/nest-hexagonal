import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { SqlitePaymentEntity } from './sqlite-payment.entity';
import { PaymentItem } from 'src/domains/payment/models/payment-item.model';

export enum PaymentItemRelations {
  PAYMENT = 'payment',
}

@Entity({ name: 'payment_item' })
export class SqlitePaymentItemEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  price: number;
  @Column()
  webtoonId: number;
  @Column({ nullable: true })
  paymentId: number;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @ManyToOne(() => SqlitePaymentEntity, (payment) => payment.paymentItems)
  @JoinColumn({ name: 'paymentId' })
  payment: SqlitePaymentEntity;

  static toDomain(paymentItemEntity: SqlitePaymentItemEntity): PaymentItem {
    return new PaymentItem({
      id: paymentItemEntity?.id,
      price: paymentItemEntity?.price,
      webtoonId: paymentItemEntity?.webtoonId,
      paymentId: paymentItemEntity?.paymentId,
      createdAt: paymentItemEntity?.createdAt,
      updatedAt: paymentItemEntity?.updatedAt,
    });
  }

  static toEntity(paymentItem: PaymentItem): SqlitePaymentItemEntity {
    const entity = new SqlitePaymentItemEntity();
    entity.id = paymentItem?.id;
    entity.price = paymentItem?.price;
    entity.webtoonId = paymentItem?.webtoonId;
    entity.paymentId = paymentItem?.paymentId;
    return entity;
  }
}
