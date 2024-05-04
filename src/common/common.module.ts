import { Module, forwardRef } from "@nestjs/common";
import { CatsModule } from "src/cats/cats.module";

@Module({
    // Circular dependency workaround with module import
    imports: [forwardRef(() => CatsModule)],
  })
  export class CommonModule {}