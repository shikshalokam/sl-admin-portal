import { Directive, ViewChild, HostListener, Input, ElementRef, Output, DoCheck, EventEmitter, Renderer, AfterViewInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { distinctUntilChanged, map, filter, debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Directive({
  selector: '[appCustomsearch]'
})
export class DebounceDirective implements DoCheck, AfterViewInit {
  @Input() appCustomsearch;
  @Output() debounceClick = new EventEmitter();
  @ViewChild('searchInput') searchInput: ElementRef;
  // private clicks = new Subject();
  constructor(private Element: ElementRef,
    private renderer: Renderer) {
  }

  ngOnInit() {

  }
  ngAfterViewInit() {
    let valLength = this.Element.nativeElement.value.length;
    if (valLength > 3) {
      this.debounceClick.emit();

    }
  }
  ngDoCheck() {
    let valLength = this.Element.nativeElement.value.length;
    if (valLength > 3) {
      this.debounceClick.emit();
      // this.clicks
      // .pipe(debounceTime(1000))
      // .subscribe(e => { 
      //   this.debounceClick.emit(e);
      //   console.log("valLength " + valLength);
      // });
    }

    // let valLength = this.Element.nativeElement
    // .pipe(
    //   map((event: any) => {
    //     return event.target.value;
    //   }),
    //   // filter(res => res.length > 2 || res.length == 0),
    //   debounceTime(1000),
    //   distinctUntilChanged()
    // )
    // .subscribe((text: string) => {
    //   // this.getUserList();
    //   this.debounceClick.emit();
    // });
  }
  
}
