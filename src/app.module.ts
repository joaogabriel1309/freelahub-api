import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClienteModule } from './cliente/cliente.module';
import { ProjetoModule } from './projeto/projeto.module';
import { PropostaModule } from './proposta/proposta.module';
import { AuthModule } from './auth/auth.module';
import { FreelancersModule } from './freelancers/freelancers.module';
import { UsersModule } from './users/users.module';
import { ContratosModule } from './contratos/contratos.module';
import { MensagensModule } from './mensagens/mensagens.module';
import { NotificacoesModule } from './notificacoes/notificacoes.module';
import { AvaliacoesModule } from './avaliacoes/avaliacoes.module';
import { DenunciasModule } from './denuncias/denuncias.module';
import { ArquivosModule } from './arquivos/arquivos.module';
import { HabilidadesModule } from './habilidades/habilidades.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [ClienteModule, ProjetoModule, PropostaModule, AuthModule, FreelancersModule, UsersModule, ContratosModule, MensagensModule, NotificacoesModule, AvaliacoesModule, DenunciasModule, ArquivosModule, HabilidadesModule, AdminModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
