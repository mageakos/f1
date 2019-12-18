import {
  CommonModule,
  HttpClientModule,
  FormsModule,
  ButtonGroupComponent,
  LabelComponent,
  ListComponent,
  DetailsComponent,
  NgModule
} from './index';

@NgModule({
  imports: [CommonModule, FormsModule, HttpClientModule],
  exports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ButtonGroupComponent,
    LabelComponent,
    ListComponent,
    DetailsComponent
  ],
  declarations: [
    ButtonGroupComponent,
    LabelComponent,
    ListComponent,
    DetailsComponent
  ]
})
export class CoreModule {}
