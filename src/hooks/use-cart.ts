import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { apiClient } from '@/lib/api-client';
import { useCartStore, useAuthStore } from '@/store';
import { API_ENDPOINTS, SUCCESS_MESSAGES } from '@/constants/app';
import type {
  Cart,
  CartItem,
  CartItemAdd,
  CartItemUpdate,
  CheckoutSummary,
  ShippingRate,
  Product,
  Address,
} from '@/types/api';

// Main cart hook
export function useCart() {
  const queryClient = useQueryClient();
  const { cart, setCart, clearCart, addOptimisticItem, removeOptimisticItem, setOpen } = useCartStore();
  const { isAuthenticated } = useAuthStore();

  // Get cart query
  const cartQuery = useQuery({
    queryKey: ['cart'],
    queryFn: async (): Promise<Cart> => {
      const response = await apiClient.get(API_ENDPOINTS.CART.GET);
      return response.data;
    },
    enabled: isAuthenticated,
    staleTime: 1 * 60 * 1000, // 1 minute
    retry: 1,
    refetchOnWindowFocus: false,
  });

  // Update store when query data changes
  React.useEffect(() => {
    if (cartQuery.data) {
      setCart(cartQuery.data);
    }
  }, [cartQuery.data, setCart]);

  // Add to cart mutation
  const addToCartMutation = useMutation({
    mutationFn: async (item: CartItemAdd): Promise<CartItem> => {
      const response = await apiClient.post(API_ENDPOINTS.CART.ADD, item);
      return response.data;
    },
    onMutate: async (newItem) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['cart'] });

      // Optimistic update - add product info if we have it
      const product = queryClient.getQueryData<Product>(['product', newItem.product_id]);
      if (product) {
        addOptimisticItem(product, newItem.quantity, newItem.variant_id);
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success(SUCCESS_MESSAGES.CART_ITEM_ADDED);
      setOpen(true); // Open cart sidebar
    },
    onError: (error: any, variables) => {
      // Revert optimistic update
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      const message = error.response?.data?.message || 'Failed to add item to cart';
      toast.error(message);
    },
  });

  // Update cart item mutation
  const updateCartItemMutation = useMutation({
    mutationFn: async ({ itemId, quantity }: { itemId: number; quantity: number }): Promise<CartItem | null> => {
      const response = await apiClient.put(`${API_ENDPOINTS.CART.UPDATE}/${itemId}`, { quantity });
      return response.data;
    },
    onMutate: async ({ itemId, quantity }) => {
      await queryClient.cancelQueries({ queryKey: ['cart'] });

      // Optimistic update
      const previousCart = queryClient.getQueryData<Cart>(['cart']);
      if (previousCart) {
        const updatedItems = previousCart.items.map(item => 
          item.id === itemId 
            ? { ...item, quantity, total_price: item.unit_price * quantity }
            : item
        );
        
        const updatedCart = {
          ...previousCart,
          items: quantity === 0 ? updatedItems.filter(item => item.id !== itemId) : updatedItems,
          item_count: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
          subtotal: updatedItems.reduce((sum, item) => sum + item.total_price, 0),
        };
        
        queryClient.setQueryData(['cart'], updatedCart);
        setCart(updatedCart);
      }

      return { previousCart };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success(SUCCESS_MESSAGES.CART_ITEM_UPDATED);
    },
    onError: (error: any, variables, context) => {
      // Revert optimistic update
      if (context?.previousCart) {
        queryClient.setQueryData(['cart'], context.previousCart);
        setCart(context.previousCart);
      }
      const message = error.response?.data?.message || 'Failed to update cart item';
      toast.error(message);
    },
  });

  // Remove from cart mutation
  const removeFromCartMutation = useMutation({
    mutationFn: async (itemId: number): Promise<void> => {
      await apiClient.delete(`${API_ENDPOINTS.CART.REMOVE}/${itemId}`);
    },
    onMutate: async (itemId) => {
      await queryClient.cancelQueries({ queryKey: ['cart'] });

      // Optimistic update
      const previousCart = queryClient.getQueryData<Cart>(['cart']);
      if (previousCart) {
        const updatedItems = previousCart.items.filter(item => item.id !== itemId);
        const updatedCart = {
          ...previousCart,
          items: updatedItems,
          item_count: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
          subtotal: updatedItems.reduce((sum, item) => sum + item.total_price, 0),
        };
        
        queryClient.setQueryData(['cart'], updatedCart);
        setCart(updatedCart);
      }

      return { previousCart };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success(SUCCESS_MESSAGES.CART_ITEM_REMOVED);
    },
    onError: (error: any, variables, context) => {
      // Revert optimistic update
      if (context?.previousCart) {
        queryClient.setQueryData(['cart'], context.previousCart);
        setCart(context.previousCart);
      }
      const message = error.response?.data?.message || 'Failed to remove item from cart';
      toast.error(message);
    },
  });

  // Clear cart mutation
  const clearCartMutation = useMutation({
    mutationFn: async (): Promise<void> => {
      await apiClient.delete(API_ENDPOINTS.CART.CLEAR);
    },
    onSuccess: () => {
      clearCart();
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success('Cart cleared');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to clear cart';
      toast.error(message);
    },
  });

  // Quick add to cart function
  const addToCart = (product: Product, quantity: number = 1, variantId?: number) => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      return;
    }

    addToCartMutation.mutate({
      product_id: product.id,
      variant_id: variantId,
      quantity,
    });
  };

  return {
    // Data
    cart: cartQuery.data || cart,
    cartItems: cartQuery.data?.items || [],
    itemCount: cartQuery.data?.item_count || 0,
    subtotal: cartQuery.data?.subtotal || 0,
    
    // Loading states
    isLoading: cartQuery.isLoading,
    isError: cartQuery.isError,
    error: cartQuery.error,
    
    // Actions
    addToCart,
    updateCartItem: updateCartItemMutation.mutate,
    removeFromCart: removeFromCartMutation.mutate,
    clearCart: clearCartMutation.mutate,
    refetch: cartQuery.refetch,
    
    // Mutation states
    isAddingToCart: addToCartMutation.isPending,
    isUpdatingItem: updateCartItemMutation.isPending,
    isRemovingItem: removeFromCartMutation.isPending,
    isClearingCart: clearCartMutation.isPending,
    
    // Helpers
    isEmpty: (cartQuery.data?.items?.length || 0) === 0,
    hasItems: (cartQuery.data?.items?.length || 0) > 0,
  };
}

// Cart count hook (for header display)
export function useCartCount() {
  const { isAuthenticated } = useAuthStore();

  return useQuery({
    queryKey: ['cart', 'count'],
    queryFn: async (): Promise<{ item_count: number; total_items: number }> => {
      const response = await apiClient.get(API_ENDPOINTS.CART.COUNT);
      return response.data;
    },
    enabled: isAuthenticated,
    staleTime: 30 * 1000, // 30 seconds
    refetchInterval: 60 * 1000, // Refetch every minute
  });
}

// Cart summary hook (for checkout)
export function useCartSummary() {
  const { isAuthenticated } = useAuthStore();

  return useQuery({
    queryKey: ['cart', 'summary'],
    queryFn: async (): Promise<CheckoutSummary> => {
      const response = await apiClient.get(API_ENDPOINTS.CART.SUMMARY);
      return response.data;
    },
    enabled: isAuthenticated,
    staleTime: 1 * 60 * 1000, // 1 minute
  });
}

// Cart validation hook
export function useCartValidation() {
  const { isAuthenticated } = useAuthStore();

  const validateCartMutation = useMutation({
    mutationFn: async (): Promise<{
      is_valid: boolean;
      errors: string[];
      warnings: string[];
      cart_summary: any;
    }> => {
      const response = await apiClient.post(API_ENDPOINTS.CART.VALIDATE);
      return response.data;
    },
  });

  return {
    validateCart: validateCartMutation.mutate,
    validateCartAsync: validateCartMutation.mutateAsync,
    isValidating: validateCartMutation.isPending,
    validationResult: validateCartMutation.data,
    validationError: validateCartMutation.error,
  };
}

// Shipping rates hook
export function useShippingRates(shippingAddress?: Address) {
  const shippingRatesMutation = useMutation({
    mutationFn: async (address: Address): Promise<ShippingRate[]> => {
      const response = await apiClient.post(API_ENDPOINTS.CART.SHIPPING_RATES, {
        shipping_address: address,
      });
      return response.data;
    },
  });

  React.useEffect(() => {
    if (shippingAddress) {
      shippingRatesMutation.mutate(shippingAddress);
    }
  }, [shippingAddress]);

  return {
    shippingRates: shippingRatesMutation.data || [],
    isLoadingRates: shippingRatesMutation.isPending,
    ratesError: shippingRatesMutation.error,
    calculateRates: shippingRatesMutation.mutate,
  };
}

// Cart sync hook (sync prices with current product prices)
export function useCartSync() {
  const queryClient = useQueryClient();

  const syncCartMutation = useMutation({
    mutationFn: async (): Promise<{
      message: string;
      updated_items: number;
      success: boolean;
    }> => {
      const response = await apiClient.post(API_ENDPOINTS.CART.SYNC_PRICES);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      if (data.updated_items > 0) {
        toast.success(`Cart updated - ${data.updated_items} items had price changes`);
      }
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to sync cart';
      toast.error(message);
    },
  });

  return {
    syncCart: syncCartMutation.mutate,
    isSyncing: syncCartMutation.isPending,
    syncResult: syncCartMutation.data,
  };
}

// Cart item helpers
export function useCartItem(itemId: number) {
  const { cart } = useCart();
  
  const cartItem = cart?.items.find(item => item.id === itemId);
  
  const { updateCartItem, removeFromCart } = useCart();
  
  const updateQuantity = (quantity: number) => {
    if (quantity === 0) {
      removeFromCart(itemId);
    } else {
      updateCartItem({ itemId, quantity });
    }
  };
  
  const incrementQuantity = () => {
    if (cartItem) {
      updateQuantity(cartItem.quantity + 1);
    }
  };
  
  const decrementQuantity = () => {
    if (cartItem && cartItem.quantity > 1) {
      updateQuantity(cartItem.quantity - 1);
    } else {
      removeFromCart(itemId);
    }
  };
  
  return {
    cartItem,
    updateQuantity,
    incrementQuantity,
    decrementQuantity,
    remove: () => removeFromCart(itemId),
  };
}

// Cart totals calculator
export function useCartTotals() {
  const { cart } = useCart();
  
  const calculateTotals = () => {
    if (!cart || !cart.items.length) {
      return {
        subtotal: 0,
        itemCount: 0,
        totalItems: 0,
        averageItemPrice: 0,
      };
    }
    
    const subtotal = cart.items.reduce((sum, item) => sum + item.total_price, 0);
    const itemCount = cart.items.length;
    const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    const averageItemPrice = subtotal / totalItems;
    
    return {
      subtotal,
      itemCount,
      totalItems,
      averageItemPrice,
    };
  };
  
  return calculateTotals();
}

// Add React import for useEffect
import React from 'react';