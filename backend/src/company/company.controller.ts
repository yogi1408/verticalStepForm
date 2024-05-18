import { Controller, Post, Res, Req, Get } from '@nestjs/common';
import { CompanyService } from './company.service';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post('create')
  async createCompany(@Res() res: Response, @Req() req: Request) {
    return this.companyService.createCompany(res, req);
  }

  @Get('/companies')
  async getAllCompanies(@Res() res: Response, @Req() req: Request) {
    return this.companyService.getAllCompanies(res, req);
  }

  @Post('/upload')
  async uploadFile(@Res() res: Response, @Req() req: Request) {
    return this.companyService.uploadFile(res, req);
  }
}
