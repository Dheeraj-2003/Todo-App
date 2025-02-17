import { Injectable, Logger } from "@nestjs/common";
import { TodoRepository } from "./todo.repository";
import { UpdateTodoDto } from "./dto/updateTodoDto";
import { CreateTodoDto } from "./dto/createTodoDto";

export interface Todo {
    id: number;
    title: string;
    description?: string;
    completed: boolean;
    created_at: Date;
    user_id:number;
  }
  

@Injectable()
export class TodoService{
    private readonly logger = new Logger(TodoService.name)
    constructor(private readonly todoRepository: TodoRepository){}

    async getTodos(userId:number): Promise<Todo[]>{
        return await this.todoRepository.getTodos(userId)
    }
    async addTodo(userId:number,todo: CreateTodoDto): Promise<Todo>{
        const newTodo = <Todo>Object.assign({ user_id: userId }, todo);
        return await this.todoRepository.addTodo(newTodo)
    }
    async updateTodo(userId:number,id:number, updates: UpdateTodoDto): Promise<Todo>{
        return await this.todoRepository.updateTodo(userId,id,updates)
    }
    async deleteTodo(userId:number,id:number): Promise<void>{
        await this.todoRepository.deleteTodo(userId,id)
    }
}