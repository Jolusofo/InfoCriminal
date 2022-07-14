import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DefaultComponent } from "./default.component";
import { DashboardComponent } from "src/app/modules/dashboard/dashboard.component";
import { RouterModule } from "@angular/router";
import { MapComponent } from "src/app/modules/map/map.component";
import { SharedModule } from "src/app/shared/shared.module";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatDividerModule} from "@angular/material/divider";
import {MatCardModule} from "@angular/material/card";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import { FlexLayoutModule } from "@angular/flex-layout";
import { DashboardService } from "src/app/modules/dashboard.service";
import { LeafletModule } from "@asymmetrik/ngx-leaflet";
import { DetailsComponent } from "../../modules/details/details.component";
@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    MapComponent,
    DetailsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MatDividerModule,
    FlexLayoutModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    LeafletModule,
  ],
  providers: [DashboardService],
})
export class DefaultModule {}
