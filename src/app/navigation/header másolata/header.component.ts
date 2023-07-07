import { Component,Input, Output, EventEmitter,ViewChild,ElementRef} from '@angular/core';
import { MatDatepickerModule,MatDatepickerInputEvent, MatDatepicker } from '@angular/material/datepicker';
import { ListerService } from '../../lister.service';
import { MatInputModule} from '@angular/material/input';
import { MatNativeDateModule,NativeDateAdapter } from '@angular/material/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { DateAdapter } from '@angular/material/core';
import { Platform } from '@angular/cdk/platform';

//import { MomentDateAdapter } from '@angular/material-moment-adapter';
//https://www.beyondjava.net/angular-material-monthpicker
//https://www.concretepage.com/angular-material/angular-material-datepicker-set-locale
export class MonthpickerDateAdapter extends NativeDateAdapter {
  constructor(matDateLocale: string, platform: Platform) {
    super(matDateLocale, platform);
  }

  override parse(value: string): Date | null {
    const monthAndYearRegex = /(10|11|12|0\d|\d)\/[\d]{4}/;
    if (value?.match(monthAndYearRegex)) {
      const parts = value.split('/');
      const month = Number(parts[0]);
      const year = Number(parts[1]);
      if (month > 0 && month <= 12) {
        return new Date(year, month - 1);
      }
    }
    return null;
  }

  override format(date: Date, displayFormat: any): string {
    const month = date.getMonth() + 1;
    //const monthAsString = ('0' + month).slice(-2);
    const monthAsString =date.toLocaleString('hu-HU', { month: 'long' })
    const year = date.getFullYear();
    //return monthAsString + '/' + year;
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
  showCalendar:boolean;

    constructor(private listService: ListerService, private dateAdapter: DateAdapter<any>) {
      this.dateAdapter.setLocale('hu-HU');
      this.monthAndYear = new Date();
    }

    @ViewChild('input', { static: true }) FilterElement: ElementRef;

    @Output() public sidenavToggle = new EventEmitter();

    @Input()
    //public monthAndYear: Date | null = null;
    public monthAndYear: Date = new Date();

    @Output()
    public monthAndYearChange = new EventEmitter<Date | null>();

    public emitDateChange(event: MatDatepickerInputEvent<Date | null, unknown>): void {
      this.monthAndYearChange.emit(event.value);

      //console.log("emitDateChange"+event.value);
    }

    public monthChanged(value: any, widget: any): void {
      this.monthAndYear = value;
      //console.log("monthAndYear"+value);
      widget.close();
      this.listService.datumvalt(value);
      console.log("Header__monthChanged:  "+value);
    }

    ngOnInit() {
      this.listService.title.subscribe(updatedTitle  => {
        let t_array: Array<string>  = updatedTitle.split(',');
        this.title = t_array[0];
        this.showCalendar = (t_array[1]=="0");
        this.FilterElement.nativeElement.value = "";

        //console.log(this.showCalendar)
      });
    }

    applyFilter(event: Event) {
      this.listService.filtering(event);
    }

    public onToggleSidenav = () => {
      this.sidenavToggle.emit();
    }
}
