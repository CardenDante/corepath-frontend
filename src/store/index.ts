import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User, Cart, Product } from '@/types/api';
import { LOCAL_STORAGE_KEYS } from '@/constants/app';

// Auth Store
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  
  // Actions
  login: (user: User, tokens: { access_token: string; refresh_token: string }) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
  setLoading: (loading: boolean) => void;
  setTokens: (tokens: { access_token: string; refresh_token: string }) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      accessToken: null,
      refreshToken: null,
      isLoading: false,
      
      login: (user, tokens) => {
        // Store tokens in localStorage for API client
        if (typeof window !== 'undefined') {
          localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, tokens.access_token);
          localStorage.setItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN, tokens.refresh_token);
        }
        
        set({ 
          user, 
          isAuthenticated: true, 
          accessToken: tokens.access_token,
          refreshToken: tokens.refresh_token,
          isLoading: false,
        });
      },
      
      logout: () => {
        // Clear tokens from localStorage
        if (typeof window !== 'undefined') {
          localStorage.removeItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
          localStorage.removeItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
        }
        
        set({ 
          user: null, 
          isAuthenticated: false, 
          accessToken: null,
          refreshToken: null,
          isLoading: false,
        });
      },
      
      updateUser: (userData) => {
        const currentUser = get().user;
        if (currentUser) {
          set({ user: { ...currentUser, ...userData } });
        }
      },
      
      setLoading: (loading) => set({ isLoading: loading }),
      
      setTokens: (tokens) => {
        if (typeof window !== 'undefined') {
          localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, tokens.access_token);
          localStorage.setItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN, tokens.refresh_token);
        }
        
        set({
          accessToken: tokens.access_token,
          refreshToken: tokens.refresh_token,
        });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
      }),
    }
  )
);

// Cart Store
interface CartState {
  cart: Cart | null;
  itemCount: number;
  isOpen: boolean;
  
  // Actions
  setCart: (cart: Cart) => void;
  updateItemCount: (count: number) => void;
  clearCart: () => void;
  setOpen: (open: boolean) => void;
  addOptimisticItem: (product: Product, quantity: number, variantId?: number) => void;
  removeOptimisticItem: (itemId: number) => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  cart: null,
  itemCount: 0,
  isOpen: false,
  
  setCart: (cart) => set({ 
    cart, 
    itemCount: cart.item_count || cart.items.reduce((sum, item) => sum + item.quantity, 0)
  }),
  
  updateItemCount: (count) => set({ itemCount: count }),
  
  clearCart: () => set({ cart: null, itemCount: 0 }),
  
  setOpen: (open) => set({ isOpen: open }),
  
  addOptimisticItem: (product, quantity, variantId) => {
    const currentCart = get().cart;
    if (!currentCart) return;
    
    // Create optimistic cart item
    const optimisticItem = {
      id: Date.now(), // Temporary ID
      product_id: product.id,
      product_name: product.name,
      product_slug: product.slug,
      product_image: product.primary_image,
      variant_id: variantId,
      variant_name: undefined,
      quantity,
      unit_price: product.price,
      total_price: product.price * quantity,
      is_available: true,
      created_at: new Date().toISOString(),
    };
    
    const updatedCart = {
      ...currentCart,
      items: [...currentCart.items, optimisticItem],
      item_count: currentCart.item_count + quantity,
      subtotal: currentCart.subtotal + optimisticItem.total_price,
    };
    
    set({ cart: updatedCart, itemCount: updatedCart.item_count });
  },
  
  removeOptimisticItem: (itemId) => {
    const currentCart = get().cart;
    if (!currentCart) return;
    
    const itemToRemove = currentCart.items.find(item => item.id === itemId);
    if (!itemToRemove) return;
    
    const updatedCart = {
      ...currentCart,
      items: currentCart.items.filter(item => item.id !== itemId),
      item_count: currentCart.item_count - itemToRemove.quantity,
      subtotal: currentCart.subtotal - itemToRemove.total_price,
    };
    
    set({ cart: updatedCart, itemCount: updatedCart.item_count });
  },
}));

// UI Store
interface UIState {
  // Navigation
  isMobileMenuOpen: boolean;
  isSearchOpen: boolean;
  
  // Modals
  isLoginModalOpen: boolean;
  isRegisterModalOpen: boolean;
  
  // Loading states
  isPageLoading: boolean;
  
  // Theme
  theme: 'light' | 'dark' | 'system';
  
  // Search
  searchQuery: string;
  recentSearches: string[];
  
  // Actions
  setMobileMenuOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
  setLoginModalOpen: (open: boolean) => void;
  setRegisterModalOpen: (open: boolean) => void;
  setPageLoading: (loading: boolean) => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setSearchQuery: (query: string) => void;
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      // Navigation
      isMobileMenuOpen: false,
      isSearchOpen: false,
      
      // Modals
      isLoginModalOpen: false,
      isRegisterModalOpen: false,
      
      // Loading states
      isPageLoading: false,
      
      // Theme
      theme: 'system',
      
      // Search
      searchQuery: '',
      recentSearches: [],
      
      // Actions
      setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
      setSearchOpen: (open) => set({ isSearchOpen: open }),
      setLoginModalOpen: (open) => set({ isLoginModalOpen: open }),
      setRegisterModalOpen: (open) => set({ isRegisterModalOpen: open }),
      setPageLoading: (loading) => set({ isPageLoading: loading }),
      setTheme: (theme) => set({ theme }),
      setSearchQuery: (query) => set({ searchQuery: query }),
      
      addRecentSearch: (query) => {
        const currentSearches = get().recentSearches;
        const trimmedQuery = query.trim();
        
        if (trimmedQuery && !currentSearches.includes(trimmedQuery)) {
          const updatedSearches = [trimmedQuery, ...currentSearches.slice(0, 9)]; // Keep last 10
          set({ recentSearches: updatedSearches });
        }
      },
      
      clearRecentSearches: () => set({ recentSearches: [] }),
    }),
    {
      name: 'ui-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        theme: state.theme,
        recentSearches: state.recentSearches,
      }),
    }
  )
);

// Preferences Store
interface PreferencesState {
  // Display preferences
  currency: string;
  language: string;
  itemsPerPage: number;
  
  // Notification preferences
  emailNotifications: boolean;
  pushNotifications: boolean;
  marketingEmails: boolean;
  
  // Shopping preferences
  defaultShippingAddress: any;
  defaultBillingAddress: any;
  preferredPaymentMethod: string;
  
  // Privacy preferences
  analyticsEnabled: boolean;
  cookiesAccepted: boolean;
  
  // Actions
  updatePreferences: (preferences: Partial<PreferencesState>) => void;
  resetPreferences: () => void;
}

const defaultPreferences: Omit<PreferencesState, 'updatePreferences' | 'resetPreferences'> = {
  currency: 'KES',
  language: 'en',
  itemsPerPage: 12,
  emailNotifications: true,
  pushNotifications: true,
  marketingEmails: false,
  defaultShippingAddress: null,
  defaultBillingAddress: null,
  preferredPaymentMethod: 'card',
  analyticsEnabled: true,
  cookiesAccepted: false,
};

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set, get) => ({
      ...defaultPreferences,
      
      updatePreferences: (preferences) => {
        set(preferences);
      },
      
      resetPreferences: () => {
        set(defaultPreferences);
      },
    }),
    {
      name: 'preferences-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// Products Store (for filters, favorites, etc.)
interface ProductsState {
  // Filters
  selectedCategory: number | null;
  priceRange: [number, number];
  selectedBrands: string[];
  selectedTags: string[];
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  
  // Favorites
  favoriteProducts: number[];
  
  // Recently viewed
  recentlyViewed: number[];
  
  // Compare
  compareProducts: number[];
  
  // Actions
  setFilters: (filters: Partial<Pick<ProductsState, 'selectedCategory' | 'priceRange' | 'selectedBrands' | 'selectedTags' | 'sortBy' | 'sortOrder'>>) => void;
  resetFilters: () => void;
  toggleFavorite: (productId: number) => void;
  addRecentlyViewed: (productId: number) => void;
  toggleCompare: (productId: number) => void;
  clearCompare: () => void;
}

export const useProductsStore = create<ProductsState>()(
  persist(
    (set, get) => ({
      // Filters
      selectedCategory: null,
      priceRange: [0, 10000],
      selectedBrands: [],
      selectedTags: [],
      sortBy: 'created_at',
      sortOrder: 'desc',
      
      // Favorites
      favoriteProducts: [],
      
      // Recently viewed
      recentlyViewed: [],
      
      // Compare
      compareProducts: [],
      
      // Actions
      setFilters: (filters) => set(filters),
      
      resetFilters: () => set({
        selectedCategory: null,
        priceRange: [0, 10000],
        selectedBrands: [],
        selectedTags: [],
        sortBy: 'created_at',
        sortOrder: 'desc',
      }),
      
      toggleFavorite: (productId) => {
        const favorites = get().favoriteProducts;
        const isFavorite = favorites.includes(productId);
        
        if (isFavorite) {
          set({ favoriteProducts: favorites.filter(id => id !== productId) });
        } else {
          set({ favoriteProducts: [...favorites, productId] });
        }
      },
      
      addRecentlyViewed: (productId) => {
        const recent = get().recentlyViewed;
        const filtered = recent.filter(id => id !== productId);
        const updated = [productId, ...filtered].slice(0, 20); // Keep last 20
        set({ recentlyViewed: updated });
      },
      
      toggleCompare: (productId) => {
        const compare = get().compareProducts;
        const isComparing = compare.includes(productId);
        
        if (isComparing) {
          set({ compareProducts: compare.filter(id => id !== productId) });
        } else if (compare.length < 4) { // Max 4 products to compare
          set({ compareProducts: [...compare, productId] });
        }
      },
      
      clearCompare: () => set({ compareProducts: [] }),
    }),
    {
      name: 'products-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        favoriteProducts: state.favoriteProducts,
        recentlyViewed: state.recentlyViewed,
        compareProducts: state.compareProducts,
      }),
    }
  )
);

// Notifications Store
interface NotificationState {
  notifications: Array<{
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
    message: string;
    timestamp: number;
    read: boolean;
    action?: {
      label: string;
      url: string;
    };
  }>;
  
  // Actions
  addNotification: (notification: Omit<NotificationState['notifications'][0], 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  
  addNotification: (notification) => {
    const id = Date.now().toString();
    const newNotification = {
      ...notification,
      id,
      timestamp: Date.now(),
      read: false,
    };
    
    set(state => ({
      notifications: [newNotification, ...state.notifications].slice(0, 50) // Keep last 50
    }));
  },
  
  markAsRead: (id) => {
    set(state => ({
      notifications: state.notifications.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    }));
  },
  
  markAllAsRead: () => {
    set(state => ({
      notifications: state.notifications.map(notif => ({ ...notif, read: true }))
    }));
  },
  
  removeNotification: (id) => {
    set(state => ({
      notifications: state.notifications.filter(notif => notif.id !== id)
    }));
  },
  
  clearNotifications: () => set({ notifications: [] }),
}));

// Form Store (for complex multi-step forms)
interface FormState {
  // Checkout form
  checkoutStep: number;
  checkoutData: {
    shippingAddress?: any;
    billingAddress?: any;
    shippingMethod?: string;
    paymentMethod?: string;
    usePoints?: number;
    couponCode?: string;
    notes?: string;
    isGift?: boolean;
    giftMessage?: string;
  };
  
  // Merchant application form
  merchantApplicationData: {
    businessInfo?: any;
    contactInfo?: any;
    payoutInfo?: any;
    documents?: any;
  };
  
  // Actions
  setCheckoutStep: (step: number) => void;
  updateCheckoutData: (data: Partial<FormState['checkoutData']>) => void;
  clearCheckoutData: () => void;
  updateMerchantApplicationData: (data: Partial<FormState['merchantApplicationData']>) => void;
  clearMerchantApplicationData: () => void;
}

export const useFormStore = create<FormState>()(
  persist(
    (set, get) => ({
      // Checkout form
      checkoutStep: 1,
      checkoutData: {},
      
      // Merchant application form
      merchantApplicationData: {},
      
      // Actions
      setCheckoutStep: (step) => set({ checkoutStep: step }),
      
      updateCheckoutData: (data) => {
        const currentData = get().checkoutData;
        set({ checkoutData: { ...currentData, ...data } });
      },
      
      clearCheckoutData: () => set({ checkoutData: {}, checkoutStep: 1 }),
      
      updateMerchantApplicationData: (data) => {
        const currentData = get().merchantApplicationData;
        set({ merchantApplicationData: { ...currentData, ...data } });
      },
      
      clearMerchantApplicationData: () => set({ merchantApplicationData: {} }),
    }),
    {
      name: 'form-storage',
      storage: createJSONStorage(() => sessionStorage), // Use session storage for form data
    }
  )
);

// Performance Store (for caching and optimization)
interface PerformanceState {
  // Cache timestamps
  lastCacheUpdate: {
    products: number;
    categories: number;
    featuredProducts: number;
    user: number;
  };
  
  // Loading states
  loadingStates: {
    products: boolean;
    categories: boolean;
    cart: boolean;
    user: boolean;
  };
  
  // Actions
  updateCacheTimestamp: (key: keyof PerformanceState['lastCacheUpdate']) => void;
  setLoadingState: (key: keyof PerformanceState['loadingStates'], loading: boolean) => void;
  isCacheExpired: (key: keyof PerformanceState['lastCacheUpdate'], expireTime: number) => boolean;
}

export const usePerformanceStore = create<PerformanceState>((set, get) => ({
  lastCacheUpdate: {
    products: 0,
    categories: 0,
    featuredProducts: 0,
    user: 0,
  },
  
  loadingStates: {
    products: false,
    categories: false,
    cart: false,
    user: false,
  },
  
  updateCacheTimestamp: (key) => {
    set(state => ({
      lastCacheUpdate: {
        ...state.lastCacheUpdate,
        [key]: Date.now(),
      }
    }));
  },
  
  setLoadingState: (key, loading) => {
    set(state => ({
      loadingStates: {
        ...state.loadingStates,
        [key]: loading,
      }
    }));
  },
  
  isCacheExpired: (key, expireTime) => {
    const lastUpdate = get().lastCacheUpdate[key];
    return Date.now() - lastUpdate > expireTime;
  },
}));

// Export all stores
export {
  useAuthStore,
  useCartStore,
  useUIStore,
  usePreferencesStore,
  useProductsStore,
  useNotificationStore,
  useFormStore,
  usePerformanceStore,
};