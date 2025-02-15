import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private pool: Pool;
  private readonly logger = new Logger(DatabaseService.name);

  constructor() {
    try {
      this.pool = new Pool({
        host: process.env.DATABASE_HOST ||'localhost',
        port: Number(process.env.DATABASE_PORT) || 5432,
        user: process.env.DATABASE_USER || 'postgres',
        password: process.env.DATABASE_PASSWORD || 'password',
        database: process.env.DATABASE_NAME || 'todo_db',
      });
    } catch (error) {
      this.logger.error("Error initializing db connection", error)
      throw new Error("Failed DB initialization")
    }
  }

  async onModuleInit() {
    try {
      await this.pool.connect();
      this.logger.log('Connected to PostgreSQL');
    } catch (error) {
      this.logger.error('Failed to connect to DB', error)
      throw new Error('Failed to connect to DB')
    }
  }

  async query(queryText: string, params?: any[]) {
    try {
      return this.pool.query(queryText, params);
    } catch (error) {
      this.logger.error(`Database query failed: ${queryText}`, error);
      throw new Error('Database query failed');
    }
  }

  async onModuleDestroy() {
    try {
      await this.pool.end();
      console.log('Database connection closed');
    } catch (error) {
      this.logger.error('Error closing database connection', error);
    }
  }
}
