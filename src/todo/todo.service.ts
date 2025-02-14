import { Inject, Injectable } from "@nestjs/common";
import { Pool } from "pg";
import { DatabaseService } from "src/database/database.service";

@Injectable()
export class TodoService{
    constructor(private readonly databaseService: DatabaseService){}
}