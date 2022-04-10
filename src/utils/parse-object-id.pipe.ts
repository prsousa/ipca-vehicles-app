import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ParseObjectIdPipe implements PipeTransform<any, string> {
  transform(value: any): string {
    if (!isValidObjectId(value)) {
      throw new BadRequestException('Invalid ObjectId');
    }

    return value;
  }
}
