import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {Post} from './post.model';
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";


@Injectable({
  providedIn: 'root',
})
export class PostService {
  private postsChanged = new Subject<{posts: Post[], postCount: number}>();
  private posts: Post[] = []
  postIsLoading = new Subject<boolean>();

  constructor(private httpClient: HttpClient,
              private router: Router) {}

  getPost(postId: string | null) {
    return this.httpClient.get<{message: string, post: Post}>(environment.apiUrl + 'posts/' + postId);
  }

  getPosts(pageIndex: number, pageSize: number) {
    // Backticks indicate that it is a template literal.
    const queryParams = `?pageIndex=${pageIndex}&pageSize=${pageSize}`;
    this.httpClient
        .get<{message: string, posts: Post[], maxPosts: number}>(environment.apiUrl + 'posts' + queryParams)
        .pipe(map((postData) => {
          return { posts: postData.posts.map((post: Post) => {
            return {
              ...post,
              _id: post._id.toString(),
            };
          }), maxPosts: postData.maxPosts };
        }))
        .subscribe((transformedPosts) => {
          this.posts = transformedPosts.posts;
          this.postsChanged.next({posts: [...this.posts], postCount: transformedPosts.maxPosts});
        });
  }

  createPost(post: Post, image: File) {
    this.postIsLoading.next(true);
    const postData = new FormData();
    postData.append('title', post.title);
    postData.append('content', post.content);
    postData.append('image', image, post.title);
    this.httpClient
      .post<{message: string, post: Post}>(environment.apiUrl + 'posts', postData)
      .subscribe((responseData) => {
        setTimeout(() => {
          this.postIsLoading.next(false);
          this.router.navigate(['/posts']);
        }, 1200)
      });
  }

  updatePost(post: Post) {
    let newPost: Post = {title: post.title, content: post.content, _id: post._id, imagePath: post.imagePath}
    let postData: Post | FormData;
    if (typeof(post.imagePath) === 'object') {
      postData = new FormData();
      postData.append('title', post.title);
      postData.append('content', post.content);
      postData.append('image', post.imagePath, post.title);
    } else {
      postData = newPost;
    }
    this.httpClient.patch<{message: string}>(environment.apiUrl + 'posts/' + post._id, postData)
      .subscribe((responseData) => {
        this.router.navigate(['/posts']);
      })
  }

  deletePost(postId: string) {
    return this.httpClient.delete(environment.apiUrl + 'posts/' + postId);
  }

  getPostChangedListener() {
    return this.postsChanged.asObservable();
  }
}
