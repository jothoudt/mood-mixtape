import pkg from '../../package.json'
import { Controller } from "../decorators/Controller";
import { Get } from "../decorators/Method";

@Controller('/')
export class HealthCheckController {
  @Get('/')
  async healthCheck() {
    return {
      status: 'ok',
      version: pkg.version,
    }
  }
}
