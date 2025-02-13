import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      host: process.env.DATABASE_HOST ||'localhost',
      port: Number(process.env.DATABASE_PORT) || 5432,
      user: process.env.DATABASE_USER || 'postgres',
      password: process.env.DATABASE_PASSWORD || 'password',
      database: process.env.DATABASE_NAME || 'todo_db',
    });
  }

  async onModuleInit() {
    await this.pool.connect();
    console.log('Connected to PostgreSQL');
  }

  async query(queryText: string, params?: any[]) {
    return this.pool.query(queryText, params);
  }

  async onModuleDestroy() {
    await this.pool.end();
    console.log('Database connection closed');
  }
}
