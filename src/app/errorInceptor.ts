import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest, } from "@angular/common/http"
import { catchError, Observable, throwError } from "rxjs"

 
export function errorInceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>>{
    return next(req).pipe(catchError(handleError))
  
  }
  
function  handleError(error: HttpErrorResponse): Observable<never>{
    if (error.status ===400) {
      const errorMessage = error.error.errors
      console.log(errorMessage);
      
      return throwError(()=> (errorMessage))}
      if (error.error instanceof ErrorEvent){
          console.log('client side error', error.error);
          
      }
     
      
                
      
           
    return throwError(()=> new Error(error.error))
}