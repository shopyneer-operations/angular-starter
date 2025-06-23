import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productDetails: any;
  id: string | null = null;
  variants: any[] = [];
  selectedVariant: any | null = null;
  productImages: any[] = [];
  selectedImage: string = '';
  imageLoading: boolean = true;
  quantity: number = 1;
  isLoading: boolean = false;
  error: string | null = null;
  isAddingToCart: boolean = false;
  successMessage: string | null = null;
  hasSingleVariant: boolean = false;

  // Size and Color options
  sizes: string[] = [];
  colors: { value: string; thumbnail: string }[] = [];
  selectedSize: string | null = null;
  selectedColor: string | null = null;

  // Dynamic pricing and ratings
  priceAmmount: number = 0;
  originalAmount: number = 0;
  discountPercentage: number = 0;
  ratingCount: number = 0;
  productReviews: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    if (this.id) {
      this.getProductById();
    } else {
      this.error = 'معرف المنتج غير صالح.';
    }
  }

  getProductById(): void {
    this.isLoading = true;
    this.error = null;
    this.productService.getProductById(this.id!).subscribe({
      next: (res: any) => {
        this.productDetails = res.product;
        this.productImages = res.product.images || [];
        this.variants = res.product.variants || [];
        this.hasSingleVariant = this.variants.length === 1;
        this.ratingCount = res.product.reviews?.length || 0;
        this.productReviews = res.product.reviews || [];

        // Extract sizes and colors
        this.extractSizesAndColors();

        // Set default selections
        this.selectedImage = this.productImages.length > 0 ? this.productImages[0].url : res.product.thumbnail || '';
        this.selectedVariant = this.hasSingleVariant ? this.variants[0] : this.variants.find((v: any) => v.title.includes('S')) || this.variants[0] || null;
        if (this.selectedVariant) {
          this.selectedSize = this.getSizeFromVariant(this.selectedVariant);
          this.selectedColor = this.getColorFromVariant(this.selectedVariant);
          this.updateSelectedImage();
        }

        this.updatePricing();
        this.imageLoading = false;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'فشل في تحميل تفاصيل المنتج. حاول مرة أخرى.';
        this.isLoading = false;
        this.imageLoading = false;
        console.error('Error fetching product:', err);
      }
    });
  }

  extractSizesAndColors(): void {
    // Extract sizes and colors from options
    const sizeOption = this.productDetails.options.find((opt: any) => opt.title === 'Size');
    const colorOption = this.productDetails.options.find((opt: any) => opt.title === 'Color');

    if (sizeOption) {
      this.sizes = sizeOption.values.map((val: any) => val.value);
    }

    if (colorOption) {
      // Map colors to their thumbnails from variants
      const colorValues = colorOption.values.map((val: any) => val.value);
      this.colors = colorValues.map((color: string) => {
        const variant = this.variants.find((v: any) => v.options.some((opt: any) => opt.value === color));
        return {
          value: color,
          thumbnail: variant?.metadata?.thumbnail || this.productDetails.thumbnail
        };
      });
    }
  }

  getSizeFromVariant(variant: any): string {
    const sizeOption = variant.options.find((opt: any) => opt.option.title === 'Size');
    return sizeOption ? sizeOption.value : '';
  }

  getColorFromVariant(variant: any): string {
    const colorOption = variant.options.find((opt: any) => opt.option.title === 'Color');
    return colorOption ? colorOption.value : '';
  }

  selectSize(size: string): void {
    this.selectedSize = size;
    this.updateSelectedVariant();
  }

  selectColor(color: string): void {
    this.selectedColor = color;
    this.updateSelectedVariant();
    this.updateSelectedImage();
  }
  isVariantAvailable(size: string | null, color: string | null): boolean {
  if (!size || !color) return false;
  return this.variants.some((v: any) =>
    v.options.some((opt: any) => opt.option.title === 'Size' && opt.value === size) &&
    v.options.some((opt: any) => opt.option.title === 'Color' && opt.value === color) &&
    v.inventory_quantity > 0
  );
}

  updateSelectedVariant(): void {
    if (this.selectedSize && this.selectedColor) {
      // Find variant matching both size and color
      const variant = this.variants.find((v: any) =>
        v.options.some((opt: any) => opt.option.title === 'Size' && opt.value === this.selectedSize) &&
        v.options.some((opt: any) => opt.option.title === 'Color' && opt.value === this.selectedColor)
      );
      if (variant) {
        this.selectedVariant = variant;
        this.quantity = 1; // Reset quantity
        this.updatePricing();
        this.error = null;
      } else {
        this.error = 'هذا المزيج من المقاس واللون غير متوفر.';
        this.selectedVariant = null;
      }
    }
  }

  updateSelectedImage(): void {
    if (this.selectedColor) {
      const colorObj = this.colors.find(c => c.value === this.selectedColor);
      if (colorObj) {
        this.imageLoading = true;
        this.selectedImage = colorObj.thumbnail;
      }
    }
  }

  updatePricing(): void {
    if (this.selectedVariant?.calculated_price) {
      this.priceAmmount = this.selectedVariant.calculated_price.calculated_amount || 0;
      this.originalAmount = this.selectedVariant.calculated_price.original_amount || this.priceAmmount;
      this.discountPercentage = this.originalAmount > this.priceAmmount
        ? ((this.originalAmount - this.priceAmmount) / this.originalAmount) * 100
        : 0;
    } else {
      this.priceAmmount = 0;
      this.originalAmount = 0;
      this.discountPercentage = 0;
    }
  }

  increaseQuantity(): void {
    if (this.selectedVariant?.inventory_quantity && this.quantity >= this.selectedVariant.inventory_quantity) {
      this.error = 'الكمية المطلوبة غير متوفرة في المخزون.';
      return;
    }
    this.quantity++;
    this.error = null;
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
      this.error = null;
    }
  }

  changeMainImage(imageUrl: string): void {
    this.imageLoading = true;
    this.selectedImage = imageUrl;
  }

  imageLoaded(): void {
    this.imageLoading = false;
  }

  addToCart(): void {
    if (!this.selectedVariant) {
      this.error = 'يرجى اختيار مقاس و لون المنتج.';
      return;
    }
    if (this.selectedVariant.inventory_quantity && this.quantity > this.selectedVariant.inventory_quantity) {
      this.error = 'الكمية المطلوبة غير متوفرة في المخزون.';
      return;
    }
    this.isAddingToCart = true;
    this.error = null;
    this.successMessage = null;
    const cartID = localStorage.getItem('cartID');

    if (cartID) {
      this.addToExistingCart(cartID);
    } else {
      this.createNewCart();
    }
  }

  private addToExistingCart(cartID: string): void {
    const data = {
      variant_id: this.selectedVariant!.id,
      quantity: this.quantity
    };
    this.productService.addLineToCart(cartID, data).subscribe({
      next: (res: any) => {
        this.isAddingToCart = false;
        this.successMessage = 'تم إضافة المنتج إلى السلة بنجاح!';
        this.cartService.updateCartItemCount();
        setTimeout(() => {
          this.successMessage = null;
          this.router.navigate(['/cart']);
        }, 1500);
      },
      error: (err) => {
        this.error = err.status === 400 ? 'المنتج غير متوفر حاليًا.' : 'فشل في إضافة المنتج إلى السلة. حاول مرة أخرى.';
        this.isAddingToCart = false;
        console.error('Error adding to cart:', err);
      }
    });
  }

  private createNewCart(): void {
    this.productService.createCart().subscribe({
      next: (res: any) => {
        const newCartID = res.cart.id;
        localStorage.setItem('cartID', newCartID);
        this.addToExistingCart(newCartID);
      },
      error: (err) => {
        this.error = 'فشل في إنشاء سلة تسوق. حاول مرة أخرى.';
        this.isAddingToCart = false;
        console.error('Error creating cart:', err);
      }
    });
  }

  trackByImageId(index: number, img: any): string {
    return img.id;
  }

  trackByVariantId(index: number, variant: any): string {
    return variant.id;
  }
}