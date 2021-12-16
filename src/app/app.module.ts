import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { AppComponent } from './app.component';
import { BuildTimeParametersComponent } from './components/build-time-parameters/build-time-parameters.component';
import { GameTimeParametersComponent } from './components/game-time-parameters/game-time-parameters.component';

@NgModule({
  declarations: [
    AppComponent,
    BuildTimeParametersComponent,
    GameTimeParametersComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DropdownModule,
    NgbModule,
    ReactiveFormsModule,
    ButtonModule,
    TableModule,
    ToastModule
  ],
  providers: [
    MessageService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }