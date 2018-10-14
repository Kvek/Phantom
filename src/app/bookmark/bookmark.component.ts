import { Component, OnInit, Output, OnChanges } from "@angular/core";
import { Validators, FormGroup, FormControl } from "@angular/forms";
import { BookmarkValidService } from "../bookmark-valid.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-bookmark",
  templateUrl: "./bookmark.component.html",
  styleUrls: ["./bookmark.component.css"]
})
export class BookmarkComponent implements OnInit {
  constructor(
    private bookMarkServ: BookmarkValidService,
    private router: Router
  ) {}
  bookmarks: FormGroup;
  bookmark: FormControl;
  error;
  ngOnInit() {
    this.createFormControl();
    this.createForm();
  }

  createFormControl() {
    this.bookmark = new FormControl("", [
      Validators.required,
      Validators.pattern(/((https?|ftp):\/\/)?(\w+\.)?[\-]?(\w+\.\w+)(.+)?/)
      // other possible patterns
      // ((https?|ftp):\/\/)?(\w+\.)?[\-]?(\w+\.\w+)(.+)?
      // (https?:\/\/)?((\w{3})+\.)?(\w+\.\w+(\/(.+))?)
      // (((https?|ftp):\/\/))?(\w+)?([\.:-@_]+\w+)+?(.+)?
    ]);
  }
  createForm() {
    this.bookmarks = new FormGroup({
      bookmark: this.bookmark
    });
  }

  onSubmit() {
    this.bookMarkServ.isValid(this.bookmarks.value.bookmark).subscribe(
      data => {
        if (data.status == 200) {
          this.router.navigate(["/thanks"]);
          console.log("BookMark Valid");
          this.bookMarkServ.addBookMark2List(this.bookmarks.value.bookmark);
        } else if (data.status != 200) {
          // TODO:Create Custom Error
          console.log("BookMark Invalid");
        }
      },
      error => {
        this.error = error;
        console.log("error");
      }
    );
  }
}
