import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CMSRoutingModule } from './cms-routing.module';
import { TasksComponent } from './pages/tasks/tasks.component';
import { GridComponent } from './pages/grid/grid.component';
import { LayoutComponent } from './component/layout/layout.component';


@NgModule({
  declarations: [
    TasksComponent,
    GridComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    CMSRoutingModule
  ]
})
export class CMSModule { }
