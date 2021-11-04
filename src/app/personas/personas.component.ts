import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit {
  persons: any;
  personForm: FormGroup;
  bSubmitted: boolean = false;

  constructor(private apiService: ApiService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getPersons();
    this.initForm();
  }

  getPersons(){
    this.apiService.getPersons()
    .subscribe((data)=>{
      this.persons = data;
      console.log(data);
    },
    (error)=>{

      console.warn(error);
    });
  }
  
  initForm(){
    this.personForm = this.formBuilder.group({
      first: ['', [Validators.required]],
      last : ['', [Validators.required]],
      email : ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(){
    this.bSubmitted = true;
    console.log(this.personForm.valid)
    if(this.personForm.valid){
      this.persons.push(this.personForm.value);
      this.initForm();
      this.bSubmitted=false;
    }
  }

  get fp(){
    return this.personForm.controls;
  }


}
