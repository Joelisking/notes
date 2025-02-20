export interface INote {
  id: string;
  title: string;
  content: string;
  tags?: string[];
  created_at: Date;
  modified_at?: Date;
}

export interface NoteInput {
  title: string;
  content: string;
  tags: string[];
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
