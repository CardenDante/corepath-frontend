import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { apiClient } from '@/lib/api-client';
import { useProductsStore, useAuthStore } from '@/store';
import { API_ENDPOINTS, DEFAULT_PAGINATION } from '@/constants/app';
import type {
  Product,
  ProductDetail,
  Category,
  PaginatedResponse,
} from '@/types/api';

// Product filters interface
interface ProductFilters {
  page?: number;
  per_page?: number;
  q?: string;
  category_id?: number;
  min_price?: number;
  max_price?: number;
  is_featured?: boolean;
  is_digital?: boolean;
  in_stock?: boolean;
  sort_by?: string;
  sort_order?: string;
  tags?: string[];
}

// Products listing hook
export function useProducts(filters: ProductFilters = {}) {
  const defaultFilters = {
    page: DEFAULT_PAGINATION.page,
    per_page: DEFAULT_PAGINATION.per_page,
    sort_by: 'created_at',
    sort_order: 'desc',
    ...filters,
  };

  return useQuery({
    queryKey: ['products', defaultFilters],
    queryFn: async (): Promise<PaginatedResponse<Product>> => {
      const response = await apiClient.get(API_ENDPOINTS.PRODUCTS.LIST, { 
        params: defaultFilters 
      });
      return response.data.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    placeholderData: {
      items: [],
      total: 0,
      page: 1,
      per_page: 12,
      pages: 0,
      has_prev: false,
      has_next: false,
    },
  });
}

// Infinite scroll products hook
export function useInfiniteProducts(filters: Omit<ProductFilters, 'page'> = {}) {
  const baseFilters = {
    per_page: DEFAULT_PAGINATION.per_page,
    sort_by: 'created_at',
    sort_order: 'desc',
    ...filters,
  };

  return useInfiniteQuery({
    queryKey: ['products', 'infinite', baseFilters],
    queryFn: async ({ pageParam = 1 }): Promise<PaginatedResponse<Product>> => {
      const response = await apiClient.get(API_ENDPOINTS.PRODUCTS.LIST, {
        params: { ...baseFilters, page: pageParam },
      });
      return response.data.data;
    },
    getNextPageParam: (lastPage) => {
      return lastPage.has_next ? lastPage.page + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000,
  });
}

// Single product hook
export function useProduct(slug: string) {
  const { addRecentlyViewed } = useProductsStore();

  return useQuery({
    queryKey: ['product', slug],
    queryFn: async (): Promise<ProductDetail> => {
      const response = await apiClient.get(`${API_ENDPOINTS.PRODUCTS.BY_SLUG}/${slug}`);
      
      // Add to recently viewed
      if (response.data?.id) {
        addRecentlyViewed(response.data.id);
      }
      
      return response.data;
    },
    enabled: !!slug,
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 1,
  });
}

// Featured products hook
export function useFeaturedProducts(limit: number = 10) {
  return useQuery({
    queryKey: ['products', 'featured', limit],
    queryFn: async (): Promise<Product[]> => {
      const response = await apiClient.get(API_ENDPOINTS.PRODUCTS.FEATURED, {
        params: { limit },
      });
      return response.data;
    },
    staleTime: 15 * 60 * 1000, // 15 minutes
  });
}

// Products by category hook
export function useProductsByCategory(
  categoryId: number,
  options: {
    page?: number;
    per_page?: number;
    include_subcategories?: boolean;
    sort_by?: string;
    sort_order?: string;
  } = {}
) {
  const defaultOptions = {
    page: DEFAULT_PAGINATION.page,
    per_page: DEFAULT_PAGINATION.per_page,
    include_subcategories: false,
    sort_by: 'created_at',
    sort_order: 'desc',
    ...options,
  };

  return useQuery({
    queryKey: ['products', 'category', categoryId, defaultOptions],
    queryFn: async (): Promise<PaginatedResponse<Product>> => {
      const response = await apiClient.get(`${API_ENDPOINTS.PRODUCTS.BY_CATEGORY}/${categoryId}`, {
        params: defaultOptions,
      });
      return response.data.data;
    },
    enabled: !!categoryId,
    staleTime: 5 * 60 * 1000,
  });
}

// Categories hook
export function useCategories(options: {
  parent_id?: number;
  is_active?: boolean;
  include_children?: boolean;
} = {}) {
  const defaultOptions = {
    is_active: true,
    include_children: false,
    ...options,
  };

  return useQuery({
    queryKey: ['categories', defaultOptions],
    queryFn: async (): Promise<Category[]> => {
      const response = await apiClient.get(API_ENDPOINTS.PRODUCTS.CATEGORIES, {
        params: defaultOptions,
      });
      return response.data;
    },
    staleTime: 30 * 60 * 1000, // 30 minutes - categories don't change often
  });
}

// Single category hook
export function useCategory(categoryId: number) {
  return useQuery({
    queryKey: ['category', categoryId],
    queryFn: async (): Promise<Category> => {
      const response = await apiClient.get(`${API_ENDPOINTS.PRODUCTS.CATEGORIES}/${categoryId}`);
      return response.data;
    },
    enabled: !!categoryId,
    staleTime: 30 * 60 * 1000,
  });
}

// Product search hook
export function useProductSearch(query: string, filters: Omit<ProductFilters, 'q'> = {}) {
  const searchFilters = {
    q: query,
    per_page: 20,
    ...filters,
  };

  return useQuery({
    queryKey: ['products', 'search', searchFilters],
    queryFn: async (): Promise<PaginatedResponse<Product>> => {
      const response = await apiClient.get(API_ENDPOINTS.PRODUCTS.LIST, {
        params: searchFilters,
      });
      return response.data.data;
    },
    enabled: !!query && query.length >= 2,
    staleTime: 2 * 60 * 1000, // 2 minutes for search results
  });
}

// Product recommendations hook
export function useProductRecommendations(productId: number, limit: number = 8) {
  return useQuery({
    queryKey: ['products', 'recommendations', productId, limit],
    queryFn: async (): Promise<Product[]> => {
      // Since your API doesn't have a specific recommendations endpoint,
      // we'll get products from the same category
      const productResponse = await apiClient.get(`${API_ENDPOINTS.PRODUCTS.DETAIL}/${productId}`);
      const product = productResponse.data;
      
      if (product.category?.id) {
        const response = await apiClient.get(`${API_ENDPOINTS.PRODUCTS.BY_CATEGORY}/${product.category.id}`, {
          params: { 
            per_page: limit + 1, // Get one extra to exclude current product
            sort_by: 'purchase_count',
            sort_order: 'desc',
          },
        });
        
        // Filter out the current product
        return response.data.data.items.filter((p: Product) => p.id !== productId).slice(0, limit);
      }
      
      return [];
    },
    enabled: !!productId,
    staleTime: 15 * 60 * 1000,
  });
}

// Recently viewed products hook
export function useRecentlyViewedProducts() {
  const { recentlyViewed } = useProductsStore();
  const { isAuthenticated } = useAuthStore();

  return useQuery({
    queryKey: ['products', 'recently-viewed', recentlyViewed],
    queryFn: async (): Promise<Product[]> => {
      if (recentlyViewed.length === 0) return [];
      
      // Fetch products by IDs (you might need to adjust this based on your API)
      const promises = recentlyViewed.slice(0, 10).map(async (id) => {
        try {
          const response = await apiClient.get(`${API_ENDPOINTS.PRODUCTS.DETAIL}/${id}`);
          return response.data;
        } catch (error) {
          return null;
        }
      });
      
      const products = await Promise.all(promises);
      return products.filter(Boolean) as Product[];
    },
    enabled: recentlyViewed.length > 0,
    staleTime: 5 * 60 * 1000,
  });
}

// Favorite products hook
export function useFavoriteProducts() {
  const { favoriteProducts } = useProductsStore();
  const { isAuthenticated } = useAuthStore();

  return useQuery({
    queryKey: ['products', 'favorites', favoriteProducts],
    queryFn: async (): Promise<Product[]> => {
      if (favoriteProducts.length === 0) return [];
      
      const promises = favoriteProducts.map(async (id) => {
        try {
          const response = await apiClient.get(`${API_ENDPOINTS.PRODUCTS.DETAIL}/${id}`);
          return response.data;
        } catch (error) {
          return null;
        }
      });
      
      const products = await Promise.all(promises);
      return products.filter(Boolean) as Product[];
    },
    enabled: isAuthenticated && favoriteProducts.length > 0,
    staleTime: 5 * 60 * 1000,
  });
}

// Compare products hook
export function useCompareProducts() {
  const { compareProducts } = useProductsStore();

  return useQuery({
    queryKey: ['products', 'compare', compareProducts],
    queryFn: async (): Promise<Product[]> => {
      if (compareProducts.length === 0) return [];
      
      const promises = compareProducts.map(async (id) => {
        try {
          const response = await apiClient.get(`${API_ENDPOINTS.PRODUCTS.DETAIL}/${id}`);
          return response.data;
        } catch (error) {
          return null;
        }
      });
      
      const products = await Promise.all(promises);
      return products.filter(Boolean) as Product[];
    },
    enabled: compareProducts.length > 0,
    staleTime: 5 * 60 * 1000,
  });
}

// Product availability check hook
export function useProductAvailability(productId: number, variantId?: number) {
  return useQuery({
    queryKey: ['product', 'availability', productId, variantId],
    queryFn: async (): Promise<{
      in_stock: boolean;
      quantity_available: number;
      can_backorder: boolean;
    }> => {
      const response = await apiClient.get(`${API_ENDPOINTS.PRODUCTS.DETAIL}/${productId}`);
      const product = response.data;
      
      if (variantId && product.variants) {
        const variant = product.variants.find((v: any) => v.id === variantId);
        if (variant) {
          return {
            in_stock: variant.is_in_stock,
            quantity_available: variant.inventory_count,
            can_backorder: product.allow_backorder,
          };
        }
      }
      
      return {
        in_stock: product.is_in_stock,
        quantity_available: product.inventory_count,
        can_backorder: product.allow_backorder,
      };
    },
    enabled: !!productId,
    staleTime: 1 * 60 * 1000, // 1 minute for availability checks
  });
}

// Product reviews hook (if your API supports reviews)
export function useProductReviews(productId: number, page: number = 1) {
  return useQuery({
    queryKey: ['product', 'reviews', productId, page],
    queryFn: async () => {
      // This would depend on your API structure
      // Placeholder for now since I don't see reviews in your API endpoints
      return {
        items: [],
        total: 0,
        average_rating: 0,
        rating_distribution: {
          5: 0,
          4: 0,
          3: 0,
          2: 0,
          1: 0,
        },
      };
    },
    enabled: !!productId,
    staleTime: 5 * 60 * 1000,
  });
}

// Product filters store integration
export function useProductFilters() {
  const {
    selectedCategory,
    priceRange,
    selectedBrands,
    selectedTags,
    sortBy,
    sortOrder,
    setFilters,
    resetFilters,
  } = useProductsStore();

  const updateFilters = (newFilters: Partial<ProductFilters>) => {
    setFilters(newFilters);
  };

  const clearFilters = () => {
    resetFilters();
  };

  const hasActiveFilters = () => {
    return (
      selectedCategory !== null ||
      priceRange[0] > 0 ||
      priceRange[1] < 10000 ||
      selectedBrands.length > 0 ||
      selectedTags.length > 0
    );
  };

  return {
    filters: {
      selectedCategory,
      priceRange,
      selectedBrands,
      selectedTags,
      sortBy,
      sortOrder,
    },
    updateFilters,
    clearFilters,
    hasActiveFilters: hasActiveFilters(),
  };
}

// Product favorites management
export function useProductFavorites() {
  const { favoriteProducts, toggleFavorite } = useProductsStore();
  const { isAuthenticated } = useAuthStore();

  const isFavorite = (productId: number) => {
    return favoriteProducts.includes(productId);
  };

  const addToFavorites = (productId: number) => {
    if (!isAuthenticated) {
      toast.error('Please login to add favorites');
      return;
    }
    
    if (!isFavorite(productId)) {
      toggleFavorite(productId);
      toast.success('Added to favorites');
    }
  };

  const removeFromFavorites = (productId: number) => {
    if (isFavorite(productId)) {
      toggleFavorite(productId);
      toast.success('Removed from favorites');
    }
  };

  const toggleProductFavorite = (productId: number) => {
    if (!isAuthenticated) {
      toast.error('Please login to manage favorites');
      return;
    }
    
    toggleFavorite(productId);
    const message = isFavorite(productId) ? 'Removed from favorites' : 'Added to favorites';
    toast.success(message);
  };

  return {
    favoriteProducts,
    isFavorite,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite: toggleProductFavorite,
    favoritesCount: favoriteProducts.length,
  };
}

// Product comparison management
export function useProductComparison() {
  const { compareProducts, toggleCompare, clearCompare } = useProductsStore();

  const isComparing = (productId: number) => {
    return compareProducts.includes(productId);
  };

  const addToCompare = (productId: number) => {
    if (compareProducts.length >= 4) {
      toast.error('You can compare up to 4 products only');
      return;
    }
    
    if (!isComparing(productId)) {
      toggleCompare(productId);
      toast.success('Added to comparison');
    }
  };

  const removeFromCompare = (productId: number) => {
    if (isComparing(productId)) {
      toggleCompare(productId);
      toast.success('Removed from comparison');
    }
  };

  const toggleProductCompare = (productId: number) => {
    if (isComparing(productId)) {
      removeFromCompare(productId);
    } else {
      addToCompare(productId);
    }
  };

  const clearAllCompare = () => {
    clearCompare();
    toast.success('Comparison cleared');
  };

  return {
    compareProducts,
    isComparing,
    addToCompare,
    removeFromCompare,
    toggleCompare: toggleProductCompare,
    clearCompare: clearAllCompare,
    compareCount: compareProducts.length,
    canAddMore: compareProducts.length < 4,
  };
}