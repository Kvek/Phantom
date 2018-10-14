import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { BookmarkComponent } from "./bookmark/bookmark.component";
import { BookmarkListComponent } from "./bookmark-list/bookmark-list.component";
import { HttpClientModule } from "@angular/common/http";
import { SubmitPageComponent } from "./submit-page/submit-page.component";
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    BookmarkComponent,
    BookmarkListComponent,
    SubmitPageComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
