import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { UserJWT } from 'src/modules/auth/application/dto/view/user.jwt.view-model';

@Injectable()
export class AdminGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const role = this.reflector.getAllAndOverride('roles', [context.getHandler(), context.getClass()]);

		const request: Request = context.switchToHttp().getRequest();
		const user = request.user as UserJWT;

		if (user.role === role) {
			return true;
		}

		return false;
	}
}
