export interface Validator {
    name: string;
    validator: any;
    message: string;
    }
    export interface FieldConfig {
    label?: string;
    name?: string;
    input: string;
    options?: any[];
    collections?: any;
    visible: boolean,
    editable: boolean,
    value?: any;
    field: string;
    validation?: Validator[];
    }