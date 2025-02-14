import { Inject, Injectable } from "@nestjs/common";
import { TodoRepository } from "./todo.repository";
import { Todo } from "./todo.interface";
import { todo } from "node:test";

@Injectable()
export class TodoService{
    constructor(private readonly todoRepository: TodoRepository){}

    async getTodos(): Promise<Todo[]>{
        return await this.todoRepository.getTodos()
    }
    async addTodo(todo: Todo): Promise<Todo>{
        return await this.todoRepository.addTodo(todo)
    }
}