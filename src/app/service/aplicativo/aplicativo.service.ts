import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Response} from '../../interface/response';
import {Aplicativo} from '../../interface/aplicativo';
import {Perfil} from '../../interface/perfil';

@Injectable({
  providedIn: 'root'
})
export class AplicativoService {

  constructor(private http: HttpClient) { }

  getAll() {
    const url = 'http://localhost/api/aplicativo';
    return this.http.get<Response<Aplicativo>>(url);
  }

  findById(id) {
    const url = 'http://localhost/api/aplicativo/' + id;
    return this.http.get<Response<Aplicativo>>(url);
  }

  create(data){
    const url = 'http://localhost/api/aplicativo';
    return this.http.post<Response<Aplicativo>>(url, data);
  }

  update(id, data){
    const url = 'http://localhost/api/aplicativo/'+id;
    return this.http.put<Response<Aplicativo>>(url, data);
  }

  delete(id) {
    const url = 'http://localhost/api/aplicativo/' + id;
    return this.http.delete<Response<Aplicativo>>(url);
  }

  removerVinculo(id) {
    const url = 'http://localhost/api/pessoa/vinculoAplicativo/' + id;
    return this.http.delete<Response<Aplicativo>>(url);
  }

  createVinculo(data){
    const url = 'http://localhost/api/pessoa/vinculoAplicativo';
    return this.http.post<Response<Perfil>>(url, data);
  }

}
