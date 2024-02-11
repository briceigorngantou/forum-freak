import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import Role from 'src/common/config/role.enum';
import RequestWithUser from '../requestWithUser.interface';
import { JwtAuthGuard } from './jwt.guard';

const RoleGuard = (role: Role): Type<CanActivate> => {
  class RoleGuardMixin extends JwtAuthGuard {
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);

      const request = context.switchToHttp().getRequest<RequestWithUser>();
      const user = request.user;
      return user?.role.includes(role);
    }
  }

  return mixin(RoleGuardMixin);
};

export default RoleGuard;
