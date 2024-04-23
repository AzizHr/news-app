import {Component, ViewChild, ElementRef, OnInit} from '@angular/core';
import {NewsService} from "../../services/news/news.service";
import {NewsResponse} from "../../models/response/news-response";
import {CategoryResponse} from "../../models/response/category-response";
import {CategoryService} from "../../services/category/category.service";
import Swal from "sweetalert2";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  @ViewChild('newsModal') newsModalRef!: ElementRef;

  news!: NewsResponse[];
  categories!: CategoryResponse[];
  selectedCategoryId: number | null = null;
  searchContent!: string;
  errorMessage!: string;
  selectedNews: any;

  currentPage: number = 1;
  totalElements: number = 0;
  limit: number = 0;
  totalPages: number = 0;
  pages!: number[];

  constructor(private newsService: NewsService,
              private categoryService: CategoryService,
              private titleService: Title)
  {
    this.titleService.setTitle("Browse News")
  }

  ngOnInit(): void {
    this.categoryService.getAll().subscribe(categories => {
      this.categories = categories;
    })
    this.all(this.currentPage);
  }

  toggleNewsModal(id: number) {
    if (this.newsModalRef) {
      this.newsModalRef.nativeElement.classList.toggle('d-none');
      this.newsModalRef.nativeElement.classList.toggle('d-inline');
      this.selectedNews = this.news.find(el => el.id === id);
    }
  }

  getPartialContent(content: string): string {
    const maxLength = Math.ceil(content.length * 0.4);
    return content.substring(0, maxLength);
  }

  all(page: number) {
    this.newsService.getAll(page).subscribe(d => {
      this.news = d.data;
      this.totalElements = d.total;
      this.limit = d.per_page;
      this.totalPages = Math.ceil(this.totalElements / this.limit);
      this.pages = [...Array(this.totalPages).keys()].map(el => el + 1);
    });
  }

  filter() {
    if (this.selectedCategoryId !== null) {
      this.categoryService.filter(this.selectedCategoryId).subscribe(news => {
        this.news = news;
        console.log(news)
      });
    }
  }

  search() {
    if (this.searchContent !== '') {
      setTimeout(() => {
        this.newsService.search(this.searchContent).subscribe(
          news => {
            this.news = news;
            console.log(news)
          },
          err => {
            console.log(err.error.message);
            this.news = []
            this.errorMessage = err.error.message;
          }
        );
      }, 1000)
    } else {
      this.all(this.currentPage)
    }
  }


  isFirstPage(): boolean {
    return this.currentPage === 1;
  }

  isLastPage(): boolean {
    return this.currentPage === this.totalPages;
  }

  onPageChange(event: any) {
    const page = event.page;
    this.currentPage = page;
    this.all(page);
    console.log(page)
  }

  confirmDelete(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.delete(id);
      }
    });
  }

  delete(id: number): void {
    this.newsService.delete(id).subscribe(() => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Deleted with success',
        showConfirmButton: false,
        timer: 1500
      });
      this.all(this.currentPage);
    })
  }
}
