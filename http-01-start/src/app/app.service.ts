import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import {Post} from "./app.model";

@Injectable({
  providedIn: "root"
})
export class AppService {

  constructor(private http: HttpClient) {
  }

  createPost(postData: { title: string; content: string }) {
    return this.http.post<{name: string}>("https://ng-http-95cbd-default-rtdb.firebaseio.com/post.json", postData);
  }

  fetchPosts() {
    return this.http.get<{[k:string]: Post}>("https://ng-http-95cbd-default-rtdb.firebaseio.com/post.json").pipe(map(
      (responseData) => {
          const posts = [];
          for (let key in responseData) {
            if(responseData.hasOwnProperty(key)) {
              posts.push({ ...responseData[key], id: key })
            }
          }
          return posts;
      }
    ));
  }

  deletePosts() {
    return this.http.delete("https://ng-http-95cbd-default-rtdb.firebaseio.com/post.json");
  }

}
