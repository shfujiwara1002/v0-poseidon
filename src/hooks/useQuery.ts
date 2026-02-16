import { useState, useEffect, useCallback, useRef } from 'react';

export interface QueryState<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
  isRefetching: boolean;
  isSuccess: boolean;
  isError: boolean;
}

export interface UseQueryOptions<T> {
  enabled?: boolean;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  refetchInterval?: number;
  retry?: number;
  retryDelay?: number;
}

export function useQuery<T>(
  _key: string,
  queryFn: () => Promise<T>,
  options: UseQueryOptions<T> = {}
) {
  const {
    enabled = true,
    onSuccess,
    onError,
    refetchInterval,
    retry = 0,
    retryDelay = 1000
  } = options;

  const [state, setState] = useState<QueryState<T>>({
    data: null,
    error: null,
    isLoading: enabled,
    isRefetching: false,
    isSuccess: false,
    isError: false
  });

  const retryCountRef = useRef(0);
  const isMountedRef = useRef(true);

  const execute = useCallback(
    async (isRefetch = false) => {
      // Don't execute if component unmounted
      if (!isMountedRef.current) return;

      setState(prev => ({
        ...prev,
        isLoading: !isRefetch,
        isRefetching: isRefetch,
        error: null
      }));

      try {
        const data = await queryFn();

        // Only update if still mounted
        if (isMountedRef.current) {
          setState({
            data,
            error: null,
            isLoading: false,
            isRefetching: false,
            isSuccess: true,
            isError: false
          });
          onSuccess?.(data);
          retryCountRef.current = 0;
        }
      } catch (error) {
        const err = error instanceof Error ? error : new Error('Unknown error');

        // Retry logic
        if (retryCountRef.current < retry) {
          retryCountRef.current++;
          setTimeout(() => execute(isRefetch), retryDelay);
          return;
        }

        // Only update if still mounted
        if (isMountedRef.current) {
          setState(prev => ({
            ...prev,
            error: err,
            isLoading: false,
            isRefetching: false,
            isSuccess: false,
            isError: true
          }));
          onError?.(err);
          retryCountRef.current = 0;
        }
      }
    },
    [queryFn, onSuccess, onError, retry, retryDelay]
  );

  // Initial fetch
  useEffect(() => {
    if (!enabled) return;
    execute(false);
  }, [enabled, execute]);

  // Auto-refetch interval
  useEffect(() => {
    if (!refetchInterval || !enabled) return;

    const interval = setInterval(() => {
      execute(true);
    }, refetchInterval);

    return () => clearInterval(interval);
  }, [refetchInterval, enabled, execute]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const refetch = useCallback(() => {
    return execute(true);
  }, [execute]);

  return {
    ...state,
    refetch
  };
}

/**
 * Hook for mutations (POST, PUT, DELETE)
 */
export interface MutationState<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

export interface UseMutationOptions<T, V> {
  onSuccess?: (data: T, variables: V) => void;
  onError?: (error: Error, variables: V) => void;
}

export function useMutation<T, V = void>(
  mutationFn: (variables: V) => Promise<T>,
  options: UseMutationOptions<T, V> = {}
) {
  const { onSuccess, onError } = options;

  const [state, setState] = useState<MutationState<T>>({
    data: null,
    error: null,
    isLoading: false,
    isSuccess: false,
    isError: false
  });

  const mutate = useCallback(
    async (variables: V) => {
      setState({
        data: null,
        error: null,
        isLoading: true,
        isSuccess: false,
        isError: false
      });

      try {
        const data = await mutationFn(variables);
        setState({
          data,
          error: null,
          isLoading: false,
          isSuccess: true,
          isError: false
        });
        onSuccess?.(data, variables);
        return data;
      } catch (error) {
        const err = error instanceof Error ? error : new Error('Unknown error');
        setState({
          data: null,
          error: err,
          isLoading: false,
          isSuccess: false,
          isError: true
        });
        onError?.(err, variables);
        throw err;
      }
    },
    [mutationFn, onSuccess, onError]
  );

  const reset = useCallback(() => {
    setState({
      data: null,
      error: null,
      isLoading: false,
      isSuccess: false,
      isError: false
    });
  }, []);

  return {
    ...state,
    mutate,
    reset
  };
}
