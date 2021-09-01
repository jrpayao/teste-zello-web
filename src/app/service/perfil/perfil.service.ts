import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Response} from '../../interface/response';
import {Perfil} from '../../interface/perfil';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  constructor(private http: HttpClient) {
  }

  getAll() {
    const url = 'http://localhost/api/perfil';
    return this.http.get<Response<Perfil>>(url);
  }

  findById(id) {
    const url = 'http://localhost/api/perfil/' + id;
    return this.http.get<Response<Perfil>>(url);
  }

  create(data){
    const url = 'http://localhost/api/perfil';
    return this.http.post<Response<Perfil>>(url, data);
  }

  createVinculo(data){
    const url = 'http://localhost/api/pessoa/vinculo';
    return this.http.post<Response<Perfil>>(url, data);
  }

  update(id, data){
    const url = 'http://localhost/api/perfil/'+id;
    return this.http.put<Response<Perfil>>(url, data);
  }

  delete(id) {
    const url = 'http://localhost/api/perfil/' + id;
    return this.http.delete<Response<Perfil>>(url);
  }
}
