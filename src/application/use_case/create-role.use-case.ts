import { IRoleRepository } from '../../domain/port/role.repository.interface';
import { Role } from '../../domain/entity/role.entity';
export class CreateRoleUseCase {
  constructor(private readonly roleRepository: IRoleRepository) {}

  async execute(name: string, permissions: string[]): Promise<Role> {
    const existing = await this.roleRepository.findByName(name);
    if (existing) {
      throw new Error("Ce rôle existe déjà.");
    }
    const role =new Role(
      crypto.randomUUID(),
      name,
      permissions,
      new Date(),
      new Date(),
      1,
      "ADMIN_USER"
    );
    return await 
    this.roleRepository.save(role);
  }
}