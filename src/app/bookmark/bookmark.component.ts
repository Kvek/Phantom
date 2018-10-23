import { Component, OnInit } from "@angular/core";
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
  ) { }

  // Form Attributes
  bookmarks: FormGroup;
  bookmark: FormControl;
  favorite: FormControl;

  // Error Attributes
  favorites: boolean = false;
  urlFormatError: boolean = false;
  showURLError: boolean = false;

  // for css
  inputLength = 0;
  showProgress = false;
  currentStyle;
  showFav = false;

  regex = /((https?|ftp):\/\/)?(\w+\.)?[\-]?(\w+\.\w+)(.+)?/;

  ngOnInit() {
    this.createFormControl();
    this.createForm();

    setInterval(() => {
      this.currentStyle = Math.floor(Math.random() * (14 - 1)) + 1;
    }, 5000);
  }

  //check to see if input is pattern Matching.
  checkURL(event) {
    this.inputLength = event.length;
    if (this.regex.test(event)) {
      this.urlFormatError = false;
      return this.urlFormatError;
    } else {
      return (this.urlFormatError = true);
    }
  }

  // Updates/Patches favorite formControl Value
  addFavorite() {
    this.favorites = !this.favorites;
    this.bookmarks.patchValue({
      favorite: this.favorites
    });
  }

  createFormControl() {
    this.bookmark = new FormControl("", [
      Validators.required,
      Validators.pattern(/((https?|ftp):\/\/)?(\w+\.)?[\-]?(\w+\.\w+)(.+)?/)
    ]);
    this.favorite = new FormControl(false);
  }
  createForm() {
    this.bookmarks = new FormGroup({
      bookmark: this.bookmark,
      favorite: this.favorite
    });
  }

  onSubmit() {
    if (this.bookmarks.controls.bookmark.valid) {
      this.showFav = !this.showFav;
      this.showProgress = true;
      console.log(this.bookmarks.controls.bookmark.value);
      this.bookMarkServ
        .isValid(this.bookmarks.controls.bookmark.value)
        .subscribe(
          data => {
            console.log(data);
            if (data.status == 200) {
              this.bookMarkServ.addBookMark2List(this.bookmarks.value);
              this.router.navigate(["/thanks"]);
            } else if (data.status != 200) {
              //
              this.showURLError = true;
            }
          },

          error => {
            // console.error(error);
            this.showURLError = true;
            this.showFav = !this.showFav;
          }
        );
    } else if (this.bookmarks.controls.bookmark.invalid) {
      // Error to indicate incorrect URL format
      this.urlFormatError = true;
    }
  }
}
