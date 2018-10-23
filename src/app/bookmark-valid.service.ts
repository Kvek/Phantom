import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { throwError, Subject } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class BookmarkValidService {
  constructor(private http: HttpClient) { }

  bookmark: Subject<{}> = new Subject();
  currentBookmark = this.bookmark.asObservable();

  private handleError(error: HttpErrorResponse) {
    // return an observable with a user-facing error message
    return throwError("Something bad happened; please try again later.");
  }
  isValid(bookmark) {
    return this.http
      // "https://cors-anywhere.herokuapp.com/" temporary hack to remove CORS problem
      .get("https://cors-anywhere.herokuapp.com/" + bookmark, {
        observe: "response",
        responseType: "text"
      })
      .pipe(catchError(this.handleError));
  }

  // addBookMark2List(validBookmark: string,) {
  addBookMark2List(validBookmark) {
    this.bookmark.next(validBookmark);
  }


}
