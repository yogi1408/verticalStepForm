import { Injectable } from '@nestjs/common';
import { Prisma, file_upload } from '@prisma/client';
import { PrismaService } from './prisma.service';

@Injectable()
export class FileUploadRepo {
  constructor(private prisma: PrismaService) {}

  async create(
    data: Prisma.XOR<
      Prisma.file_uploadCreateInput,
      Prisma.file_uploadUncheckedCreateInput
    >,
  ): Promise<file_upload> {
    return this.prisma.file_upload.create({
      data,
    });
  }
}

export { file_upload };
