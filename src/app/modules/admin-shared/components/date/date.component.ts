import { Component, OnInit } from "@angular/core";
import { NativeDateAdapter } from "@angular/material";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../../field.interface";
import { MatDateFormats,DateAdapter, MAT_DATE_FORMATS } from "@angular/material/core";
@Component({
    selector: "app-date",
    templateUrl: './date.component.html',
    styleUrls: ['./date.component.scss'],
})
export class DateComponent implements OnInit {
    field: FieldConfig;
    group: FormGroup;
    yesterday = new Date(); 
    format(date: Date, displayFormat: Object): string {
        if (displayFormat === 'input') {
            let day: string = date.getDate().toString();
            day = +day < 10 ? '0' + day : day;
            let month: string = (date.getMonth() + 1).toString();
            month = +month < 10 ? '0' + month : month;
            let year = date.getFullYear();
            return `${day}-${month}-${year}`;
        }
        return date.toDateString();
    }
    constructor() {
        this.yesterday.setDate(this.yesterday.getDate() - 1);
     }
    ngOnInit() { }

    
}
export const APP_DATE_FORMATS: MatDateFormats = {
    parse: {
        dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
    },
    display: {
        dateInput: 'input',
        monthYearLabel: { year: 'numeric', month: 'numeric' },
        dateA11yLabel: {
            year: 'numeric', month: 'long', day: 'numeric'
        },
        monthYearA11yLabel: { year: 'numeric', month: 'long' },
    }
};


