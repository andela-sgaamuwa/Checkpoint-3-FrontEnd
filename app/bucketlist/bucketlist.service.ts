import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { Bucketlist, Item, Result } from './bucketlist';

@Injectable()
export class BucketlistService {
    private actionUrl: string; 
    private headers: Headers;
    private token = window.localStorage.getItem('auth_token');

    constructor(private _http: Http){
        this.actionUrl = "https://ebyokola.herokuapp.com/api/";
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Authorization', 'Token ' + this.token);
    }

    getBucketlists(): Observable<Result> {
        return this._http.get(this.actionUrl+"bucketlists/", {headers: this.headers})
            .map((response: Response) => <Result>response.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getPage(pageUrl: string): Observable<Result> {
        return this._http.get(pageUrl, {headers: this.headers})
            .map((response: Response) => <Result>response.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getOneBucketlist(bucketlistId: number): Observable<Bucketlist>{
        return this._http.get(
                    this.actionUrl+"bucketlists/"+bucketlistId,
                    {headers: this.headers})
                .map((response) => response.json())
                .do(response => console.log('All: ' + JSON.stringify(response)))
                .catch(this.handleError);
    }

    updateBucketlist(name: string, bucketlistId: number): Observable<Bucketlist>{
        return this._http.put(
                    this.actionUrl+"bucketlists/"+bucketlistId,
                    JSON.stringify({ name }),
                    {headers: this.headers})
                .map((response) => response.json())
                .do(response => console.log('All: ' + JSON.stringify(response)))
                .catch(this.handleError);
    }

    createBucketlist(name: string): Observable<Bucketlist>{
        return this._http.post(
                    this.actionUrl+"bucketlists/",
                    JSON.stringify({ name }),
                    {headers: this.headers})
                .map((response) => response.json())
                .do(response => console.log('All: ' + JSON.stringify(response)))
                .catch(this.handleError);
    }

    deleteBucketlist(bucketlistId: number){
        return this._http.delete(
                    this.actionUrl+"bucketlists/"+bucketlistId,
                    {headers: this.headers})
                .map((response) => response.status)
                .do(response => console.log('All: ' + JSON.stringify(response)))
                .catch(this.handleError);
        
    }

    updateBucketlistItem(name: string, bucketlistId: number, itemId: number): Observable<Item>{
        return this._http.patch(
                    this.actionUrl+"bucketlists/"+bucketlistId+"/items/"+itemId,
                    JSON.stringify({ name }),
                    {headers: this.headers})
                .map((response) => response.json())
                .do(response => console.log('All: ' + JSON.stringify(response)))
                .catch(this.handleError);
    }

    updateBucketlistItemDone(done: boolean, bucketlistId: number, itemId: number): Observable<Item>{
        return this._http.patch(
                    this.actionUrl+"bucketlists/"+bucketlistId+"/items/"+itemId,
                    JSON.stringify({ done }),
                    {headers: this.headers})
                .map((response) => response.json())
                .do(response => console.log('All: ' + JSON.stringify(response)))
                .catch(this.handleError);
    }

    createBucketlistItem(bucketlistId: number, name: string): Observable<Item>{
        return this._http.post(
                    this.actionUrl+"bucketlists/"+bucketlistId+"/items/",
                    JSON.stringify({ name }),
                    {headers: this.headers})
                .map((response) => response.json())
                .do(response => console.log('All: ' + JSON.stringify(response)))
                .catch(this.handleError);
    }

    deleteBucketlistItem(bucketlistId: number, itemId: number){
        return this._http.delete(
                    this.actionUrl+"bucketlists/"+bucketlistId+"/items/"+itemId,
                    {headers: this.headers})
                .map((response) => response.status)
                .do(response => console.log('All: ' + JSON.stringify(response)))
                .catch(this.handleError);
    }

    private handleError(error: Response){
        console.error(error.json());
        return Observable.throw(error.json() || 'Server error');
    }
}