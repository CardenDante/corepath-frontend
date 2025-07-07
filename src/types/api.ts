// API Response Types
export interface ApiResponse<T = any> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  per_page: number;
  pages: number;
  has_prev: boolean;
  has_next: boolean;
}

// User Types
export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  role: 'customer' | 'admin' | 'merchant';
  is_active: boolean;
  is_verified: boolean;
  created_at: string;
  last_login?: string;
}

export interface UserProfile {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  role: string;
  is_active: boolean;
  is_verified: boolean;
  bio?: string;
  address_line_1?: string;
  address_line_2?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country?: string;
  newsletter_subscribed: boolean;
  email_notifications: boolean;
  sms_notifications: boolean;
  current_points_balance: number;
  total_points_earned: number;
  total_points_spent: number;
  total_orders: number;
  total_spent: number;
}

// Auth Types
export interface UserLoginRequest {
  email: string;
  password: string;
  remember_me?: boolean;
}

export interface UserRegisterRequest {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone?: string;
}

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  user: User;
}

export interface RefreshTokenRequest {
  refresh_token: string;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetConfirm {
  token: string;
  new_password: string;
  confirm_password: string;
}

export interface ChangePasswordRequest {
  current_password: string;
  new_password: string;
  confirm_password: string;
}

export interface EmailVerificationRequest {
  token: string;
}

export interface ResendVerificationRequest {
  email: string;
}

export interface MessageResponse {
  message: string;
  success: boolean;
}

export interface UserResponse {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  role: string;
  is_active: boolean;
  is_verified: boolean;
  created_at: string;
}

// Product Types
export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  parent_id?: number;
  icon?: string;
  sort_order: number;
  is_active: boolean;
  children?: Category[];
}

export interface CategoryCreate {
  name: string;
  description?: string;
  parent_id?: number;
  icon?: string;
  sort_order?: number;
  is_active?: boolean;
  meta_title?: string;
  meta_description?: string;
}

export interface CategoryUpdate {
  name?: string;
  description?: string;
  parent_id?: number;
  icon?: string;
  sort_order?: number;
  is_active?: boolean;
  meta_title?: string;
  meta_description?: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  short_description?: string;
  description?: string;
  price: number;
  compare_at_price?: number;
  discount_percentage?: number;
  status: 'active' | 'inactive' | 'draft';
  is_featured: boolean;
  is_in_stock: boolean;
  primary_image?: string;
  category_name: string;
  view_count: number;
  purchase_count: number;
  created_at: string;
}

export interface ProductDetail extends Product {
  sku?: string;
  inventory_count: number;
  track_inventory: boolean;
  allow_backorder: boolean;
  is_digital: boolean;
  weight?: number;
  dimensions?: any;
  tags?: string[];
  images: ProductImage[];
  variants: ProductVariant[];
  category: Category;
  meta_title?: string;
  meta_description?: string;
}

export interface ProductImage {
  id: number;
  image_url: string;
  alt_text?: string;
  caption?: string;
  is_primary: boolean;
  sort_order: number;
}

export interface ProductVariant {
  id: number;
  name: string;
  sku?: string;
  price?: number;
  inventory_count: number;
  is_active: boolean;
  is_in_stock: boolean;
  attributes: any;
}

export interface ProductCreate {
  name: string;
  price: number;
  category_id: number;
  short_description?: string;
  description?: string;
  sku?: string;
  compare_at_price?: number;
  inventory_count?: number;
  track_inventory?: boolean;
  allow_backorder?: boolean;
  is_featured?: boolean;
  is_digital?: boolean;
  weight?: number;
  dimensions?: any;
  tags?: string[];
  meta_title?: string;
  meta_description?: string;
}

export interface ProductUpdate {
  name?: string;
  price?: number;
  category_id?: number;
  short_description?: string;
  description?: string;
  sku?: string;
  compare_at_price?: number;
  inventory_count?: number;
  track_inventory?: boolean;
  allow_backorder?: boolean;
  is_featured?: boolean;
  is_digital?: boolean;
  weight?: number;
  dimensions?: any;
  tags?: string[];
  meta_title?: string;
  meta_description?: string;
}

// Cart Types
export interface CartItem {
  id: number;
  product_id: number;
  product_name: string;
  product_slug: string;
  product_image?: string;
  variant_id?: number;
  variant_name?: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  is_available: boolean;
  created_at: string;
}

export interface Cart {
  id: number;
  user_id: number;
  items: CartItem[];
  subtotal: number;
  item_count: number;
  updated_at: string;
}

export interface CartItemAdd {
  product_id: number;
  variant_id?: number;
  quantity: number;
}

export interface CartItemUpdate {
  quantity: number;
}

// Order Types
export interface Address {
  line_1: string;
  line_2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

export interface ShippingAddress extends Address {}
export interface BillingAddress extends Address {}

export interface OrderItem {
  id: number;
  product_id: number;
  product_name: string;
  product_sku?: string;
  variant_id?: number;
  variant_name?: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  product_snapshot: any;
}

export interface OrderItemCreate {
  product_id: number;
  variant_id?: number;
  quantity: number;
}

export interface Order {
  id: number;
  order_number: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  customer_name: string;
  customer_email: string;
  item_count: number;
  total_amount: number;
  currency: string;
  is_paid: boolean;
  payment_status: string;
  created_at: string;
}

export interface OrderDetail extends Order {
  items: OrderItem[];
  shipping_address: ShippingAddress;
  billing_address: BillingAddress;
  shipping_method: string;
  subtotal: number;
  tax_amount: number;
  shipping_amount: number;
  discount_amount: number;
  points_discount: number;
  notes?: string;
  is_gift: boolean;
  gift_message?: string;
  tracking_number?: string;
}

export interface OrderCreate {
  items: OrderItemCreate[];
  shipping_address: ShippingAddress;
  billing_address?: BillingAddress;
  shipping_method: string;
  payment_method: string;
  use_points?: number;
  coupon_code?: string;
  notes?: string;
  is_gift?: boolean;
  gift_message?: string;
}

export interface PaymentCreate {
  order_id: number;
  payment_method: string;
  amount?: number;
}

export interface PaymentIntent {
  client_secret: string;
  amount: number;
  currency: string;
  payment_method_types: string[];
}

export interface ShippingRate {
  method: string;
  name: string;
  description: string;
  cost: number;
  estimated_days: number;
}

export interface CheckoutSummary {
  items: CartItem[];
  subtotal: number;
  tax_amount: number;
  shipping_amount: number;
  discount_amount: number;
  points_discount: number;
  total_amount: number;
  available_shipping_methods: ShippingRate[];
  points_available: number;
  points_value: number;
}

// Course Types (if enabled)
export interface Course {
  id: number;
  title: string;
  slug: string;
  description: string;
  thumbnail_url?: string;
  price: number;
  difficulty_level: 'beginner' | 'intermediate' | 'advanced';
  age_group: string;
  duration_hours: number;
  is_featured: boolean;
  rating_average: number;
  rating_count: number;
  enrollment_count: number;
  status: 'draft' | 'published' | 'archived';
  created_at: string;
}

export interface CourseEnrollment {
  id: number;
  course_id: number;
  course: Course;
  status: 'active' | 'completed' | 'suspended';
  progress_percentage: number;
  enrolled_at: string;
  completed_at?: string;
  last_accessed_at?: string;
}

export interface CourseModule {
  id: number;
  course_id: number;
  title: string;
  description?: string;
  sort_order: number;
  lessons: CourseLesson[];
}

export interface CourseLesson {
  id: number;
  module_id: number;
  title: string;
  content?: string;
  video_url?: string;
  duration_minutes: number;
  sort_order: number;
  is_free: boolean;
}

// Merchant Types (if enabled)
export interface Merchant {
  id: number;
  user_id: number;
  business_name: string;
  business_type?: string;
  referral_code: string;
  commission_rate: number;
  total_referrals: number;
  successful_referrals: number;
  total_earnings: number;
  pending_earnings: number;
  status: 'pending' | 'approved' | 'rejected' | 'suspended';
  is_active: boolean;
  created_at: string;
}

export interface MerchantApplication {
  business_name: string;
  business_type: string;
  business_description?: string;
  contact_person: string;
  business_email: string;
  business_phone?: string;
  business_address?: string;
  tax_id?: string;
  business_license?: string;
  payout_method: string;
  payout_details: any;
  application_notes?: string;
}

// Blog Types (WordPress)
export interface BlogPost {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  slug: string;
  date: string;
  modified: string;
  featured_media: number;
  author: number;
  categories: number[];
  tags: number[];
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
    }>;
    author?: Array<{
      name: string;
      avatar_urls: {
        [key: string]: string;
      };
    }>;
  };
}

export interface BlogCategory {
  id: number;
  count: number;
  description: string;
  name: string;
  slug: string;
}

export interface BlogTag {
  id: number;
  count: number;
  description: string;
  name: string;
  slug: string;
}

// Error Types
export interface ValidationError {
  loc: (string | number)[];
  msg: string;
  type: string;
}

export interface HTTPValidationError {
  detail: ValidationError[];
}

// Utility Types
export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'refunded';
export type UserRole = 'customer' | 'admin' | 'merchant';
export type CourseStatus = 'draft' | 'published' | 'archived';
export type MerchantStatus = 'pending' | 'approved' | 'rejected' | 'suspended';