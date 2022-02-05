import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselComponent } from './carousel/carousel.component';
import { HttpClientModule} from '@angular/common/http';
import { MutualfundsComponent } from './mutualfunds/mutualfunds.component';
import { InvestmentsComponent } from './investments/investments.component';
import { HomeComponent } from './home/home.component'
import {MatCardModule} from '@angular/material/card';
import { MatTableModule} from '@angular/material/table'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MutualfundComponent } from './mutualfund/mutualfund.component';



@NgModule({
  declarations: [
    AppComponent,
    CarouselComponent,
    MutualfundsComponent,
    InvestmentsComponent,
    HomeComponent,
    MutualfundComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    HttpClientModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
