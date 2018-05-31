import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class CategoryService {

  constructor(private http: Http) { }

  public getOrderListMenuItems() {
    return this.http.get(`http://localhost:4201/assets/menu.json`)
      .map((response: Response) => {
        const menuItems = response.json();
        var group_to_values = menuItems.reduce(function (obj, item) {
          obj[item.category] = obj[item.category] || [];
          obj[item.category].push(item);
          return obj;
        }, {});

        var groups = Object.keys(group_to_values).map(function (key) {
          return { category: key, catDescription: group_to_values[key] };
        });
        return groups;
      })
      .catch((error: Response) => {
        return Observable.throw('Something went wrong');
      });
  }

}
