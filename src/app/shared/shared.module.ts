import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './components/list/list.component';
import { DetailsComponent } from './components/details/details.component';
import { LoaderComponent } from './components/loader/loader.component';
import { LabelComponent } from './components/label/label.component';
import { ButtonGroupComponent } from './components/button-group/button-group.component';
import { FormsModule } from '@angular/forms';
import { GridService } from './services/grid/grid.service';

@NgModule({
  declarations: [
    ListComponent,
    DetailsComponent,
    LoaderComponent,
    LabelComponent,
    LoaderComponent,
    ButtonGroupComponent,
  ],
  imports: [
    // vendor
    CommonModule,
    RouterModule,
    FormsModule,

    // other
  ],
  exports: [
    // vendor
    CommonModule,
    RouterModule,
    FormsModule,

    // local
    ListComponent,
    DetailsComponent,
    LoaderComponent,
    LabelComponent,
    LoaderComponent,
    ButtonGroupComponent,
  ],
  providers: [GridService],
})
export class SharedModule {}
