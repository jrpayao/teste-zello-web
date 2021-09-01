import {Injectable} from '@angular/core';
import {Pessoas} from '../../interface/pessoas';
import {Response} from '../../interface/response';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) {
  }

  getAllPessoas() {
    const url = 'http://localhost/api/pessoa';
    return this.http.get<Response<Pessoas>>(url);
  }

  findById(id) {
    const url = 'http://localhost/api/pessoa/' + id;
    return this.http.get<Response<Pessoas>>(url);
  }

  create(data){
    const url = 'http://localhost/api/pessoa';
    return this.http.post<Response<Pessoas>>(url, data);
  }

  update(id, data){
    const url = 'http://localhost/api/pessoa/'+id;
    return this.http.put<Response<Pessoas>>(url, data);
  }

  delete(id) {
    const url = 'http://localhost/api/pessoa/' + id;
    return this.http.delete<Response<Pessoas>>(url);
  }

  removerVinculo(id) {
    const url = 'http://localhost/api/pessoa/vinculo/' + id;
    return this.http.delete<Response<Pessoas>>(url);
  }
}
