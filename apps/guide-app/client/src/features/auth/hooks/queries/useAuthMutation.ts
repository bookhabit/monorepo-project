import { useMutation } from '@tanstack/react-query';
import { authService } from '../../services/auth.service';

/** Data Hook — useMutation 래핑만 담당 */

export function useLoginMutation() {
  return useMutation({ mutationFn: authService.login });
}

export function useSignupMutation() {
  return useMutation({ mutationFn: authService.signup });
}

export function useLogoutMutation() {
  return useMutation({ mutationFn: authService.logout });
}
