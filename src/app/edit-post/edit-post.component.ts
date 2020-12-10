import { Component, OnInit } from '@angular/core';
import { BlogPost } from '../BlogPost';
import { PostService } from '../post-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  blogPost:BlogPost;
  tags:string;
  querySub:any;
  constructor(private data:PostService, private route:Router, private activRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let id = this.activRoute.snapshot.params['id'];
    this.querySub = this.data.getPostbyId(id).subscribe(data=>{
      this.blogPost = data;
      this.tags = this.blogPost.tags.toString();
    });
  }
    
    formSubmit(){
      this.blogPost.tags = this.tags.split(',').map(tag=>tag.trim());
      this.data.updatePostById(this.blogPost._id, this.blogPost).subscribe(()=>{
      this.route.navigate(['admin']);
      });
    }

    deltePost(){
      this.data.deletePostById(this.blogPost._id).subscribe(()=>{
      this.route.navigate(['admin']);
    })
    }

}
