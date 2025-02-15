import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { Todo } from "./todo.interface";

@Injectable()
export class TodoRepository{
    private readonly logger = new Logger(TodoRepository.name);
    constructor(private readonly databaseService: DatabaseService){}

    async getTodos(): Promise<Todo[]> {
        try {
            const result = await this.databaseService.query(`
                SELECT * FROM todos ORDER BY created_at DESC
            `);
            return result.rows
        } catch (error) {
            this.logger.error('Failed to fetch todos', error)
            throw new InternalServerErrorException(`Couldn't fetch todos`)
        }
    }

    async addTodo(todo: Todo): Promise<Todo> {
        try {
            const result = await this.databaseService.query(`
                INSERT INTO todos (title, completed) VALUES ($1, $2) RETURNING *
            `, [todo.title, todo.completed])
            return result.rows[0]
        } catch (error) {
            this.logger.error('Failed to add todo', error)
            throw new InternalServerErrorException(`Failed to add todo`)
        }
    }
}