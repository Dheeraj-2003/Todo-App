import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { TodoService } from "./todo.service";
import { TodoController } from "./todo.controller";
import { TodoRepository } from "./todo.repository";

@Module({
    imports: [DatabaseModule],
    providers: [TodoService, TodoRepository],
    controllers: [TodoController],
})
export class TodoModule{}