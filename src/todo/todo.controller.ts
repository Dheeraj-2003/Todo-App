import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { TodoService } from "./todo.service";
import { Todo } from "./todo.interface";
import { CreateTodoDto } from "./dto/createTodoDto";

@Controller('todo')
export class TodoController{
    constructor(
        private readonly todoService: TodoService
    ){}
    @Get()
    async getAllTodos(): Promise<Todo[]>{
        return await this.todoService.getTodos();
    }

    @Post('/create')
    @UsePipes(ValidationPipe)
    async createTodo(@Body() todoData:CreateTodoDto): Promise<Todo>{
        return await this.todoService.addTodo(<Todo> {title: todoData.title, completed: todoData.completed})
    }
}