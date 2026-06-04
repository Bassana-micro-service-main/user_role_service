import { Module } from "@nestjs/common";
import { PermissionsModule } from "./adapter/in/permissions/permissions.module";
import { PermissionsOverridesModule } from "./adapter/in/permissions_overrides/permissions_overrides.module";
import { RoleModule } from "./adapter/in/role/role.module";
import { RolePermissionsModule } from "./adapter/in/role_permissions/role_permissions.module";
import { UserRoleModule } from "./adapter/in/user_role/user_role.module";

@Module({
  imports: [
    RoleModule,
    UserRoleModule,
    PermissionsModule,
    PermissionsOverridesModule,
    RolePermissionsModule,
  ],
})
export class AppModule {}
