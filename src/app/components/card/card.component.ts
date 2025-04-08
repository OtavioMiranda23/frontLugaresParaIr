import { Component, Input } from '@angular/core';
import { Lugar } from '../../../models/lugar';
import { Router } from '@angular/router';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  imports: [ CommonModule],
  standalone: true,
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() lugar?: Lugar;

  constructor(private router: Router) {
  }

  getStars(lengthStar: number) {
    return Array.from({ length: lengthStar }, (v, i) => i);
  }
  goToDetail(id: number) {
    this.router.navigate(['/detail', id]);
  }

  goToUpdate(id: number|undefined) {
    this.router.navigate(['/update', id]);
  }
}
