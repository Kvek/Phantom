import { Component, OnInit } from "@angular/core";
import { BookmarkValidService } from "../bookmark-valid.service";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-bookmark-list",
  templateUrl: "./bookmark-list.component.html",
  styleUrls: ["./bookmark-list.component.css"]
})
export class BookmarkListComponent implements OnInit {
  bookMarkList = [];
  editBM: boolean = false;
  currEditBM: string;
  duplicate = false;
  currBMView = [];
  pages = [];
  currentpage;
  currentStyle;

  constructor(
    private bookMarkServ: BookmarkValidService,
    private snackbar: MatSnackBar
  ) { }
  ngOnInit() {
    // generate a random css class
    this.currentStyle = Math.floor(Math.random() * (6 - 1)) + 1;
    this.populateArr();
    this.pageNumber();
    // Set firstpage active on page load.
    this.activePage(1);
    this.getData();
  }
  // Populate 'bookMarkList' on page load
  populateArr() {
    let data = localStorage.getItem("bookMarks");
    if (data != null) {
      this.bookMarkList = JSON.parse(data);
    } else if (data == null) {
      this.bookMarkList.length = 0;
    }
  }
  // Calculate number of pages.
  pageNumber() {
    let numberOfPages = Math.ceil(this.bookMarkList.length / 20);
    for (let i = 0; i < numberOfPages; i++) {
      this.pages.push(i + 1);
    }
    return this.pages;
  }

  // Subscribe to observable to receive bookmark
  getData() {
    this.bookMarkServ.currentBookmark.subscribe(data => {
      this.bookMarkList.push(data);
      localStorage.setItem("bookMarks", JSON.stringify(this.bookMarkList));
    });
  }

  // Remove bookmark from list
  removeBookMark(bookMark) {
    let conf = confirm("Are you sure?");
    if (conf == true) {
      this.bookMarkList.splice(bookMark, 1);
      localStorage.setItem("bookMarks", JSON.stringify(this.bookMarkList));
      // Angular Material Notification Component
      this.snackbar.open("Deleted", "Dismiss", {
        duration: 2000
      });
    } else return;
  }

  // Edit bookmark
  editBookMark(bookMark) {
    this.editBM = true;
    // sets edit to current bookmark
    this.currEditBM = this.bookMarkList[bookMark];
  }

  // Update bookmark
  updateBM(index, bookmark) {
    this.bookMarkList[index].bookmark = bookmark;

    // Angular Material Notification Component
    this.snackbar.open("Updated", "Dismiss", {
      duration: 2000
    });
    // resetting value to hide
    this.currEditBM = null;
    localStorage.setItem("bookMarks", JSON.stringify(this.bookMarkList));
  }

  // Activating the page on click
  activePage(page) {
    this.currentpage = page;
    this.currBMView = this.bookMarkList;
    this.currBMView = this.bookMarkList.slice((page - 1) * 20, page * 20);
  }

  deleteAll() {
    let conf = confirm("Are you sure you want to remove all Bookmarks?");
    if (conf == true) {
      this.bookMarkList.length = 0;
      localStorage.setItem("bookMarks", JSON.stringify(this.bookMarkList));
      // Angular Material Notification Component
      this.snackbar.open("Deleted", "Dismiss", {
        duration: 2000
      });
    } else return;
  }
}
