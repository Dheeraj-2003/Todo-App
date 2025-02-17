import { Body, Controller, Delete, Get, HttpCode, Request, Logger, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { TodoService } from "./todo.service";
import { Todo } from "./todo.interface";
import { CreateTodoDto } from "./dto/createTodoDto";
import { UpdateTodoDto } from "./dto/updateTodoDto";
import { JwtAuthGuard } from "src/auth/jwtAuth.guard";

@Controller('todo')
@UseGuards(JwtAuthGuard)
export class TodoController{
    private readonly logger = new Logger(TodoController.name)
    constructor(
        private readonly todoService: TodoService,
    ){}

    @Get()
    async getAllTodos(@Request() req): Promise<Todo[]>{
        return await this.todoService.getTodos(req.user.id);
    }

    @Post('/create')
    @UsePipes(ValidationPipe)
    async createTodo(@Request() req, @Body() todoData:CreateTodoDto): Promise<Todo>{
        console.log(req.user)
        return await this.todoService.addTodo(req.user.id,todoData)
    }

    @Patch(':todoId')
    async updateTodo(@Request() req,@Param('todoId', ParseIntPipe) todoId: number, @Body(new ValidationPipe({ whitelist: true })) updates:UpdateTodoDto): Promise<Todo>{
        return await this.todoService.updateTodo(req.user.id,todoId, updates)
    }

    @Delete(':todoId')
    @HttpCode(204)
    async deleteTodo(@Request() req,@Param('todoId', ParseIntPipe) todoId: number): Promise<void>{
        await this.todoService.deleteTodo(req.user.id,todoId)
    }
}