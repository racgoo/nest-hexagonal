import { Module } from '@nestjs/common';
import { SqliteModule } from 'src/adapters/driven/database/sqlite/sqlite.module';
import { SqlitePaymentRepository } from 'src/adapters/driven/database/sqlite/repositories/sqlite-payment.repository';
import { PaymentRepositoryPort } from './ports/driven/payment.repository.port';
import { PaymentService } from './services/payment.service';
import { CreatePaymentUseCase } from './use-cases/create-payment.use-case';
import { UpdatePaymentUseCase } from './use-cases/update-payment.use-case';
import { DeletePaymentUseCase } from './use-cases/delete-payment.use-case';
import { GetPaymentUseCase } from './use-cases/get-payment.use-case';
import { CreatePaymentItemUseCase } from './use-cases/create-payment-item.use-case';
import { PaymentItemRepositoryPort } from './ports/driven/payment-item.repository.port';
import { SqlitePaymentItemRepository } from 'src/adapters/driven/database/sqlite/repositories/sqlite-payment-item.repository';
import { PaymentItemService } from './services/payment-item.service';

@Module({
  imports: [SqliteModule],
  providers: [
    {
      provide: PaymentRepositoryPort,
      useExisting: SqlitePaymentRepository,
    },
    {
      provide: PaymentItemRepositoryPort,
      useExisting: SqlitePaymentItemRepository,
    },
    PaymentService,
    PaymentItemService,
    CreatePaymentUseCase,
    CreatePaymentItemUseCase,
    UpdatePaymentUseCase,
    DeletePaymentUseCase,
    GetPaymentUseCase,
  ],
  exports: [
    CreatePaymentUseCase,
    CreatePaymentItemUseCase,
    UpdatePaymentUseCase,
    DeletePaymentUseCase,
    GetPaymentUseCase,
  ],
})
export class PaymentDomainModule {}
