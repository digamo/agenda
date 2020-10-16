import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Contact } from '../contact/contact';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {

  constructor(
    //Referência do dialog para quando for chamado de outra tela
    public dialogRef : MatDialogRef<ContactDetailComponent>,

    //Injeção do objeto Contact para apresentar os detalhes em tela
    @Inject(MAT_DIALOG_DATA) public contact : Contact
  ) { }

  ngOnInit(): void {
  }

  closeDialog(){
    this.dialogRef.close();
  }
}
