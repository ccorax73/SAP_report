import { Injectable,EventEmitter,Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Open_po,Open_so,Invoice, Incoming,Stock } from './db_interface';
import { BehaviorSubject, Observable} from 'rxjs';

//https://devooti.com/angular-crud-operations-with-php-and-mysql/

export interface headeroptions{
    settitle:string;
    showCalendar: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class ListerService {



  constructor(public http: HttpClient) { }
    // update query baseURL
    baseUrl: string = 'http://xxxx/query/';
    tol: string = undefined;
    ig: string = undefined;
    title = new BehaviorSubject({settitle:'SAP reports', showCalendar:true});


    setTitle(paramtitle: headeroptions){      
     this.title.next(paramtitle);
    }

    getOpenPO() {
      this.setTitle ({settitle:"Open production orders", showCalendar:false});
      return this.http.get<Open_po[]>(this.baseUrl+'query_open_po.php');
    }

    getStock() {
      this.setTitle ({settitle:"Stock", showCalendar:false});
      return this.http.get<Stock[]>(this.baseUrl+'query_stock.php');
    }

    getOpenSO() {
      this.setTitle ({settitle:"Open sales orders", showCalendar:false});
      return this.http.get<Open_so[]>(this.baseUrl+'query_open_saleso.php');
    }

    getInvoice(): Observable<Invoice[]> {
      this.setTitle ({settitle:"Invoices", showCalendar:true});
      let sqlstring: string  = (!this.tol)?this.baseUrl+'query_invoice.php':this.baseUrl+'query_invoice.php?tol='+this.tol+'&ig='+this.ig;
      console.log("getinvoice ->" + sqlstring);

      return this.http.get<Invoice[]>(sqlstring);
    }

    getIncoming(): Observable<Incoming[]> {
      this.setTitle ({settitle:"Incoming deliveries", showCalendar:true});
      let sqlstring: string  = (!this.tol)?this.baseUrl+'query_incoming.php':this.baseUrl+'query_incoming.php?tol='+this.tol+'&ig='+this.ig;
      return this.http.get<Incoming[]>(sqlstring);
    }


    public wo_zero( szam: string){
      return szam.replace(/^0+/, '');
    }

    public datumpont( datum: string){
      return(datum.length ==8)?  datum.substring(0,4)+'.'+datum.substring(4,6)+'.'+datum.substring(6,8): datum;
      }


    @Output() aFilterEvent = new EventEmitter<Event>();
    @Output() aDatumvalt = new EventEmitter<Date>();

    datumvalt(d: Date) {
      let dat_eleje:string =d.getFullYear()+String(d.getMonth()+1).padStart(2, '0');
      let lastday:Date = new Date(d.getFullYear(), d.getMonth() + 1, 0);
      this.tol = dat_eleje+"01";
      this.ig = dat_eleje+lastday.getDate();
      this.aDatumvalt.emit(d);
    };




  filtering(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.aFilterEvent.emit(event);
  };
}
