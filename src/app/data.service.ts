import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export abstract class DataService {
  protected getData(key: string) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  }
}
