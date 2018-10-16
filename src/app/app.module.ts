import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { BookmarkComponent } from "./bookmark/bookmark.component";
import { BookmarkListComponent } from "./bookmark-list/bookmark-list.component";
import { HttpClientModule } from "@angular/common/http";
import { SubmitPageComponent } from "./submit-page/submit-page.component";
import { AppRoutingModule } from "./app-routing.module";
import { NavbarComponent } from "./navbar/navbar.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

// Importing the required components from Angular Material
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import {MatCardModule} from '@angular/material/card';
import { ErrorComponent } from './error/error.component';


@NgModule({
  declarations: [
    AppComponent,
    BookmarkComponent,
    BookmarkListComponent,
    SubmitPageComponent,
    NavbarComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    [
      MatToolbarModule,
      MatButtonModule,
      MatIconModule,
      MatSnackBarModule,
      MatFormFieldModule,
      MatInputModule,
      MatProgressBarModule,
      MatCardModule
    ]
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
