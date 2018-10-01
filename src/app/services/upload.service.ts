import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable, Subject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { of } from 'rxjs';
import { User } from '../models/user';
import { GLOBAL } from './global';

@Injectable()
export class UploadService{
	public url: string;
	public session;
	public token;

	constructor(
		private _http: Http
	){
		this.url = GLOBAL.url;
	}

	makeFileRequest(url:string, params:Array<string>, files: Array<File>, token: string, name:string){
		return new Promise((resolve, reject) => {
	        let formData: any = new FormData()
	        let xhr = new XMLHttpRequest()
	        for (let file of files) {
	            formData.append(name, file, file.name);
	        }
	        xhr.onreadystatechange = function () {
	            if (xhr.readyState === 4) {
	                if (xhr.status === 200) {
	                    resolve(JSON.parse(xhr.response));
	                } else {
	                    reject(xhr.response);
	                }
	            }
	        }
	        xhr.open("POST", url, true);
	        xhr.setRequestHeader('Authorization', token);
	        xhr.send(formData);
	    });
	}
}