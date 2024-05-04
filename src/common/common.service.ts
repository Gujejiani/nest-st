import { Inject, Injectable, forwardRef } from "@nestjs/common";
import { CatsService } from "src/cats/services/cats.service";

@Injectable()
export class CommonService {
  constructor(
    // Circular dependency workaround
    @Inject(forwardRef(() => CatsService))
    private catsService: CatsService,
  ) {}
}