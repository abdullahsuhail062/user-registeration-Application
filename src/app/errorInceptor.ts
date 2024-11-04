import { HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest, } from "@angular/common/http"
import { catchError, Observable, throwError } from "rxjs"


 
export function errorInceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>>{

 const url = req.url
 const body = req.body
 console.log(url);
 
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
      // if (error.status ===500){
      //   const serverInternalError = error.message
      //   console.log(serverInternalError);
        
      //   return throwError(()=> new Error(serverInternalError))
      // }
     
      
                
      
           
    return throwError(()=> new Error(error.error))
}