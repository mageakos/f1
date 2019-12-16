import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

import { ButtonGroupComponent } from "./widgets/button-group/button-group.component";
import { LabelComponent } from "./widgets/label/label.component";

import { ListComponent } from "./components/list/list.component";
import { DetailsComponent } from "./components/details/details.component";

@NgModule({
  imports: [CommonModule, FormsModule, HttpClientModule],
  exports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ButtonGroupComponent,
    LabelComponent,
    ListComponent
  ],
  declarations: [
    ButtonGroupComponent,
    LabelComponent,
    ListComponent,
    DetailsComponent
  ],

})
export class CoreModule {}
