import { NextResponse } from 'next/server';
import { courses } from '../../../data/products';

// Giả lập lấy từ localStorage phía FE gửi lên (ở đây hardcode cho demo)
const mockFavorites = [courses[0], courses[1]]; // Giả lập đã thích
const mockViewHistory = [
  { productId: courses[2].id, count: 3 },
  { productId: courses[3].id, count: 2 },
];

export async function GET() {
  // Lấy userId từ query nếu cần

  // Ưu tiên gợi ý theo favorites
  if (mockFavorites.length > 0) {
    const favoritePrice = mockFavorites[0].price;
    const similar = courses.filter(p =>
      !mockFavorites.some(f => f.id === p.id) &&
      Math.abs(p.price - favoritePrice) < 300000
    );
    return NextResponse.json({
      suggestedProducts: similar.slice(0, 3),
      reason: 'Dựa trên sản phẩm bạn đã yêu thích',
    });
  }

  // Nếu có lịch sử xem
  if (mockViewHistory.length > 0) {
    const mostViewed = mockViewHistory[0];
    const mostViewedProduct = courses.find(p => p.id === mostViewed.productId);
    if (mostViewedProduct) {
      const similar = courses.filter(p =>
        p.id !== mostViewedProduct.id &&
        !mockFavorites.some(f => f.id === p.id)
      );
      return NextResponse.json({
        suggestedProducts: similar.slice(0, 3),
        reason: 'Dựa trên sản phẩm bạn đã xem',
      });
    }
  }

  // Nếu không có gì, trả về ngẫu nhiên
  return NextResponse.json({
    suggestedProducts: courses.slice(0, 3),
    reason: 'Dựa trên các sản phẩm phổ biến',
  });
} 