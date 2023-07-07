import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  //login
  public login(user: any){
    // return this.http.post('http://localhost:8081/api/v1.0/moviebooking/login',user)
    return this.http.post('http://movieappbookingbackend-env.eba-ts7ck2fh.ap-south-1.elasticbeanstalk.com/api/v1.0/moviebooking/login',user)
  }

  //Storing token to local
  public saveToken(token: any){
    sessionStorage.setItem('token',token);
    return true;
  }
  //check user login token
  public checkToken(){
    let tokenStr=sessionStorage.getItem("token")
    if(tokenStr == null|| tokenStr == ''|| tokenStr == undefined){
      return false;
    }else{
      return true;
    }
  }
  //logout : clear token
  public logout(){
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("username")
    sessionStorage.removeItem("userRole")
    sessionStorage.removeItem("movieToBook")
    sessionStorage.removeItem("movieName")
    sessionStorage.removeItem("seat")
    sessionStorage.removeItem("seatNumber")
    sessionStorage.removeItem("role")
    return true;
  }
  //get token
  public getToken(){
    return sessionStorage.getItem('token');
  }

  //set user to local
  public setUsername(username:any){
    sessionStorage.setItem('username',username);
  }
  //set _id
  public setId(id:any){
    sessionStorage.setItem('_id',id);
  }
  //set user role to local
  public setRole(role:string){
    sessionStorage.setItem('role',role.substring(5).toLowerCase())
  }
  //get user
  public getUsername(){
    let userStr = sessionStorage.getItem("username");
    if(userStr != null){
      return userStr;
    }
    else{
      this.logout();
      return null;
    }
  }
  //get user role
  public getRole(){
    return sessionStorage.getItem("role");
  }
  //check user is logged in
  public userLoggedIn(){
    if(this.getRole() == "user" && this.checkToken() && this.getUsername() != null ){
        return true;
    }
    return false;
  }
  //check admin is logged in
  public adminLoggedIn(){
    if(this.getRole() == "admin" && this.checkToken() && this.getUsername() != null ){
        return true;
    }
    return false;
  }
}