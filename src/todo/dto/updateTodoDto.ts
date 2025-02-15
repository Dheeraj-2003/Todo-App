import { IsBoolean, IsNotEmpty, IsNotEmptyObject, isNotEmptyObject, IsOptional, Length, ValidateIf } from "class-validator";

export class UpdateTodoDto{

    @ValidateIf((o) => o.completed !== undefined || o.description !== undefined)
    @IsOptional()
    @IsBoolean()
    completed?:boolean

    @ValidateIf((o) => o.completed !== undefined || o.description !== undefined)
    @IsOptional()
    @Length(1,255)
    description?: string;
}