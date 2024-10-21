import { Injectable } from '@nestjs/common';
import { PaymentService } from '../services/payment.service';
import { Payment } from '../entities/payment.entity';
import { CreatePaymentPort } from '../ports/driving/create-payment.port';

@Injectable()
export class CreatePaymentUseCase implements CreatePaymentPort {
  constructor(private readonly paymentService: PaymentService) {}

  async execute(
    paymentData: Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Payment> {
    const newPayment = new Payment(paymentData);
    return this.paymentService.create(newPayment);
  }
}
