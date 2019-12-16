import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { DriversModule } from "./drivers/drivers.module";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent],
  imports: [BrowserModule, DriversModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
