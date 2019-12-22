import {
  AppComponent,
  PageNotFoundComponent,
  BrowserModule,
  DriversModule,
  AppRoutingModule,
  FormsModule,
  NgModule,
  CoreModule
} from "./index";

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent],
  imports: [
    BrowserModule,
    CoreModule,
    DriversModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
