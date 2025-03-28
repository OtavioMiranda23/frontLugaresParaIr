import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Lugar } from '../../../models/lugar';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-detail',
  standalone: true,
  imports: [AsyncPipe, CommonModule],
  templateUrl: './card-detail.component.html',
  styleUrl: './card-detail.component.css'
})
export class CardDetailComponent implements OnInit {
  
  http = inject(HttpClient);
  url = 'http://localhost:5030/api';
  lugar$?: Observable<Lugar>;
  constructor(private activedRoute: ActivatedRoute) {}
  ngOnInit(): void {
    this.activedRoute.params.subscribe(params => {
      const id = params['id'];
      this.getLugar(id);
    })
  }

  getLugar(id: string) {
    this.lugar$ = this.http.get<Lugar>(`${this.url}/lugares/${id}`);
  }

  getStars(lengthStar: number) {
    return Array.from({ length: lengthStar }, (v, i) => i);
  }

}
