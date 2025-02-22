import { Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { Todo } from "./todo.interface";
import { UpdateTodoDto } from "./dto/updateTodoDto";
import { PaginationDto } from "./dto/paginationDto";

@Injectable()
export class TodoRepository{
    private readonly logger = new Logger(TodoRepository.name);
    constructor(private readonly databaseService: DatabaseService){}

    async getTodos(userId:number): Promise<Todo[]> {
        const result = await this.databaseService.query(`
            SELECT * FROM todos WHERE user_id = $1 ORDER BY created_at DESC
        `, [userId]);
        return result.rows
    }

    async getPaginatedTodos(userId:number, paginationDto: PaginationDto): Promise<Todo[]> {
        var {page = 1, limit = 10} = paginationDto
        const offset = (page - 1) * limit
        const result = await this.databaseService.query(`
            SELECT * FROM todos 
            WHERE user_id = $1 
            ORDER BY created_at DESC
            LIMIT $2 OFFSET $3
        `, [userId, limit, offset]);
        return result.rows
    }

    async addTodo(todo: Todo): Promise<Todo> {
        const columns = Object.keys(todo)
        const values = Object.values(todo)
        const placeHolders = Object.values(todo).map((val,i)=> `$${i+1}`)
        const result = await this.databaseService.query(`
            INSERT INTO todos (${columns.join(', ')}) VALUES (${placeHolders.join(', ')}) RETURNING *
        `, values)
        return result.rows[0]
    }

    async updateTodo(userId:number,id:number,updates: UpdateTodoDto): Promise<Todo> {
        const columns = Object.keys(updates).map((column,i)=> `${column} = $${i+1}`)
        const values = Object.values(updates)
        values.push(id, userId)
        const result = await this.databaseService.query(`
            UPDATE todos 
            SET ${columns.join(', ')} 
            WHERE id = $${values.length-1} AND user_id = $${values.length} 
            RETURNING *
        `, values)
        if(result.rowCount==0){
            this.logger.error('Todo not found')
            throw new NotFoundException('Todo not found')
        }
        return result.rows[0]
    }

    async deleteTodo(userId:number,id:number): Promise<void>{
        const result = await this.databaseService.query(`
            DELETE FROM todos 
            WHERE id = $1 AND user_id = $2
        `, [id,userId]);
        if(result.rowCount==0){
            this.logger.error('Todo not found')
            throw new NotFoundException('Todo not found')
        }
    }
}