import { IsBoolean, IsNotEmpty, IsOptional, Length } from "class-validator";
import { Todo } from "../todo.interface";

export class CreateTodoDto implements Todo{
    id: number;

    @IsNotEmpty()
    @Length(1,255)
    title: string;

    @IsOptional()
    @IsBoolean()
    completed:boolean

    @IsOptional()
    @Length(1,255)
    description: string;

    created_at: Date;
}