import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {NewsService} from "../../services/news/news.service";
import {NewsRequest} from "../../models/request/news-request";
import {CategoryResponse} from "../../models/response/category-response";
import {CategoryService} from "../../services/category/category.service";

@Component({
  selector: 'app-create-news',
  templateUrl: './create-news.component.html',
  styleUrls: ['./create-news.component.css']
})
export class CreateNewsComponent implements OnInit {

  categories: CategoryResponse[];
  isSubmitted = false;
  errorMessage: string;

  createNewsForm = this.formBuilder.group({
    title: ['', [Validators.required, Validators.minLength(4)]],
    content: ['', [Validators.required]],
    category_id: [null, []]
  });

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private newsService: NewsService,
              private categoryService: CategoryService) {}


  ngOnInit(): void {
    this.categoryService.getAll().subscribe(
      categories => this.categories = categories
    )
  }

  isFieldValid(field: string, errorType: string): boolean {
    return this.createNewsForm.get(field)?.hasError(errorType) &&
      (this.createNewsForm.get(field)?.dirty ||
        this.createNewsForm.get(field)?.touched || this.isSubmitted);
  }

  onSubmit() {
    const newsRequest: NewsRequest  = {
      title: this.createNewsForm.value.title,
      content: this.createNewsForm.value.content,
      category_id: this.createNewsForm.value.category_id
    }

    this.newsService.save(newsRequest).subscribe(
      (data) => {
        console.log(data);
        Swal.fire({
          title: "Good job!",
          text: "Published with success!",
          icon: "success",
          timer: 1500
        });
        setTimeout(() => {
          this.router.navigateByUrl("/news")
        }, 2000);
      },
      err => {
        console.log(err.error.message);
        this.errorMessage = err.error.message;
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: 'Please try again later',
        });
        this.router.navigateByUrl("/news/publish")
      }
    )
    this.isSubmitted = true;
  }

}
