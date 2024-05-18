import { Global, Module } from '@nestjs/common';
import { PrismaService } from './dbaccess/prisma.service';
import { CompanyRepo } from './dbaccess/company.repo';
import { FileUploadRepo } from './dbaccess/file.upload.repo';

@Global()
@Module({
  controllers: [],
  providers: [CompanyRepo, FileUploadRepo, PrismaService],
  exports: [CompanyRepo, FileUploadRepo, PrismaService],
})
export class SharedModule {}
