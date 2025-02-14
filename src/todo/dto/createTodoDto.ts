import { IsNotEmpty, Length } from "class-validator";

export class CreateTodoDto{
    @IsNotEmpty()
    @Length(1,255)
    title: string;

    completed:boolean
}