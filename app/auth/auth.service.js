"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Observable_1 = require('rxjs/Observable');
var router_1 = require("@angular/router");
require('rxjs/add/operator/catch');
require('rxjs/add/operator/do');
require('rxjs/add/operator/map');
require('rxjs/add/observable/throw');
var AuthService = (function () {
    function AuthService(_http, _router) {
        this._http = _http;
        this._router = _router;
        this.loggedIn = false;
        this.actionUrl = "http://127.0.0.1:8000/api/auth/";
        this.headers = new http_1.Headers();
        this.headers.append('Content-Type', 'application/json');
        this.loggedIn = !!window.localStorage.getItem('auth_token');
    }
    AuthService.prototype.loginUser = function (username, password) {
        var _this = this;
        return this._http.post((this.actionUrl + "login/"), JSON.stringify({ username: username, password: password }), { headers: this.headers })
            .map(function (res) {
            if (res.json().auth_token) {
                window.localStorage.setItem('auth_token', res.json().auth_token);
                _this.loggedIn = true;
                return res.json().auth_token;
            }
        })
            .do(function (data) { return console.log('All: ' + JSON.stringify(data)); })
            .catch(this.handleError);
    };
    AuthService.prototype.registerUser = function (username, password) {
        return this._http.post((this.actionUrl + "register/"), JSON.stringify({ username: username, password: password }), { headers: this.headers })
            .map(function (res) {
            return res.json().username;
        })
            .do(function (data) { return console.log('All: ' + JSON.stringify(data)); })
            .catch(this.handleError);
    };
    AuthService.prototype.logoutUser = function () {
        window.localStorage.removeItem('auth_token');
        this.loggedIn = false;
        this._router.navigate(['/auth']);
    };
    AuthService.prototype.isLoggedIn = function () {
        return this.loggedIn;
    };
    AuthService.prototype.handleError = function (error) {
        console.error(error.json());
        return Observable_1.Observable.throw(error.json() || 'Server error');
    };
    AuthService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, router_1.Router])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map