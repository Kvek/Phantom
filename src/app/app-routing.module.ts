import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SubmitPageComponent } from "./submit-page/submit-page.component";
import { AppComponent } from "./app.component";
import { BookmarkComponent } from "./bookmark/bookmark.component";

const routes: Routes = [
  { path: "", component: BookmarkComponent },
  { path: "thanks", component: SubmitPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
