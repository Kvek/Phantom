import { Component, OnInit } from "@angular/core";
import { BookmarkValidService } from "../bookmark-valid.service";
@Component({
  selector: "app-submit-page",
  templateUrl: "./submit-page.component.html",
  styleUrls: ["./submit-page.component.css"]
})
export class SubmitPageComponent implements OnInit {
  constructor(private bmService: BookmarkValidService) {}
  mydata;

  ngOnInit() {
    this.bmService.currentBookmark.subscribe(data => (this.mydata = data));
  }
}
