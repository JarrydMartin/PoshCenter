import { UserRoles } from "./enums";

export const EDITOR_ROLES: UserRoles[] = [UserRoles.ADMIN, UserRoles.EDITOR];
export const READER_ROLES: UserRoles[] = [UserRoles.READER, UserRoles.ADMIN, UserRoles.EDITOR];