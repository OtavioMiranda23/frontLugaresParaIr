import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Lugar } from '../../../models/lugar';
import { Tag } from '../../../models/tag';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardComponent } from "../card/card.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  title = 'front_lugares';
  http = inject(HttpClient);
  url = 'http://localhost:5030/api';
  tags$?: Observable<Tag[]>;
  lugares$?: Observable<Lugar[]>;
  tagName = "";
  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.getLugares();
  }
  
  getLugares() {
    this.lugares$ = this.http.get<Lugar[]>(`${this.url}/lugares`);
  }

  getTags() {
    this.tags$ = this.http.get<Tag[]>(`${this.url}/tags`);
  }

  createTag() {
    if (!this.tagName) return;
    const createTag: { name: string } = {
      name:  this.tagName
    };
    this.http.post<void>(`${this.url}/tags`, createTag)
    .subscribe(_ => { 
      this.getTags();
      this.tagName = ""; 
    });
  }

  deleteTag(id: string) {
    this.http.delete<void>(`${this.url}/tags/${id}`)
      .subscribe(_ => {
        this.getTags();
      })
  }

}