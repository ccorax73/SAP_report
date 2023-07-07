import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OpenpoComponent} from './openpo/openpo.component';
import { InvoiceComponent} from './invoice/invoice.component';
import { IncomingComponent} from './incoming/incoming.component';
import { OpensalesoComponent} from './opensaleso/opensaleso.component';
import { StockComponent} from './stock/stock.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'openpo', component: OpenpoComponent },
  { path: 'invoice', component: InvoiceComponent },
  { path: 'incoming', component: IncomingComponent },
  { path: 'openso', component: OpensalesoComponent },
  { path: 'stock', component: StockComponent },  
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: HomeComponent }

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
