import {Component, OnInit, ViewChild} from '@angular/core';
import { AppService } from "./app.service";
import { NgForm } from "@angular/forms";
import { Post } from "./app.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('postForm') postForm!: NgForm;
  loadedPosts = [];
  isFetching = false;
  error = null;

  constructor(private appService: AppService) {}

  ngOnInit() {
    this.onFetchPosts();
  }

  onCreatePost(postData: Post) {
    this.appService.createPost(postData).subscribe((r) => {
      this.clearFields()
      this.onFetchPosts();
    })
  }

  clearFields() {
    this.postForm.setValue({
      title: '',
      content: ''
    })
  }

  onFetchPosts() {
    this.isFetching = true;
    this.appService.fetchPosts().subscribe((posts: Post[]) => {
      this.loadedPosts = posts;
      this.isFetching = false;
      this.error = null;
    }, error => {
      this.error = error.message;
    })
  }

  onClearPosts() {
    this.appService.deletePosts().subscribe((r) => {
      this.onFetchPosts();
    })
  }
}
