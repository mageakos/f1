import {
  CommonModule,
  HttpClientModule,
  FormsModule,
  ButtonGroupComponent,
  LabelComponent,
  ListComponent,
  DetailsComponent,
  NgModule,
  LoaderComponent
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
    DetailsComponent,
    LoaderComponent
  ],
  declarations: [
    ButtonGroupComponent,
    LabelComponent,
    ListComponent,
    DetailsComponent,
    LoaderComponent
  ]
})
export class CoreModule {}
