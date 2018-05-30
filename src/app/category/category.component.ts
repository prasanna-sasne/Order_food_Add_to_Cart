import { Component, OnInit, DoCheck } from '@angular/core';
import { CategoryService } from '../services/category.service';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  menuItems: any[] = [];
  menuItemsOriginal: any[] = [];
  currentTime;
  cartItems: any[] = [];
  quantityOfItem: number = 0;
  groups: any[] = [];
  totalToBePaid: number = 0;
  @BlockUI() blockUI: NgBlockUI;

  constructor(private categoryService: CategoryService,
    private router: Router) { 
      this.blockUI.start('Loading...');
    }

  ngOnInit() {
    this.categoryService.getOrderListMenuItems()
      .subscribe((data) => {
        this.menuItems = data;
        this.menuItemsOriginal = data;
        this.processMenuItems();
        this.blockUI.stop();
      },
      (error) => console.log(error));
  }

  processMenuItems() {
    for (const menus of this.menuItems) {
      for (let item of menus.catDescription) {
        const timeArray = item.availabletime.split('-');
        this.currentTime = new Date().getHours() + ":" + new Date().getMinutes();
        if (this.currentTime > timeArray[0] && this.currentTime < timeArray[1]) {
          item.available = true;
        } else
          item.available = false;
        item.quantity = 0;
      }
    }
  }

  removeFromCart(item) {
    var index = this.cartItems.indexOf(item);
    if (index != -1) {
      item.quantity--;
      this.cartItems.splice(index, 1);
    }
    this.getCartData();
    this.getTotal();
  }

  addToCart(item) {
    item.quantity++;
    const timeArray = item.availabletime.split('-');
    this.currentTime = new Date().getHours() + ":" + new Date().getMinutes();
    if (this.currentTime > timeArray[0] && this.currentTime < timeArray[1]) {
      this.cartItems.push(item);
      this.getCartData();
      this.getTotal();
    } else {
      alert("This menu is not Available between " + item.availabletime+" Please refresh browser");
    }
  }

  getCartData() {
    var group_to_values = this.cartItems.reduce(function (obj, item) {
      obj[item.name] = obj[item.name] || [];
      obj[item.name].push(item);
      return obj;
    }, {});

    this.groups = Object.keys(group_to_values).map(function (key) {
      return { itemName: key, itemDescription: group_to_values[key], price: group_to_values[key][0].price };
    });
  }

  getTotal() {
    this.totalToBePaid = 0;
    for (const item of this.groups) {
      var totalOfItem = item.price * item.itemDescription.length;
      this.totalToBePaid += totalOfItem;
    }
  }

  clearCart() {
    this.menuItems = this.menuItemsOriginal;
    this.processMenuItems();
    this.groups = [];
    this.cartItems = [];
  }

  goToSelectedCat(category: any) {
    category = this.getId(category);
    $('.categoryItemsContainer').animate({
      scrollTop: $("#" + category).offset().top + 20
    }, 500);
  }

  getId(categoeyId) {
    return categoeyId.replace(/ /g, "_");
  }
}
