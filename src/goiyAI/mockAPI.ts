import { Course, courses } from '../data/products';

// Interface cho lịch sử xem sản phẩm
interface ViewHistory {
  productId: string;
  timestamp: number;
  count: number;
}

// Lưu lịch sử xem sản phẩm
export const saveProductView = (productId: string): void => {
  try {
    // Lấy lịch sử hiện tại từ localStorage
    const historyString = localStorage.getItem('viewHistory') || '[]';
    const history: ViewHistory[] = JSON.parse(historyString);
    
    // Kiểm tra xem sản phẩm đã có trong lịch sử chưa
    const existingIndex = history.findIndex(item => item.productId === productId);
    
    if (existingIndex >= 0) {
      // Nếu đã có, tăng số lần xem và cập nhật timestamp
      history[existingIndex].count += 1;
      history[existingIndex].timestamp = Date.now();
    } else {
      // Nếu chưa có, thêm mới vào lịch sử
      history.push({
        productId,
        timestamp: Date.now(),
        count: 1
      });
    }
    
    // Giới hạn lịch sử lưu trữ (giữ 20 sản phẩm gần nhất)
    const limitedHistory = history
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, 20);
    
    // Lưu lại vào localStorage
    localStorage.setItem('viewHistory', JSON.stringify(limitedHistory));
  } catch (error) {
    console.error('Error saving view history:', error);
  }
};

// Hàm giả lập API gợi ý sản phẩm
export const getSuggestions = async (): Promise<{
  suggestedProducts: Course[];
  reason: string;
}> => {
  // Giả lập độ trễ của API (500-1500ms)
  const delay = 500 + Math.random() * 1000;
  
  return new Promise((resolve) => {
    setTimeout(() => {
      try {
        // 1. Lấy lịch sử xem
        const viewHistoryString = localStorage.getItem('viewHistory') || '[]';
        const viewHistory: ViewHistory[] = JSON.parse(viewHistoryString);
        
        // 2. Lấy danh sách yêu thích
        const favoritesString = localStorage.getItem('favorites') || '[]';
        const favorites: Course[] = JSON.parse(favoritesString);
        
        // 3. Nếu không có dữ liệu, trả về sản phẩm ngẫu nhiên
        if (viewHistory.length === 0 && favorites.length === 0) {
          const randomProducts = getRandomProducts(3);
          resolve({
            suggestedProducts: randomProducts,
            reason: 'Dựa trên các sản phẩm phổ biến'
          });
          return;
        }
        
        // 4. Nếu có dữ liệu, tạo gợi ý thông minh
        let suggestedProducts: Course[] = [];
        let reason = '';
        
        // Nếu có sản phẩm yêu thích
        if (favorites.length > 0) {
          // Lấy sản phẩm tương tự dựa trên khoảng giá
          const favoritePrice = favorites[0].price;
          const similarPriceProducts = courses.filter(p => 
            !favorites.some(f => f.id === p.id) && // Không trùng với đã thích
            Math.abs(p.price - favoritePrice) < 300000 // Khoảng giá tương tự
          );
          
          if (similarPriceProducts.length > 0) {
            suggestedProducts = getRandomSubset(similarPriceProducts, 3);
            reason = 'Dựa trên sản phẩm bạn đã yêu thích';
          }
        }
        
        // Nếu có lịch sử xem nhưng chưa có gợi ý từ yêu thích
        if (viewHistory.length > 0 && suggestedProducts.length === 0) {
          // Lấy sản phẩm được xem nhiều nhất
          const mostViewedHistory = [...viewHistory].sort((a, b) => b.count - a.count)[0];
          const mostViewedProduct = courses.find(p => p.id === mostViewedHistory.productId);
          
          if (mostViewedProduct) {
            // Tìm sản phẩm tương tự
            const similarProducts = courses.filter(p => 
              p.id !== mostViewedProduct.id && // Không trùng với sản phẩm đã xem
              !favorites.some(f => f.id === p.id) // Không trùng với đã thích
            );
            
            suggestedProducts = getRandomSubset(similarProducts, 3);
            reason = 'Dựa trên sản phẩm bạn đã xem';
          }
        }
        
        // Nếu vẫn chưa có gợi ý, trả về ngẫu nhiên
        if (suggestedProducts.length === 0) {
          suggestedProducts = getRandomProducts(3);
          reason = 'Dựa trên các sản phẩm phổ biến';
        }
        
        resolve({
          suggestedProducts,
          reason
        });
      } catch (error) {
        console.error('Error getting suggestions:', error);
        // Trả về sản phẩm ngẫu nhiên nếu có lỗi
        resolve({
          suggestedProducts: getRandomProducts(3),
          reason: 'Dựa trên các sản phẩm phổ biến'
        });
      }
    }, delay);
  });
};

// Hàm lấy ngẫu nhiên n sản phẩm
const getRandomProducts = (count: number): Course[] => {
  const shuffled = [...courses].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Hàm lấy ngẫu nhiên n phần tử từ một mảng
const getRandomSubset = <T>(array: T[], count: number): T[] => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, shuffled.length));
}; 