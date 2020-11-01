import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpParams } from '@angular/common/http';
import { Contact } from './contact/contact';
import { PageContact } from './contact/pageContact';
import { Observable, concat } from 'rxjs';

import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  url : string = environment.apiUrlBase + "/api/contacts";

  constructor(
    private http : HttpClient
  ) { }

  save(contact : Contact) : Observable<Contact> {
    return this.http.post<Contact>(this.url, contact);
  }

  list(page, size) : Observable<PageContact> {
    const params = new HttpParams()
    .set("page", page)
    .set("size", size)

    //get<any> porque não haverá passagem de parâmetro
    return this.http.get<any>(`${this.url}?${params.toString()}`);
  }

  //Observable<any> porque não haverá retorno do serviço
  favorite(contact : Contact) : Observable<any>{
    return this.http.patch<any>(`${this.url}/favorite/${contact.id}`, null);
  }

  /**
   * Atualiza o objeto com a imagem carregada em tela acionando o método PUT da API
   * O retorno é um array de byte representado por { responseType : 'blob' }
   * @param contact 
   * @param formData 
   */
  upload(contact: Contact, formData : FormData) : Observable<any>{
    return this.http.put(`${this.url}/photo/${contact.id}`,formData, { responseType : 'blob' })
  }
}
