import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material';
import { Subscription } from 'rxjs';
import { Post} from '../post.model';
import { PostsService} from '../posts.service';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit, OnDestroy {

posts: Post[] = [];
isLoading = false;
totalPosts = 10;
postsPerPage = 2;
pageSizeOptions = [1, 2, 5, 10];
private postSub: Subscription;



constructor (public postsService: PostsService) {}

ngOnInit() {
  this.isLoading = true;
  this.postsService.getPosts();
  this.postSub = this.postsService.getPostUpdateListener()
  .subscribe((posts: Post[]) => {
    this.isLoading = false;
    this.posts = posts;
  });
}

onChangedPage(pageData: PageEvent) {

}

onDelete(postId: string) {
  this.postsService.deletePost(postId);
}

ngOnDestroy() {
  this.postSub.unsubscribe();
}

}
