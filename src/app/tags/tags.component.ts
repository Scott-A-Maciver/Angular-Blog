import { Component, OnInit } from '@angular/core';
import { PostService } from '../post-service.service';
@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {

  tags: Array<string>;
  querysub: any;
  constructor(private data: PostService) { }

  ngOnInit(): void {
    this.querysub = this.data.getTags().subscribe(data=>this.tags = data);
  }

}
