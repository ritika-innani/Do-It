import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthenticateService {
    domain = "http://localhost:8000";
    authToken;
    user;
    options;

    constructor( private http: Http ) {
    }

    createAuthenticationHeaders(){
        this.loadToken();
        this.options = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json',
                'authorization': this.authToken
            })
        })
    }

    loadToken(){
        this.authToken = localStorage.getItem('token');
    }

    // function to register new user
    registerUser(user) {
        return this.http.post(this.domain + '/api/user', user).map(res => res.json());
    }

    // Function to login user
    login(user) {
        return this.http.post(this.domain + '/api/authenticate', user).map(res => res.json());
    }

    //function to logout
    logout(){
        this.authToken = null;
        this.user = null;
        localStorage.clear();
    }

    // function to get user data
    getProfile(){
        this.createAuthenticationHeaders();
        return this.http.get(this.domain + '/api/user', this.options).map(res => res.json());
    }

    updateProfile(user){
      this.createAuthenticationHeaders();
      return this.http.put(this.domain + '/api/user',user, this.options).map(res => res.json());
    }

    getAllUsers(company){
      this.createAuthenticationHeaders();
      return this.http.get(this.domain + '/api/user/' + company,this.options).map(res => res.json());
    }

    storeUserData(token, user){
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        this.authToken = token;
        this.user = user;
    }

    loggedIn(){
            return tokenNotExpired();
    }

}
