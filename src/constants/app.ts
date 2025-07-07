export const APP_CONFIG = {
  name: 'CorePath Impact',
  description: 'Intentional, Deliberate, Structured Values Driven Parenting',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1',
    timeout: 10000,
  },
  wordpress: {
    apiUrl: process.env.NEXT_PUBLIC_WP_API_URL || 'https://your-wordpress-site.com/wp-json/wp/v2',
  },
  features: {
    courses: process.env.NEXT_PUBLIC_ENABLE_COURSES === 'true',
    merchant: process.env.NEXT_PUBLIC_ENABLE_MERCHANT === 'true',
  },
  payments: {
    stripePublishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    currency: 'KES',
  },
  analytics: {
    googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID,
  },
};

export const ROUTES = {
  // Public routes
  HOME: '/',
  ABOUT: '/about',
  CONTACT: '/contact',
  PRIVACY: '/privacy',
  TERMS: '/terms',
  
  // Auth routes
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  VERIFY_EMAIL: '/auth/verify-email',
  
  // User routes
  PROFILE: '/profile',
  ORDERS: '/orders',
  ORDER_DETAIL: '/orders/[id]',
  POINTS: '/points',
  
  // Product routes
  PRODUCTS: '/products',
  PRODUCT_DETAIL: '/products/[slug]',
  CATEGORIES: '/categories',
  CATEGORY_DETAIL: '/categories/[slug]',
  
  // Cart and checkout
  CART: '/cart',
  CHECKOUT: '/checkout',
  CHECKOUT_SUCCESS: '/checkout/success',
  CHECKOUT_CANCEL: '/checkout/cancel',
  
  // Courses (if enabled)
  COURSES: '/courses',
  COURSE_DETAIL: '/courses/[id]',
  MY_COURSES: '/my-courses',
  COURSE_LEARN: '/courses/[id]/learn',
  
  // Merchant (if enabled)
  MERCHANT_APPLY: '/merchant/apply',
  MERCHANT_DASHBOARD: '/merchant/dashboard',
  MERCHANT_ANALYTICS: '/merchant/analytics',
  MERCHANT_PAYOUTS: '/merchant/payouts',
  
  // Blog
  BLOG: '/blog',
  BLOG_POST: '/blog/[slug]',
  BLOG_CATEGORY: '/blog/category/[slug]',
  BLOG_TAG: '/blog/tag/[slug]',
  
  // Admin (if admin)
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_USERS: '/admin/users',
  ADMIN_PRODUCTS: '/admin/products',
  ADMIN_ORDERS: '/admin/orders',
  ADMIN_COURSES: '/admin/courses',
  ADMIN_MERCHANTS: '/admin/merchants',
} as const;

export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
} as const;

export const ORDER_STATUS_LABELS = {
  [ORDER_STATUS.PENDING]: 'Pending',
  [ORDER_STATUS.PROCESSING]: 'Processing',
  [ORDER_STATUS.SHIPPED]: 'Shipped',
  [ORDER_STATUS.DELIVERED]: 'Delivered',
  [ORDER_STATUS.CANCELLED]: 'Cancelled',
} as const;

export const ORDER_STATUS_COLORS = {
  [ORDER_STATUS.PENDING]: 'bg-yellow-100 text-yellow-800',
  [ORDER_STATUS.PROCESSING]: 'bg-blue-100 text-blue-800',
  [ORDER_STATUS.SHIPPED]: 'bg-purple-100 text-purple-800',
  [ORDER_STATUS.DELIVERED]: 'bg-green-100 text-green-800',
  [ORDER_STATUS.CANCELLED]: 'bg-red-100 text-red-800',
} as const;

export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed',
  REFUNDED: 'refunded',
} as const;

export const PAYMENT_STATUS_LABELS = {
  [PAYMENT_STATUS.PENDING]: 'Pending',
  [PAYMENT_STATUS.PROCESSING]: 'Processing',
  [PAYMENT_STATUS.COMPLETED]: 'Completed',
  [PAYMENT_STATUS.FAILED]: 'Failed',
  [PAYMENT_STATUS.REFUNDED]: 'Refunded',
} as const;

export const COURSE_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  ARCHIVED: 'archived',
} as const;

export const COURSE_DIFFICULTY = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate',
  ADVANCED: 'advanced',
} as const;

export const COURSE_DIFFICULTY_LABELS = {
  [COURSE_DIFFICULTY.BEGINNER]: 'Beginner',
  [COURSE_DIFFICULTY.INTERMEDIATE]: 'Intermediate',
  [COURSE_DIFFICULTY.ADVANCED]: 'Advanced',
} as const;

export const USER_ROLES = {
  CUSTOMER: 'customer',
  ADMIN: 'admin',
  MERCHANT: 'merchant',
} as const;

export const USER_ROLE_LABELS = {
  [USER_ROLES.CUSTOMER]: 'Customer',
  [USER_ROLES.ADMIN]: 'Administrator',
  [USER_ROLES.MERCHANT]: 'Merchant',
} as const;

export const MERCHANT_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  SUSPENDED: 'suspended',
} as const;

export const MERCHANT_STATUS_LABELS = {
  [MERCHANT_STATUS.PENDING]: 'Pending Review',
  [MERCHANT_STATUS.APPROVED]: 'Approved',
  [MERCHANT_STATUS.REJECTED]: 'Rejected',
  [MERCHANT_STATUS.SUSPENDED]: 'Suspended',
} as const;

export const PRODUCT_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DRAFT: 'draft',
} as const;

export const SHIPPING_METHODS = {
  STANDARD: 'standard',
  EXPRESS: 'express',
  OVERNIGHT: 'overnight',
} as const;

export const SHIPPING_METHOD_LABELS = {
  [SHIPPING_METHODS.STANDARD]: 'Standard Shipping (5-7 days)',
  [SHIPPING_METHODS.EXPRESS]: 'Express Shipping (2-3 days)',
  [SHIPPING_METHODS.OVERNIGHT]: 'Overnight Shipping (1 day)',
} as const;

export const PAYMENT_METHODS = {
  CARD: 'card',
  MOBILE_MONEY: 'mobile_money',
  BANK_TRANSFER: 'bank_transfer',
} as const;

export const PAYMENT_METHOD_LABELS = {
  [PAYMENT_METHODS.CARD]: 'Credit/Debit Card',
  [PAYMENT_METHODS.MOBILE_MONEY]: 'Mobile Money',
  [PAYMENT_METHODS.BANK_TRANSFER]: 'Bank Transfer',
} as const;

export const COUNTRIES = [
  { code: 'KE', name: 'Kenya' },
  { code: 'UG', name: 'Uganda' },
  { code: 'TZ', name: 'Tanzania' },
  { code: 'RW', name: 'Rwanda' },
  { code: 'NG', name: 'Nigeria' },
  { code: 'GH', name: 'Ghana' },
  { code: 'ZA', name: 'South Africa' },
  { code: 'US', name: 'United States' },
  { code: 'UK', name: 'United Kingdom' },
  { code: 'CA', name: 'Canada' },
] as const;

export const KENYAN_COUNTIES = [
  'Nairobi',
  'Mombasa',
  'Kisumu',
  'Nakuru',
  'Eldoret',
  'Kiambu',
  'Machakos',
  'Kajiado',
  'Murang\'a',
  'Nyeri',
  'Meru',
  'Embu',
  'Kakamega',
  'Bungoma',
  'Busia',
  'Siaya',
  'Kisii',
  'Nyamira',
  'Homa Bay',
  'Migori',
  'Kericho',
  'Bomet',
  'Nandi',
  'Baringo',
  'Laikipia',
  'Samburu',
  'Trans Nzoia',
  'Uasin Gishu',
  'Elgeyo-Marakwet',
  'West Pokot',
  'Turkana',
  'Marsabit',
  'Isiolo',
  'Garissa',
  'Wajir',
  'Mandera',
  'Lamu',
  'Tana River',
  'Kilifi',
  'Kwale',
  'Taita-Taveta',
  'Kitui',
  'Makueni',
  'Nyandarua',
  'Kirinyaga',
  'Tharaka-Nithi',
] as const;

export const AGE_GROUPS = [
  { value: '4-6', label: 'Early Childhood (4-6 years)' },
  { value: '7-9', label: 'Primary School (7-9 years)' },
  { value: '10-12', label: 'Upper Primary (10-12 years)' },
  { value: '13-15', label: 'Early Teens (13-15 years)' },
  { value: '16-18', label: 'Late Teens (16-18 years)' },
  { value: 'all', label: 'All Ages' },
] as const;

export const SORT_OPTIONS = [
  { value: 'created_at', label: 'Newest First' },
  { value: 'name', label: 'Name A-Z' },
  { value: 'price', label: 'Price Low to High' },
  { value: 'price_desc', label: 'Price High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'popular', label: 'Most Popular' },
] as const;

export const ITEMS_PER_PAGE_OPTIONS = [12, 24, 48, 96] as const;

export const DEFAULT_PAGINATION = {
  page: 1,
  per_page: 12,
} as const;

export const TOAST_DURATION = {
  SHORT: 3000,
  MEDIUM: 5000,
  LONG: 8000,
} as const;

export const LOCAL_STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_PREFERENCES: 'user_preferences',
  CART_ID: 'cart_id',
  RECENT_SEARCHES: 'recent_searches',
  THEME: 'theme',
} as const;

export const SESSION_STORAGE_KEYS = {
  CHECKOUT_DATA: 'checkout_data',
  REFERRAL_CODE: 'referral_code',
  RETURN_URL: 'return_url',
} as const;

export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
    VERIFY_EMAIL: '/auth/verify-email',
    RESEND_VERIFICATION: '/auth/resend-verification',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    CHANGE_PASSWORD: '/auth/change-password',
    CHECK_EMAIL: '/auth/check-email',
  },
  
  // Users
  USERS: {
    PROFILE: '/users/profile',
    POINTS: '/users/points',
    DEACTIVATE: '/users/account',
  },
  
  // Products
  PRODUCTS: {
    LIST: '/products',
    DETAIL: '/products',
    BY_SLUG: '/products/slug',
    FEATURED: '/products/featured',
    BY_CATEGORY: '/products/category',
    CATEGORIES: '/products/categories',
  },
  
  // Cart
  CART: {
    GET: '/cart',
    ADD: '/cart/add',
    UPDATE: '/cart/items',
    REMOVE: '/cart/items',
    CLEAR: '/cart/clear',
    SUMMARY: '/cart/summary',
    COUNT: '/cart/count',
    VALIDATE: '/cart/validate',
    SHIPPING_RATES: '/cart/shipping-rates',
  },
  
  // Orders
  ORDERS: {
    CREATE: '/orders',
    LIST: '/orders',
    DETAIL: '/orders',
    BY_NUMBER: '/orders/number',
    CANCEL: '/orders',
    PAYMENTS: '/orders',
    PAYMENT_INTENT: '/orders',
  },
  
  // Courses
  COURSES: {
    LIST: '/courses',
    DETAIL: '/courses',
    FEATURED: '/courses/featured',
    POPULAR: '/courses/popular',
    ENROLL: '/courses',
    MY_ENROLLMENTS: '/courses/enrollments/my',
    PROGRESS: '/courses',
    MY_LEARNING: '/courses/analytics/my-learning',
  },
  
  // Merchants
  MERCHANTS: {
    APPLY: '/merchants/apply',
    PROFILE: '/merchants/profile',
    APPLICATION_STATUS: '/merchants/application/status',
    ANALYTICS: '/merchants/analytics',
    REFERRALS: '/merchants/referrals',
    PAYOUTS: '/merchants/payouts',
  },
} as const;

export const ERROR_MESSAGES = {
  NETWORK: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You need to be logged in to access this.',
  FORBIDDEN: 'You don\'t have permission to access this.',
  NOT_FOUND: 'The requested resource was not found.',
  SERVER_ERROR: 'Server error. Please try again later.',
  VALIDATION: 'Please check your input and try again.',
  GENERIC: 'Something went wrong. Please try again.',
} as const;

export const SUCCESS_MESSAGES = {
  LOGIN: 'Successfully logged in!',
  REGISTER: 'Account created successfully!',
  LOGOUT: 'Successfully logged out!',
  PROFILE_UPDATED: 'Profile updated successfully!',
  PASSWORD_CHANGED: 'Password changed successfully!',
  EMAIL_VERIFIED: 'Email verified successfully!',
  CART_ITEM_ADDED: 'Item added to cart!',
  CART_ITEM_UPDATED: 'Cart updated!',
  CART_ITEM_REMOVED: 'Item removed from cart!',
  ORDER_PLACED: 'Order placed successfully!',
  ORDER_CANCELLED: 'Order cancelled successfully!',
} as const;

export const META_DEFAULTS = {
  TITLE: 'CorePath Impact - Values Driven Parenting',
  DESCRIPTION: 'Intentional, Deliberate, Structured Values Driven Parenting. Equip yourself with the tools and knowledge to raise children of conviction, compassion, and calling.',
  KEYWORDS: 'parenting, values, children, family, education, character building, moral development',
  AUTHOR: 'CorePath Impact',
  OG_IMAGE: '/images/og-image.jpg',
} as const;