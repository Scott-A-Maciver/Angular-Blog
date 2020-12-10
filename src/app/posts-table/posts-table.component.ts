import { Component, OnInit } from '@angular/core';
import { BlogPost } from '../BlogPost';
import { PostService } from '../post-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts-table',
  templateUrl: './posts-table.component.html',
  styleUrls: ['./posts-table.component.css']
})
export class PostsTableComponent implements OnInit {

  blogPosts:Array<BlogPost> = [];
  subQuery:any;
  constructor(private data:PostService, private route:Router) { }

  ngOnInit(): void {
    this.subQuery = this.data.getAllPosts().subscribe(data=>{
      this.blogPosts = data;
    })
  }

  rowClicked(e, id){
    this.route.navigate(['/admin/post', id]);
  }
}
