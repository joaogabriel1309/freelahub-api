import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {

  private readonly pool: Pool;

  constructor() {
    const stringDeConexao = process.env.DATABASE_URL;

    if (!stringDeConexao) {
      throw new Error('DATABASE_URL não está definido nas variáveis de ambiente.');
    }

    const pool = new Pool({
      connectionString: stringDeConexao,
    });

    const adapter = new PrismaPg(pool);

    super({
      adapter,
    });

    this.pool = pool;
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
    await this.pool.end();
  }
}
