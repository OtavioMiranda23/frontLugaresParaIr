import { Component, inject, Input } from '@angular/core';
import { Lugar, LugarUpdate } from '../../../models/lugar';
import { Router } from '@angular/router';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Tag } from '../../../models/tag';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-card',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() lugar?: Lugar;
  @Input() tags?: Tag[];
  tags$?: Observable<Tag[]>;
  tagName = "";
  http = inject(HttpClient);
  url = 'http://localhost:5030/api';
  isCreateTagOpen = false;
  constructor(private router: Router) {
  }
  ngOnInit() {
    const currentTags = this.lugar?.tagDetails?.map(tag => tag.name);
    this.tags = this.tags?.filter(tag => !currentTags?.includes(tag.name));
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
  //TODO: TAGS PRECISAM SER ATUALIZADAS EM TODA A PAGINA
  getTags() {
    this.http.get<Tag[]>(`${this.url}/tags`).subscribe(tags => {
      this.tags = tags;
    })
  }
  getLugarById() {
    this.http.get<Lugar>(`${this.url}/lugares/${this.lugar?.id}`)
    .subscribe(lugarUpdated => {
      this.lugar = lugarUpdated;
    })
  }
  updateTagOfLugar(idTag: number[]) {
    let data = {} as LugarUpdate;
    const currentTagIds = this.lugar?.tagDetails?.map(tag => tag.id);
    if (!currentTagIds || !currentTagIds.length) {
      data.tagsIds = idTag;
    } else {
      data["tagsIds"] = [...currentTagIds, ...idTag];
    }
    
    this.http.put<LugarUpdate>(`${this.url}/lugares/${this.lugar?.id}`, data)
    .subscribe(updated => {
        this.getLugarById();
        console.log('Atualizado com sucesso!', updated);
    })
  }
  createTag() {
    if (!this.tagName) return;
    const createTag: { name: string } = {
      name:  this.tagName
    };
    const currentTagIds = this.lugar?.tagDetails?.map(tag => tag.id);
    this.http.post<Tag>(`${this.url}/tags`, createTag)
    .subscribe(createdTag => { 
      let data: LugarUpdate = {} as LugarUpdate;
      if (!currentTagIds || !currentTagIds.length) {
        data.tagsIds = [createdTag.id];
      } else {
        data.tagsIds = [...currentTagIds, createdTag.id]
      }      
      this.updateTagOfLugar(data.tagsIds);
      this.getTags();
      this.tagName = ""; 
    });
  }

  removeTagFromCard(idTag: number) {
    let data = {} as LugarUpdate;
    const currentTagIds = this.lugar?.tagDetails?.map(tag => tag.id);
    if (!currentTagIds || !currentTagIds.length) {
      alert("Houve um problema");
      return;
    }
    const restTags = currentTagIds.filter(tag => tag != idTag);
    data["tagsIds"] = [...restTags];
    this.http.put<LugarUpdate>(`${this.url}/lugares/${this.lugar?.id}`, data)
      .subscribe(_ => {
        this.getLugarById();
      })
  }

  openCreateTag() {
    this.isCreateTagOpen = !this.isCreateTagOpen;
  }

  handleTagChange(tagEvent: Event) {
    const selectElement = tagEvent.target as HTMLSelectElement; 
    this.updateTagOfLugar([parseInt(selectElement.value)]);
  }
}
