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
    data: any;
    // For mandatory field 
    get isValid() {
        return this.form.controls[this.question.field].valid;
    }

    // To validate the patterns
    get pattern() {
        this.question.validation.forEach(element => {
            if (element.name === 'pattern') {
             this.data = this.form.controls[this.question.field].valid;
;            } else {
               this.data = '';
            }
        });
        return this.data;
        // return this.form.controls[this.question.field].errors.pattern(this.question.validation.validator)
    }

    ngOnInit() {
    }
}