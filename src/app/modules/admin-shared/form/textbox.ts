
export class TextboxQuestion {
  controlType = 'text';
  type: string;

  constructor(options: {} = {}) {
    this.type = options['type'] || '';
  }
}