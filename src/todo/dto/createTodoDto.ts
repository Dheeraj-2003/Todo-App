import { IsNotEmpty, Length } from "class-validator";
import { Todo } from "../todo.interface";

export class CreateTodoDto implements Todo{
    id: number;

    @IsNotEmpty()
    @Length(1,255)
    title: string;

    completed:boolean

    description?: string;
    created_at: Date;
}