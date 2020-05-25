import { Directive, ViewChild, HostListener, ElementRef, Output, EventEmitter, Renderer } from '@angular/core';
import { fromEvent } from 'rxjs';
import { distinctUntilChanged, map, filter, debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Directive({
  selector: '[appCustomsearch]'
})
export class CustomsearchDirective {
  @Output() debounceClick = new EventEmitter();
  @ViewChild('searchInput') searchInput: ElementRef;
  private clicks = new Subject();
  constructor(private Element: ElementRef,
    private renderer: Renderer) {
    }

  ngOnInit() {
    this.clicks
      .pipe(debounceTime(500))
      .subscribe(e => this.debounceClick.emit(e));
  }

  @HostListener('keyup', ['$event'])
  clickEvent(event) {
    event.preventDefault();
    event.stopPropagation();
    this.clicks.next(event);
    console.log('Click from Host Element!');
  }

}
