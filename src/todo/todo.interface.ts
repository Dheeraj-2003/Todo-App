export interface Todo {
    id: number;
    title: string;
    description?: string;
    completed: boolean;
    created_at: Date;
    user_id:number;
  }
  