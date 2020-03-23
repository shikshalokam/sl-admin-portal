import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-question',
    templateUrl: './main-form.component.html',
    styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormQuestionComponent implements OnInit {
    @Input() question: any;
    @Input() form: FormGroup;

    // For mandatory field 
   get isValid() {
        return this.form.controls[this.question.field].valid;
    }

    // To validate the patterns
    // get pattern(){
    //     return this.form.controls[this.question.field].hasError
    // }

    ngOnInit() {
    }
}