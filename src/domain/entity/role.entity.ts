export class Role {
  constructor(
    public readonly id: string,
    public name: string,
    public permissions: string[],
    public createdAt:Date = new Date(),
    public updatedAt:Date = new Date(),
    public level:number=1,
    public createdBy:string
  ){
    this.validate();
  }
  validate(): void {
    if (!this.name || this.name.trim().length < 4) {
      throw new Error("Veiller corriger l'érreur");
    }
    if (!this.permissions || this.permissions.length === 0) {
      throw new Error("Un rôle doit avoir au moins une permission.");
    }
    }
  }