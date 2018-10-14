import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { throwError, Subject } from "rxjs";
import { catchError } from "rxjs/operators";
import { BehaviorSubject } from "rxjs";
@Injectable({
  providedIn: "root"
})
export class BookmarkValidService {
  constructor(private http: HttpClient) {}

  bookmark: Subject<string> = new Subject();
  currentBookmark = this.bookmark.asObservable();

  // editBookMark: Subject<string> = new Subject();
  // currEditableBM = this.editBookMark.asObservable();

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError("Something bad happened; please try again later.");
  }
  isValid(bookmark) {
    return this.http
      .get(bookmark, {
        observe: "response",
        responseType: "text"
      })
      .pipe(catchError(this.handleError));
  }

  addBookMark2List(validBookmark: string) {
    this.bookmark.next(validBookmark);
  }

  // updateBookMark(bookmark) {
  //   return this.editBookMark.next(bookmark);
  // }
}
