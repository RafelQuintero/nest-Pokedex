import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ParseMongoIdPipe implements PipeTransform {
  //

  transform(value: any, metadata: ArgumentMetadata) {
    //?console.log({ value, metadata });

    //?Queremos que validemos el id que sea de mogoose

    if (!isValidObjectId(value)) {
      //?si no es un id de mogoose mandams un mesaje de error
      throw new BadRequestException(
        `The "${value}" not´s id  valid the mongoID`,
      );
    }

    return value; //?Regresa el vlue en mayuscula
  }

  //
}
