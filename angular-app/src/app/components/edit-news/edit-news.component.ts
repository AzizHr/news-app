import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {NewsService} from "../../services/news/news.service";
import {NewsRequest} from "../../models/request/news-request";
import Swal from "sweetalert2";
import {NewsResponse} from "../../models/response/news-response";
import {CategoryResponse} from "../../models/response/category-response";
import {CategoryService} from "../../services/category/category.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-edit-news',
  templateUrl: './edit-news.component.html',
  styleUrls: ['./edit-news.component.css']
})
export class EditNewsComponent implements OnInit {

  categories: CategoryResponse[];
  isSubmitted = false;
  newsId: number;
  news: NewsResponse;

  updateNewsForm = this.formBuilder.group({
    title: ['', [Validators.required, Validators.minLength(4)]],
    content: ['', [Validators.required]],
    category_id: [0, []]
  });

  constructor(
    private newsService: NewsService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private titleService: Title)
{
  this.titleService.setTitle("Edit News")
}

  ngOnInit(): void {
    this.categoryService.getAll().subscribe(
      categories => this.categories = categories
    )
    this.newsId = Number(this.route.snapshot.paramMap.get('id'));
    this.newsService.getOne(this.newsId).subscribe((news) => {
      this.news = news;
      if (this.news) {
        this.patchFormValues();
      }
    });
  }

  patchFormValues() {
    this.updateNewsForm.patchValue({
      title: this.news.title,
      content: this.news.content,
      category_id: this.news.category_id,
    });
  }

  onSubmit() {
    const newsRequest: NewsRequest = {
      title: this.updateNewsForm.value.title,
      content: this.updateNewsForm.value.content,
      category_id: this.updateNewsForm.value.category_id,
    };

    this.newsService.update(newsRequest, this.newsId).subscribe(
      (data) => {
        console.log(data);
        Swal.fire({
          title: "Good job!",
          text: "Updated with success!",
          icon: "success",
          timer: 1500
        });
        setTimeout(() => {
          this.router.navigateByUrl("/news")
        }, 2000);
      },
      err => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: 'Please try again later',
        });
        this.router.navigateByUrl(`/news/edit/${this.newsId}`);
      }
    )
    this.isSubmitted = true;
  }

  isFieldValid(field: string, errorType: string): boolean {
    return this.updateNewsForm.get(field)?.hasError(errorType) &&
      (this.updateNewsForm.get(field)?.dirty ||
        this.updateNewsForm.get(field)?.touched || this.isSubmitted);
  }

}
