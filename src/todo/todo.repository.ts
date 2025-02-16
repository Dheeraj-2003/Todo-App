import { Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { Todo } from "./todo.interface";
import { UpdateTodoDto } from "./dto/updateTodoDto";
import { CreateTodoDto } from "./dto/createTodoDto";

@Injectable()
export class TodoRepository{
    private readonly logger = new Logger(TodoRepository.name);
    constructor(private readonly databaseService: DatabaseService){}

    async getTodos(): Promise<Todo[]> {
        const result = await this.databaseService.query(`
            SELECT * FROM todos ORDER BY created_at DESC
        `);
        return result.rows
    }

    async addTodo(todo: CreateTodoDto): Promise<Todo> {
        const columns = Object.keys(todo)
        const values = Object.values(todo)
        const placeHolders = Object.values(todo).map((val,i)=> `$${i+1}`)
        const result = await this.databaseService.query(`
            INSERT INTO todos (${columns.join(', ')}) VALUES (${placeHolders.join(', ')}) RETURNING *
        `, values)
        return result.rows[0]
    }

    async updateTodo(id:number,updates: UpdateTodoDto): Promise<Todo> {
        const columns = Object.keys(updates).map((column,i)=> `${column} = $${i+1}`)
        const values = Object.values(updates)
        values.push(id)
        const result = await this.databaseService.query(`
            UPDATE todos SET ${columns.join(', ')} WHERE id = $${values.length} RETURNING *
        `, values)
        if(result.rowCount==0){
            this.logger.error('Todo not found')
            throw new NotFoundException('Todo not found')
        }
        return result.rows[0]
    }

    async deleteTodo(id:number): Promise<void>{
        const result = await this.databaseService.query(`
            DELETE FROM todos WHERE id = $1
        `, [id]);
        if(result.rowCount==0){
            this.logger.error('Todo not found')
            throw new NotFoundException('Todo not found')
        }
    }
}