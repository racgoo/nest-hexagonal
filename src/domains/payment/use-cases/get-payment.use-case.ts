import { Injectable } from '@nestjs/common';

import { PaymentService } from '../services/payment.service';
import { Payment } from '../entities/payment.entity';
import { GetPaymentPort } from '../ports/driving/get-payment.port';

@Injectable()
export class GetPaymentUseCase implements GetPaymentPort {
  constructor(private readonly paymentService: PaymentService) {}

  async execute(id: number): Promise<Payment> {
    return this.paymentService.findById(id);
  }
}
