import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { apiClient } from '@/lib/api-client';
import { useAuthStore } from '@/store';
import { ROUTES, SUCCESS_MESSAGES, ERROR_MESSAGES, API_ENDPOINTS } from '@/constants/app';
import type {
  User,
  UserLoginRequest,
  UserRegisterRequest,
  TokenResponse,
  RefreshTokenRequest,
  PasswordResetRequest,
  PasswordResetConfirm,
  ChangePasswordRequest,
  EmailVerificationRequest,
  ResendVerificationRequest,
  MessageResponse,
  UserProfile,
} from '@/types/api';

// Auth hook for login, register, logout
export function useAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user, isAuthenticated, login, logout, setLoading } = useAuthStore();

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async (data: UserLoginRequest): Promise<TokenResponse> => {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, data);
      return response.data;
    },
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: (data) => {
      login(data.user, {
        access_token: data.access_token,
        refresh_token: data.refresh_token,
      });
      
      toast.success(SUCCESS_MESSAGES.LOGIN);
      queryClient.invalidateQueries({ queryKey: ['user'] });
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      
      // Redirect to intended page or dashboard
      const returnUrl = sessionStorage.getItem('returnUrl') || ROUTES.HOME;
      sessionStorage.removeItem('returnUrl');
      router.push(returnUrl);
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || ERROR_MESSAGES.GENERIC;
      toast.error(message);
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: async (data: UserRegisterRequest): Promise<TokenResponse> => {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.REGISTER, data);
      return response.data;
    },
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: (data) => {
      login(data.user, {
        access_token: data.access_token,
        refresh_token: data.refresh_token,
      });
      
      toast.success(SUCCESS_MESSAGES.REGISTER);
      queryClient.invalidateQueries({ queryKey: ['user'] });
      
      // Redirect to verify email or dashboard
      router.push(ROUTES.VERIFY_EMAIL);
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || ERROR_MESSAGES.GENERIC;
      toast.error(message);
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: async () => {
      await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
    },
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      logout();
      queryClient.clear();
      toast.success(SUCCESS_MESSAGES.LOGOUT);
      router.push(ROUTES.HOME);
    },
    onError: () => {
      // Even if the API call fails, we should still logout locally
      logout();
      queryClient.clear();
      router.push(ROUTES.HOME);
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  return {
    // State
    user,
    isAuthenticated,
    isLoading: useAuthStore((state) => state.isLoading),
    
    // Actions
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout: logoutMutation.mutate,
    
    // Mutation states
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    
    // Errors
    loginError: loginMutation.error,
    registerError: registerMutation.error,
  };
}

// User profile hook
export function useUser() {
  const { user, isAuthenticated, updateUser } = useAuthStore();
  
  const userQuery = useQuery({
    queryKey: ['user'],
    queryFn: async (): Promise<User> => {
      const response = await apiClient.get(API_ENDPOINTS.AUTH.ME);
      return response.data;
    },
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });

  const updateProfileMutation = useMutation({
    mutationFn: async (data: Partial<UserProfile>): Promise<UserProfile> => {
      const response = await apiClient.put(API_ENDPOINTS.USERS.PROFILE, data);
      return response.data;
    },
    onSuccess: (data) => {
      updateUser(data);
      toast.success(SUCCESS_MESSAGES.PROFILE_UPDATED);
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || ERROR_MESSAGES.GENERIC;
      toast.error(message);
    },
  });

  return {
    user: userQuery.data || user,
    isLoading: userQuery.isLoading,
    error: userQuery.error,
    updateProfile: updateProfileMutation.mutate,
    isUpdatingProfile: updateProfileMutation.isPending,
    refetch: userQuery.refetch,
  };
}

// Password management hooks
export function usePasswordManagement() {
  const router = useRouter();

  // Forgot password
  const forgotPasswordMutation = useMutation({
    mutationFn: async (data: PasswordResetRequest): Promise<MessageResponse> => {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, data);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      router.push(ROUTES.LOGIN);
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || ERROR_MESSAGES.GENERIC;
      toast.error(message);
    },
  });

  // Reset password
  const resetPasswordMutation = useMutation({
    mutationFn: async (data: PasswordResetConfirm): Promise<MessageResponse> => {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, data);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      router.push(ROUTES.LOGIN);
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || ERROR_MESSAGES.GENERIC;
      toast.error(message);
    },
  });

  // Change password
  const changePasswordMutation = useMutation({
    mutationFn: async (data: ChangePasswordRequest): Promise<MessageResponse> => {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, data);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(SUCCESS_MESSAGES.PASSWORD_CHANGED);
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || ERROR_MESSAGES.GENERIC;
      toast.error(message);
    },
  });

  return {
    forgotPassword: forgotPasswordMutation.mutate,
    resetPassword: resetPasswordMutation.mutate,
    changePassword: changePasswordMutation.mutate,
    
    isForgettingPassword: forgotPasswordMutation.isPending,
    isResettingPassword: resetPasswordMutation.isPending,
    isChangingPassword: changePasswordMutation.isPending,
    
    forgotPasswordError: forgotPasswordMutation.error,
    resetPasswordError: resetPasswordMutation.error,
    changePasswordError: changePasswordMutation.error,
  };
}

// Email verification hooks
export function useEmailVerification() {
  const { updateUser } = useAuthStore();
  const queryClient = useQueryClient();

  // Verify email
  const verifyEmailMutation = useMutation({
    mutationFn: async (data: EmailVerificationRequest): Promise<MessageResponse> => {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.VERIFY_EMAIL, data);
      return response.data;
    },
    onSuccess: (data) => {
      updateUser({ is_verified: true });
      queryClient.invalidateQueries({ queryKey: ['user'] });
      toast.success(SUCCESS_MESSAGES.EMAIL_VERIFIED);
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || ERROR_MESSAGES.GENERIC;
      toast.error(message);
    },
  });

  // Resend verification
  const resendVerificationMutation = useMutation({
    mutationFn: async (data: ResendVerificationRequest): Promise<MessageResponse> => {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.RESEND_VERIFICATION, data);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || ERROR_MESSAGES.GENERIC;
      toast.error(message);
    },
  });

  return {
    verifyEmail: verifyEmailMutation.mutate,
    resendVerification: resendVerificationMutation.mutate,
    
    isVerifyingEmail: verifyEmailMutation.isPending,
    isResendingVerification: resendVerificationMutation.isPending,
    
    verifyEmailError: verifyEmailMutation.error,
    resendVerificationError: resendVerificationMutation.error,
  };
}

// Check email availability hook
export function useEmailCheck() {
  const checkEmailMutation = useMutation({
    mutationFn: async (email: string): Promise<{ email: string; available: boolean; message: string }> => {
      const response = await apiClient.get(`${API_ENDPOINTS.AUTH.CHECK_EMAIL}/${email}`);
      return response.data;
    },
  });

  return {
    checkEmail: checkEmailMutation.mutate,
    checkEmailAsync: checkEmailMutation.mutateAsync,
    isChecking: checkEmailMutation.isPending,
    result: checkEmailMutation.data,
    error: checkEmailMutation.error,
  };
}

// Auth guard hook for protected routes
export function useAuthGuard(requiredRole?: string) {
  const { isAuthenticated, user } = useAuthStore();
  const router = useRouter();

  const checkAuth = () => {
    if (!isAuthenticated) {
      // Store current URL for redirect after login
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('returnUrl', window.location.pathname);
      }
      router.push(ROUTES.LOGIN);
      return false;
    }

    if (requiredRole && user?.role !== requiredRole) {
      router.push(ROUTES.HOME);
      toast.error(ERROR_MESSAGES.FORBIDDEN);
      return false;
    }

    return true;
  };

  return {
    isAuthenticated,
    user,
    checkAuth,
    hasRole: (role: string) => user?.role === role,
    isAdmin: user?.role === 'admin',
    isMerchant: user?.role === 'merchant',
    isCustomer: user?.role === 'customer',
  };
}

// User points hook
export function useUserPoints() {
  const { isAuthenticated } = useAuthStore();

  const pointsQuery = useQuery({
    queryKey: ['user', 'points'],
    queryFn: async (): Promise<{
      current_balance: number;
      total_earned: number;
      total_spent: number;
      available_for_redemption: number;
    }> => {
      const response = await apiClient.get(API_ENDPOINTS.USERS.POINTS);
      return response.data;
    },
    enabled: isAuthenticated,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  return {
    points: pointsQuery.data,
    isLoading: pointsQuery.isLoading,
    error: pointsQuery.error,
    refetch: pointsQuery.refetch,
  };
}

// Account deactivation hook
export function useAccountDeactivation() {
  const { logout } = useAuthStore();
  const router = useRouter();
  const queryClient = useQueryClient();

  const deactivateAccountMutation = useMutation({
    mutationFn: async (): Promise<MessageResponse> => {
      const response = await apiClient.delete(API_ENDPOINTS.USERS.DEACTIVATE);
      return response.data;
    },
    onSuccess: (data) => {
      logout();
      queryClient.clear();
      toast.success(data.message);
      router.push(ROUTES.HOME);
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || ERROR_MESSAGES.GENERIC;
      toast.error(message);
    },
  });

  return {
    deactivateAccount: deactivateAccountMutation.mutate,
    isDeactivating: deactivateAccountMutation.isPending,
    error: deactivateAccountMutation.error,
  };
}