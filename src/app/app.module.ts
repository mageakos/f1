import {
  AppComponent,
  PageNotFoundComponent,
  BrowserModule,
  DriversModule,
  AppRoutingModule,
  FormsModule,
  NgModule,
} from './index';

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent ],
  imports: [BrowserModule, DriversModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
