import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { InputNumberValidatorDirective } from './shared/input-number-validator-directive'

import { AppComponent } from './app.component';
import { ResumeComponent } from './resume/resume.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ResumeMainComponent } from './resumeMain/resume-main.component';

@NgModule({
  declarations: [
    AppComponent,
    ResumeComponent,
    InputNumberValidatorDirective,
    ResumeMainComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
