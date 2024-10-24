import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { SqliteUserEntity } from './sqlite-user.entity';
import { SqlitePaymentItemEntity } from './sqlite-payment-item.entity';
import { Payment } from 'src/domains/payment/models/payment.model';

export enum PaymentRelations {
  USER = 'user',
  PAYMENT_ITEMS = 'paymentItems',
}

@Entity({ name: 'payment' })
export class SqlitePaymentEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  userId: number;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @ManyToOne(() => SqliteUserEntity)
  @JoinColumn({ name: 'userId' })
  user: SqliteUserEntity;
  @OneToMany(
    () => SqlitePaymentItemEntity,
    (paymentItem) => paymentItem.payment,
  )
  paymentItems: SqlitePaymentItemEntity[];

  static toDomain(paymentEntity: SqlitePaymentEntity): Payment {
    return new Payment({
      id: paymentEntity?.id,
      userId: paymentEntity?.userId,
      createdAt: paymentEntity?.createdAt,
      updatedAt: paymentEntity?.updatedAt,
      user: SqliteUserEntity.toDomain(paymentEntity?.user),
      paymentItems: paymentEntity?.paymentItems?.map((item) =>
        SqlitePaymentItemEntity.toDomain(item),
      ),
    });
  }

  static toEntity(payment: Payment): SqlitePaymentEntity {
    const entity = new SqlitePaymentEntity();
    entity.id = payment?.id;
    entity.userId = payment?.userId;
    return entity;
  }
}

// Read한거 다시 save 안하면 어떤가??
// R와 CUD를 구분해서 쓰자.
// CUD는 한방에.
// OneToMany로 연결된건 Many쪽에서만 수정하도록 하자. ex) products.push(NewProduct) 하고 save하면 동시성 발생할수있음.
// but, 반대편에서 연결을 추가하면 자동으로 됨. product.shop = 기존shopEndtity, product save GOGO??
