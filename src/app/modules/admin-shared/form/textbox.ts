
export class TextboxQuestion {
  controlType = 'textbox';
  type: string;

  constructor(options: {} = {}) {
    this.type = options['type'] || '';
  }
}