import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Logger, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { TodoService } from "./todo.service";
import { Todo } from "./todo.interface";
import { CreateTodoDto } from "./dto/createTodoDto";
import { UpdateTodoDto } from "./dto/updateTodoDto";

@Controller('todo')
export class TodoController{
    private readonly logger = new Logger(TodoController.name)
    constructor(
        private readonly todoService: TodoService,
    ){}

    @Get()
    async getAllTodos(): Promise<Todo[]>{
        return await this.todoService.getTodos();
    }

    @Post('/create')
    @UsePipes(ValidationPipe)
    async createTodo(@Body() todoData:CreateTodoDto): Promise<Todo>{
        return await this.todoService.addTodo(todoData)
    }

    @Patch(':id')
    async updateTodo(@Param('id', ParseIntPipe) id: number, @Body(new ValidationPipe({ whitelist: true })) updates:UpdateTodoDto): Promise<Todo>{
        return await this.todoService.updateTodo(id, updates)
    }

    @Delete(':id')
    @HttpCode(204)
    async deleteTodo(@Param('id', ParseIntPipe) id: number): Promise<void>{
        await this.todoService.deleteTodo(id)
    }
}