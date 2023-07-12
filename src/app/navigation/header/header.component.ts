import { Component,Input, Output, EventEmitter,ViewChild,ElementRef} from '@angular/core';
import { MatDatepickerModule,MatDatepickerInputEvent, MatDatepicker } from '@angular/material/datepicker';
import { ListerService } from '../../lister.service';
import { NativeDateAdapter } from '@angular/material/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { DateAdapter } from '@angular/material/core';
import { Platform } from '@angular/cdk/platform';

//import { MomentDateAdapter } from '@angular/material-moment-adapter';
//https://www.beyondjava.net/angular-material-monthpicker
//https://www.concretepage.com/angular-material/angular-material-datepicker-set-locale
export class MonthpickerDateAdapter extends NativeDateAdapter {
  constructor(matDateLocale: string, platform: Platform) {
    super(matDateLocale, platform);
  }


  override format(date: Date, displayFormat: any): string {
    const monthAsString = date.toLocaleString('en-GB', { month: 'long' })
    const year = date.getFullYear();
    return year +  '.' + monthAsString ;
  }
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [{
      provide: DateAdapter,
      useClass: MonthpickerDateAdapter,
      deps: [MAT_DATE_LOCALE, Platform],
    },
 ],
})

export class HeaderComponent {
  title="";
  showCalendar:boolean=true;

    constructor(private listService: ListerService, private dateAdapter: DateAdapter<any>) {
      this.dateAdapter.setLocale('en-GB');
      this.monthAndYear = new Date();
    }

    @ViewChild('input', { static: true }) FilterElement : ElementRef<any>= {} as ElementRef;

    @Output() public sidenavToggle = new EventEmitter();

    @Input()
    public monthAndYear: Date = new Date();

    @Output()
    public monthAndYearChange = new EventEmitter<Date | null>();

    public emitDateChange(event: MatDatepickerInputEvent<Date | null, unknown>): void {
      this.monthAndYearChange.emit(event.value);
    }

    public monthChanged(value: any, widget: any): void {
      this.monthAndYear = value;
      widget.close();
      this.listService.datumvalt(value);
    }

    ngOnInit() {
      this.listService.title.subscribe(updatedTitle  => {
        this.title = updatedTitle.settitle;
        this.showCalendar = !updatedTitle.showCalendar;
        this.FilterElement.nativeElement.value = "";
      });
    }

    applyFilter(event: Event) {
      this.listService.filtering(event);
    }

    public onToggleSidenav = () => {
      this.sidenavToggle.emit();
    }
}
