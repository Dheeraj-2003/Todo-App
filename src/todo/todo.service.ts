import { Inject, Injectable, Logger } from "@nestjs/common";
import { TodoRepository } from "./todo.repository";
import { Todo } from "./todo.interface";
import { todo } from "node:test";
import { UpdateTodoDto } from "./dto/updateTodoDto";
import { CreateTodoDto } from "./dto/createTodoDto";

@Injectable()
export class TodoService{
    private readonly logger = new Logger(TodoService.name)
    constructor(private readonly todoRepository: TodoRepository){}

    async getTodos(): Promise<Todo[]>{
        return await this.todoRepository.getTodos()
    }
    async addTodo(todo: CreateTodoDto): Promise<Todo>{
        return await this.todoRepository.addTodo(todo)
    }
    async updateTodo(id:number, updates: UpdateTodoDto): Promise<Todo>{
        return await this.todoRepository.updateTodo(id,updates)
    }
    async deleteTodo(id:number): Promise<void>{
        await this.todoRepository.deleteTodo(id)
    }
}