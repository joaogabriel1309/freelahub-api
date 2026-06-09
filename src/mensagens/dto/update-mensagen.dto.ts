import { PartialType } from '@nestjs/mapped-types';
import { CreateMensagenDto } from './create-mensagen.dto';

export class UpdateMensagenDto extends PartialType(CreateMensagenDto) {}
