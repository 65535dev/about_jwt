import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class UserPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (Object.keys(value).length == 0 && value.constructor === Object) {
      //오브젝트 값을 확인
      throw new BadRequestException('값이 비어있습니다 확인해주세요.');
    } else {
      return value;
    }
  }
}
