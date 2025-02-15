import { Body, Controller, Get, HttpException, HttpStatus, Logger, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { TodoService } from "./todo.service";
import { Todo } from "./todo.interface";
import { CreateTodoDto } from "./dto/createTodoDto";

@Controller('todo')
export class TodoController{
    private readonly logger = new Logger(TodoController.name)
    constructor(
        private readonly todoService: TodoService,
    ){}

    @Get()
    async getAllTodos(): Promise<Todo[]>{
        try {
            return await this.todoService.getTodos();
        } catch (error) {
            this.logger.error('Error fetching todos', error);
            throw new HttpException('Failed to retrieve todos', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('/create')
    @UsePipes(ValidationPipe)
    async createTodo(@Body() todoData:CreateTodoDto): Promise<Todo>{
        try {
            return await this.todoService.addTodo(<Todo> {title: todoData.title, completed: todoData.completed})
        } catch (error) {
            this.logger.error('Error creating todo', error);
            throw new HttpException('Failed to create todo', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}