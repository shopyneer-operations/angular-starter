import { Component } from '@angular/core';

@Component({
  selector: 'app-review-product',
  templateUrl: './review-product.component.html',
  styleUrls: ['./review-product.component.css']
})
export class ReviewProductComponent {
rating: number = 0;
  hoverRating: number = 0;
  reviewTitle: string = '';
  reviewText: string = '';
  charCount: number = 0;
  isAnonymous: boolean = false;
  imagePreviews: string[] = [];

  setRating(rating: number): void {
    this.rating = rating;
  }

  updateCharCount(): void {
    this.charCount = this.reviewText.length;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && this.imagePreviews.length < 5) {
      for (let i = 0; i < input.files.length && this.imagePreviews.length < 5; i++) {
        const file = input.files[i];
        if (file.size <= 250 * 1024) { // 250KB limit
          const reader = new FileReader();
          reader.onload = () => {
            this.imagePreviews.push(reader.result as string);
          };
          reader.readAsDataURL(file);
        } else {
          alert('حجم الصورة يتجاوز الحد الأقصى (250 ك.ب)');
        }
      }
    } else if (this.imagePreviews.length >= 5) {
      alert('الحد الأقصى لعدد الصور هو 5');
    }
  }

  removeImage(index: number): void {
    this.imagePreviews.splice(index, 1);
  }

  submitReview(): void {
    console.log({
      rating: this.rating,
      title: this.reviewTitle,
      text: this.reviewText,
      anonymous: this.isAnonymous,
      images: this.imagePreviews
    });
    // Add API call or form submission logic here
  }
}
