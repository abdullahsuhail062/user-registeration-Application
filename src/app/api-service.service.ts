import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from './environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';




@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  private apiUrl = environment.apiUrl

  constructor(private http: HttpClient, private authService: AuthService) {}
    

  registerUser(formData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/registerUser`,formData,{responseType: 'json'})
}
  loginUser(formData: any): Observable<any>{
    return this.http.post(`${this.apiUrl}/api/loginUser`, formData,{responseType: 'json'})
  }

  fetchUserProfile(): Observable<any>{
    const token = this.authService.getToken()
    return this.http.get(`${this.apiUrl}/api/fetchUserProfile`,{responseType: 'json',headers: { 'Authorization': `Bearer ${token}`}}
    )
  }
  deleteAccount(): Observable<any> {
    const token = this.authService.getToken()
    return this.http.delete(`${this.apiUrl}/api/deleteAccount`,{headers: { 'Authorization': `Bearer ${token}`}});
  }

  addTask(title:any,description: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/tasks`, { description,title });
}

saveTask(title:any,description: any, taskId: string): Observable<any>{
  return this.http.put(`${this.apiUrl}/api/updateTask/${taskId}`, { description,title});

}
deleteTask(taskName: string): Observable<any> {
  return this.http.delete(`${this.apiUrl}/api/deleteTask`, {
    params: { taskName },
  });
}


}
 


  

