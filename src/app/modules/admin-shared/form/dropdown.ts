
export class DropdownQuestion {
  controlType = 'dropdown';
  options: {key: string, value: string}[] = [];

  constructor(options: {} = {}) {
    this.options = options['options'] || [];
  }
}