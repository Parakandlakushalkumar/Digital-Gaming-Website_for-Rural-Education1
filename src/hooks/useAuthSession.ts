import { useCallback } from 'react';
import { authAPI } from '@/api/authAPI.js';

type AuthRole = 'student' | 'teacher';

const STORAGE_KEYS: Record<AuthRole, string> = {
  student: 'studentAuth',
  teacher: 'teacherAuth',
};

export const useAuthSession = (role: AuthRole) => {
  const storageKey = STORAGE_KEYS[role];

  const validateSession = useCallback(async (): Promise<boolean> => {
    const saved = localStorage.getItem(storageKey);
    if (!saved) return false;

    try {
      await authAPI.refreshToken();
      return true;
    } catch {
      localStorage.removeItem(storageKey);
      return false;
    }
  }, [storageKey]);

  const logout = useCallback(async (onComplete?: () => void) => {
    try {
      await authAPI.logout();
    } catch {
      // Clear local state even if server logout fails
    } finally {
      localStorage.removeItem(storageKey);
      onComplete?.();
    }
  }, [storageKey]);

  return { validateSession, logout, storageKey };
};
