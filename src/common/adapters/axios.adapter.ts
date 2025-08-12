import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { HttpAdapter } from '../interfaces/http-adapter.interface';

//TODO: crere una clase para que sea un envoltorio de axios por si acios cambia de nombre.
//todo: por loq que debe ser una clae implemetador de algo

//*
@Injectable()
export class AxiosAdapter implements HttpAdapter {
  private axios: AxiosInstance = axios; //al quiarle el readonly no necesito el this

  //todo: Este es el codigo necesario para que cumpla la interface HttAdapter
  async get<T>(url: string): Promise<T> {
    try {
      const { data } = await this.axios.get<T>(url);

      return data;
    } catch (error) {
      throw new Error('Method not implemented._Check log');
    }
  }
}

//TODO: Nota: los clase Injectable esta a nive de mosulo lo termon queexportalo e  inprtar a
// todo otros mudulo para poder utilizarlo.
//todo;
