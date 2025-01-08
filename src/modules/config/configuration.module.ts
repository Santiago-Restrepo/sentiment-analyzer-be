import configuration from '@app/config/configuration';
import { validateDto } from '@app/utils/validate-dto';
import { ConfigModule } from '@nestjs/config';
import { ValidateEnvDto } from '@modules/config/application/dtos/validate-env.dto';

export default ConfigModule.forRoot({
  isGlobal: true,
  expandVariables: true,
  validate: (config: Record<string, unknown>) =>
    validateDto(ValidateEnvDto, config),
  load: [configuration],
});
