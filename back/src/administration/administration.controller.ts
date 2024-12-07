import { Controller } from '@nestjs/common';
import { AdministrationService } from './administration.service';

@Controller('administration')
export class AdministrationController {
  constructor(private readonly administrationService: AdministrationService) {}
}
