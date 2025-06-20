export type ActionResponse<T> = {
  status: 'success' | 'error';
  data?: T;
  error?: string;
};

export type ActionType = 'none' | 'deleteWebsite' | 'reorderWebsite';
