import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import {MatSelectModule} from '@angular/material/select';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AreaComponent } from './widgets/area/area.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { CardComponent } from './widgets/card/card.component';
import { PieComponent } from './widgets/pie/pie.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    AreaComponent,
    CardComponent,
    PieComponent
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatMenuModule,
    MatSelectModule,
    MatListModule,
    MatProgressSpinnerModule,
    RouterModule,
    HighchartsChartModule
  ],
  exports: [
    HeaderComponent,
    MatButtonModule,
    FooterComponent,
    SidebarComponent,
    MatSelectModule,
    MatProgressSpinnerModule,
    AreaComponent,
    CardComponent,
    PieComponent
  ]
})
export class SharedModule { }
