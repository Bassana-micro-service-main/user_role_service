import { Role } from '../entity/role.entity';

export interface IRoleRepository {
  save(role: Role): Promise<Role>;
  findByName(name: string): Promise<Role | null>;
  findAll(): Promise<Role[]>;
  findById(id:string):Promise<Role | null>;
  delete(id:string):Promise<void>;
  update(role:Role):Promise<Role>;
  exists(name:string):Promise<boolean>;
  findAllPaginated(page:number,limit:number):Promise<Role[]>;
  findByPermission(permission:string):Promise<Role[]>;
  search(query:string):Promise<Role[]>;
}