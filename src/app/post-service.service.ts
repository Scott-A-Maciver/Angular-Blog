import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogPost } from './BlogPost';

var perPage = 6;

@Injectable({
  providedIn: 'root'
})

export class PostService {

  constructor(private http: HttpClient) { }

  getPosts(page, tag, category): Observable<BlogPost[]>{
    let url = `https://smaciver1-web422blogapi.herokuapp.com/api/posts?page=${page}&perPage=${perPage}`;
    if(tag != null && tag != undefined){
      //let tagTmp = tag.slice(1, tag.length);
      url = url + `&tag=${tag}`;
    }
    if(category != null && category != undefined){
      url = url + `&category=${category}`
    }
    console.log(url);
    return this.http.get<BlogPost[]>(url); 
  }

  getPostbyId(id): Observable<BlogPost>{
    console.log(id);
    return this.http.get<BlogPost>(`https://smaciver1-web422blogapi.herokuapp.com/api/posts/${id}`);
  }

  getCategories(): Observable<any>{
    return this.http.get<any>(`https://smaciver1-web422blogapi.herokuapp.com/api/categories`);
  }

  getTags(): Observable<string[]>{
    return this.http.get<string[]>(`https://smaciver1-web422blogapi.herokuapp.com/api/tags`);
  }

  getAllPosts():Observable<BlogPost[]>{
    return this.http.get<BlogPost[]>(`https://smaciver1-web422blogapi.herokuapp.com/api/posts?page=1&perPage=${Number.MAX_SAFE_INTEGER}`);
  }

  newPost(data:BlogPost):Observable<any>{
    return this.http.post<any>(`https://smaciver1-web422blogapi.herokuapp.com/api/posts`, data);
  }

  updatePostById(id:string, data: BlogPost):Observable<any>{
    return this.http.put(`https://smaciver1-web422blogapi.herokuapp.com/api/posts/${id}`, data);
  }

  deletePostById(id:string):Observable<any>{
    return this.http.delete<any>(`https://smaciver1-web422blogapi.herokuapp.com/api/posts/${id}`);
  }
}
