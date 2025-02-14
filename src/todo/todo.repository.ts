import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { Todo } from "./todo.interface";

@Injectable()
export class TodoRepository{
    constructor(private readonly databaseService: DatabaseService){}

    async getTodos(): Promise<Todo[]> {
        const result = await this.databaseService.query(`
            SELECT * FROM todos ORDER BY created_at DESC
        `);
        return result.rows
    }

    async addTodo(todo: Todo): Promise<Todo> {
        const result = await this.databaseService.query(`
            INSERT INTO todos (title, completed) VALUES ($1, $2) RETURNING *
        `, [todo.title, todo.completed])
        return result.rows[0]
    }
}