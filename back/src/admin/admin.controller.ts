import { Controller, Get, UseGuards } from '@nestjs/common';
import { Roles } from 'src/common/roles.decorator';
import { RolesGuard } from 'src/common/roles.guard';
@Controller('admin')
export class AdminController {

  @Get()
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  getAdminData() {
    return 'This is admin data';
  }
}
