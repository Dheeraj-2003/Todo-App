import { Inject, Injectable, Logger } from "@nestjs/common";
import { TodoRepository } from "./todo.repository";
import { Todo } from "./todo.interface";
import { todo } from "node:test";

@Injectable()
export class TodoService{
    private readonly logger = new Logger(TodoService.name)
    constructor(private readonly todoRepository: TodoRepository){}

    async getTodos(): Promise<Todo[]>{
        try {
            return await this.todoRepository.getTodos()
        } catch (error) {
            this.logger.error('Failed to retrieve todos', error)
            throw new Error('Failed to retrieve todos')
        }
    }
    async addTodo(todo: Todo): Promise<Todo>{

        try{
            return await this.todoRepository.addTodo(todo)
        }
        catch(error){
            this.logger.error('Failed to retrieve todos', error)
            throw new Error('Failed to retrieve todos')
        }
    }
}