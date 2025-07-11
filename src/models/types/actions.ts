export type ActionResponse<T> = {
  status: 'success' | 'error';
  data?: T;
  error?: string;
};

export type ActionType = 'none' | 'deleteWebsite' | 'reorderWebsite';

export type FetchAddType<T> = (object: any, addition: any) => Promise<ActionResponse<T>>;
export type FetchDeleteType<T> = (id: string) => Promise<ActionResponse<T>>;

export type SessionType<T> = (websites: T[]) => void;

export type ObjectType = 'project' | 'category' | 'website';
