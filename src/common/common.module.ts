import { Module } from '@nestjs/common';
import { AxiosAdapter } from './adapters/axios.adapter';

@Module({
  providers: [AxiosAdapter], //Se lo hemos agregado manualmente para luego exportarlo
  exports: [AxiosAdapter],
})
export class CommonModule {}
