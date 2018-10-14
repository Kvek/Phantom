import { Component, OnInit } from "@angular/core";
import { BookmarkValidService } from "../bookmark-valid.service";

@Component({
  selector: "app-bookmark-list",
  templateUrl: "./bookmark-list.component.html",
  styleUrls: ["./bookmark-list.component.css"]
})
export class BookmarkListComponent implements OnInit {
  bookMarkList: string[] = [];
  editBM: boolean = false;
  currEditBM: string;
  duplicate = false;
  currBMView = [];
  pages = [];
  currentpage;

  // TODO: remove the one2Hundred array
  one2Hundred = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24
  ];

  constructor(private bookMarkServ: BookmarkValidService) {}
  ngOnInit() {
    // On page load retreive data
    let data = localStorage.getItem("bookMarks");
    if (data != null) {
      this.bookMarkList = JSON.parse(data);
    } else {
      this.bookMarkList.length = 0;
    }

    // Calculate number of pages.
    let numberOfPages = Math.ceil(this.one2Hundred.length / 20);
    for (let i = 0; i < numberOfPages; i++) {
      this.pages.push(i + 1);
    }
    // Set firstpage active on page load.
    this.activePage(1);

    // Subscribe to observable to receive bookmark
    this.bookMarkServ.currentBookmark.subscribe(data => {
      console.log(data);
      // Checks for duplicates
      if (this.bookMarkList.indexOf(data) == -1) {
        this.bookMarkList.push(data);
      } else {
        this.duplicate = true;
      }
      localStorage.setItem("bookMarks", JSON.stringify(this.bookMarkList));
    });
  }
  // Remove bookmark from list
  removeBookMark(bookMark) {
    this.bookMarkList.splice(bookMark, 1);
    localStorage.setItem("bookMarks", JSON.stringify(this.bookMarkList));
  }
  // Edit bookmark
  editBookMark(bookMark) {
    this.editBM = true;
    // sets edit to current bookmark
    this.currEditBM = bookMark;
  }
  // Update bookmark
  updateBM(index, bookmark) {
    this.bookMarkList[index] = bookmark.item;
    // resetting value to hide
    this.currEditBM = null;
    localStorage.setItem("bookMarks", JSON.stringify(this.bookMarkList));
  }

  // Activating the page on click
  activePage(page) {
    this.currentpage = page;
    // TODO:remove oneHundred
    // Slices the array into the required size
    this.currBMView = this.one2Hundred.slice((page - 1) * 20, page * 20);
  }
}
