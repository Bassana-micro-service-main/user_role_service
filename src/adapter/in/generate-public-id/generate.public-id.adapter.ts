import { randomBytes } from "crypto";
import { PublicIdGeneratorPort } from "src/domain/port/in/generate-public-id/generator-public-id.port";

export class PublicIdGeneratorAdapter implements PublicIdGeneratorPort {
  generateNanoid(): string {
    return randomBytes(16).toString("base64url").slice(0, 21);
  }
}
