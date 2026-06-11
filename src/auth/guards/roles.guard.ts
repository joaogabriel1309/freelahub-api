import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { PapelUsuario } from "@prisma/client";
import { ROLES_KEY } from "../decorators/roles.decorator";

type UsuarioAutenticado = {
  id: string;
  email: string;
  papel: PapelUsuario;
}

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private readonly reflector: Reflector) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<PapelUsuario[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }

    const user = context.switchToHttp().getRequest();
    const usuario = user.user as UsuarioAutenticado;

    return requiredRoles.includes(usuario.papel);
  }
}