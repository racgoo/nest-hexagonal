import { Injectable, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  ClassSerializerInterceptor,
  ClassSerializerInterceptorOptions,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { plainToClass } from 'class-transformer';
import { RESPONSE_TYPE_KEY } from '../decorators/response-type.decorator';

@Injectable()
export class ResponseSerializeInterceptor extends ClassSerializerInterceptor {
  constructor(reflector: Reflector) {
    super(reflector, { excludeExtraneousValues: true });
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const responseType = this.reflector.get(
      RESPONSE_TYPE_KEY,
      context.getHandler(),
    );

    return super.intercept(context, next).pipe(
      map((data) => {
        if (responseType) {
          return plainToClass(responseType, data, {
            excludeExtraneousValues: true,
            exposeUnsetFields: false,
          });
        }
        // 데코레이터가 없는 경우에도 excludeExtraneousValues: true 적용
        return this.serialize(data, this.getContextOptions(context));
      }),
    );
  }

  serialize(response: any, options: ClassSerializerInterceptorOptions) {
    const isObject = response && typeof response === 'object';
    if (!isObject) {
      return response;
    }

    if (Array.isArray(response)) {
      return (response as Array<any>).map((item) =>
        this.serialize(item, options),
      );
    }

    return plainToClass(response.constructor, response, {
      ...options,
      excludeExtraneousValues: true,
      exposeUnsetFields: false,
    });
  }
}
