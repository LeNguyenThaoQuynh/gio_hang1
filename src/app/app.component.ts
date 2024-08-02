// Mậc định
import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root', 
  standalone: true, 
  imports: [RouterOutlet, FormsModule, NgFor, NgIf], 
  templateUrl: './app.component.html',  // Đường dẫn đến file HTML 
  styleUrls: ['./app.component.scss'],  // Đường dẫn đến file SCSS 
})

export class AppComponent {
  title = 'first_project'; // Tiêu đề của ứng dụng

  // Thông tin của products
  products = [
    {
      id: 1,
      name: 'Son YSL Psychedelic Chilli',
      price: 1250000,
      inStock: 10,  // Số lượng hàng tồn kho của sản phẩm
      imageUrl: 'assets/ysl-416-Psychedelic.jpg',
    },
    {
      id: 2,
      name: 'Son YSL Lost In Marais',
      price: 1550000,
      inStock: 5,
      imageUrl: 'assets/Son-YSL-145-Lost-In-Marais.png',
    },
    {
      id: 3,
      name: 'Son YSL Take My Red Away',
      price: 1750000,
      inStock: 7,
      imageUrl: 'assets/son-YSL-120-Take-My-Red-Away.jpg',
    },
  ];

  cart: any[] = [];  // Các sản phẩm đã được thêm vào giỏ hàng

  // Thêm sản phẩm vào giỏ hàng
  addToCart(index: number) {
    // Tìm kiếm sản phẩm trong giỏ hàng
    let findIndex = this.cart.findIndex((element) => {
      return element.id == this.products[index].id;
    });

    // Nếu sản phẩm đã tồn tại trong giỏ hàng
    if (findIndex != -1) {
      this.cart[findIndex].quantity += 1;       // +1 sản phẩm vào giỏ hàng

      if (this.products[index].inStock > 0) {   // trừ số lượng hàng tồn (nếu còn hàng)
        this.products[index].inStock--;
      }
    } 
    else {
      // Nếu sản phẩm chưa có trong giỏ hàng, thêm sản phẩm mới vào giỏ hàng
      this.cart.push({
        id: this.products[index].id,  /* Lấy giá trị của id từ SP tại index trong mảng products. (VD: nếu index là 0, thì id sẽ được lấy từ SP đầu tiên trong products)*/ 
        name: this.products[index].name,
        price: this.products[index].price,
        quantity: 1,            // Khởi tạo số lượng sản phẩm là 1
      });
      this.products[index].inStock--;       // Giảm số lượng hàng tồn kho của sản phẩm
    }
    console.log(this.cart);
  }

  removeFromCart(index: number) {
    // Lấy ID của sản phẩm cần xóa
    let productId = this.cart[index].id;

    // Duyệt qua danh sách sản phẩm để phục hồi số lượng hàng tồn kho
    this.products.forEach(product => {    // Lặp qua từng sản phẩm
      if (product.id === productId) {
        product.inStock += this.cart[index].quantity;   // Nếu SP đang xét là SP cần xóa), thì cập nhật SL hàng tồn kho.
      }
    });
    this.cart.splice(index, 1);       // Giảm số lượng hàng tồn kho của sản phẩm
    console.log(this.cart);
  }

  //Tính tổng giá tiền của các sản phẩm trong giỏ hàng
  getTotalPrice() {
    return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
}