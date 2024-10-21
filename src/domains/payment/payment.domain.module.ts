import { Module } from '@nestjs/common';
import { SqliteModule } from 'src/adapters/driven/database/sqlite/sqlite.module';
import { SqlitePaymentRepository } from 'src/adapters/driven/database/sqlite/repositories/sqlite-payment.repository';
import { PaymentRepositoryPort } from './ports/driven/payment.repository.interface';
import { PaymentService } from './services/payment.service';
import { CreatePaymentUseCase } from './use-cases/create-payment.use-case';
import { UpdatePaymentUseCase } from './use-cases/update-payment.use-case';
import { DeletePaymentUseCase } from './use-cases/delete-payment.use-case';
import { GetPaymentUseCase } from './use-cases/get-payment.use-case';

@Module({
  imports: [SqliteModule],
  providers: [
    {
      provide: PaymentRepositoryPort,
      useExisting: SqlitePaymentRepository,
    },
    PaymentService,
    CreatePaymentUseCase,
    UpdatePaymentUseCase,
    DeletePaymentUseCase,
    GetPaymentUseCase,
  ],
  exports: [
    CreatePaymentUseCase,
    UpdatePaymentUseCase,
    DeletePaymentUseCase,
    GetPaymentUseCase,
  ],
})
export class PaymentDomainModule {}
