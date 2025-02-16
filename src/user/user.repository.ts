import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { User } from "./user.interface";

@Injectable()
export class UserRepository{
    constructor(private readonly databaseService: DatabaseService){}
    
    async registerUser(user: User){
        try {
            const columns = Object.keys(user)
            const values = Object.values(user)
            const placeHolders = Object.values(user).map((val,i)=> `$${i+1}`)
            const result = await this.databaseService.query(`
                INSERT INTO users (${columns.join(', ')}) VALUES (${placeHolders.join(', ')}) RETURNING *
                `, values)
                return result.rows[0]
            } catch (error) {
                throw new Error(error)
            }
        }
    async getUserByEmail(email: string) : Promise<User | null> {
        const result = await this.databaseService.query(`
            SELECT * FROM users WHERE email = $1
        `, [email])
        
        return result.rows.length > 0 ?  result.rows[0] : null
    }
}