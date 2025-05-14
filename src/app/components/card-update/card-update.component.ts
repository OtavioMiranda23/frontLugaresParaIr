import { AsyncPipe, CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Lugar, LugarUpdate } from '../../../models/lugar';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-card-update',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './card-update.component.html',
  styleUrl: './card-update.component.css'
})
export class CardUpdateComponent implements OnInit {
  http = inject(HttpClient);
  url = 'http://localhost:5030/api';
  lugar$?: Observable<Lugar>;
  data:Lugar = {} as Lugar; 
  id: number = 0;
  constructor(private activedRoute: ActivatedRoute) {}
  ngOnInit(): void {
    this.activedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.getLugar();
    })
  }

  getLugar() {
    this.lugar$ = this.http.get<Lugar>(`${this.url}/lugares/${this.id}`);
    this.lugar$.subscribe(lugar => {
      this.data = { ...lugar }; // carrega os dados no modelo editável
    });
  }
  

  updateLugar() {
    this.http.put<LugarUpdate>(`${this.url}/lugares/${this.id}`, this.data)
      .subscribe(updated => {
        console.log('Atualizado com sucesso!', updated);
      });
  }

}
