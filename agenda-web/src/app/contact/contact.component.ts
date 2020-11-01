import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contact } from './contact';
import { ContactService } from '../contact.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContactDetailComponent } from '../contact-detail/contact-detail.component';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  formContact : FormGroup;
  contacts : Contact[] = []
  columns = ['photo','name','email','favorite']
  
  //Dados de pagainação
  totalElements:number = 0;
  page : number = 0;
  size: number = 10;
  pageSizeOptions : number[] = [10];

  constructor(
    private service : ContactService,
    private fb : FormBuilder,
    private dialog : MatDialog,
    private snacBar : MatSnackBar
  ) { }

  ngOnInit(): void {
    this.prepareForm();  
    this.listContacts();
  }
  
  prepareForm(){
    this.formContact = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    })
  }

  listContacts(page = this.page, size = this.size){
    this.service.list(page, size).subscribe(response =>{
      this.contacts = response.content;
      this.totalElements = response.totalElements;
      this.page = response.number;
    })
  }

  submit(){
    const c : Contact = new Contact(
        this.formContact.value.name, 
        this.formContact.value.email,
        false);

    this.service.save(c).subscribe( response => {
      this.listContacts();
      this.snacBar.open(
        'Contact Added',
        'Success',
        {
          duration:2000
        });
        this.formContact.reset();
    })
  }

  favorite(event, contact : Contact){
    event.preventDefault();
    this.service.favorite(contact).subscribe(response => {
      contact.favorite = !contact.favorite
    });
  }

  /**
   * A cada evento de (change) do <input File> onde a cada mudança do arquivo o método uploadPhoto sera chamado.
   * Através do paramâmetro event é possível capturar os arquivos
   * @param event 
   * @param contact 
   */
  uploadPhoto(event, contact : Contact){

    //O target do event é o component input file
    const files = event.target.files;
    
    if(files){
      //Pega o primeiro item do array que contém a photo do upload
      const photo = files[0];
      console.log("1: " + photo);
      console.log("2: " + contact.id);
      const formData : FormData = new FormData();

      //"photo" é o  nome exato do parâmetro esperado pela API no ResquestParam
      formData.append("photo", photo);
      this.service.upload(contact, formData)
        .subscribe(response => {
          this.listContacts();
      })
    }
  }

  /**
   * Apresenta os detalhes do contato através de injeção do component dialog.
   * No método open é passado o componente que fará a renderização do dialog além dos parâmetros
   * de altura, largura e dados do contato.
   * @param contact 
   */
  openDetailContact(contact : Contact){
    
    this.dialog.open(ContactDetailComponent, {
      width: '400px',
      height: '450px',
      data: contact
    })    
  }

  doPage(event : PageEvent){
    this.listContacts(event.pageIndex, this.size);
  }
}
