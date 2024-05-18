import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompanyService } from './company/company.service';
import { CompanyController } from './company/company.controller';
import { SharedModule } from './shared/shared.service';

@Module({
  imports: [SharedModule],
  controllers: [AppController, CompanyController],
  providers: [AppService, CompanyService],
})
export class AppModule {}
