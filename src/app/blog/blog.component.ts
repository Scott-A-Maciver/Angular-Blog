import { Component, OnInit, Input } from '@angular/core';
import { BlogPost } from '../BlogPost';
import { PostService } from '../post-service.service';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostCardComponent } from '../post-card/post-card.component';


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  blogPosts: Array<BlogPost>;
  page: number = 1;
  tag: string = null;
  category: string = null;
  querySub: any;

  constructor(private route: ActivatedRoute, private data: PostService) { }

  ngOnInit(): void {
    this.querySub = this.route.queryParams.subscribe(params =>{
      if(params['tag']){
        this.tag = params['tag'];
        this.category = null;
      }
      else{
        this.tag = null;
      }

      if(params['category']){
        this.category = params['category'];
        this.tag = null;
      }
      else{
        this.category = null;
      }

      this.getPage(+params['page'] || 1);
    })
  }
  getPage(num) {
    this.querySub = this.data.getPosts(num, this.tag, this.category).subscribe(data =>{ 
        if(data.length > 0){  
          this.blogPosts = data;
          this.page = num; 
        }
    });
  }

  ngOnDestroy() {
    if(this.querySub){
     this.querySub.unsubscribe();
    }
  }

}
