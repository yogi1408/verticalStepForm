import { Injectable } from '@nestjs/common';
import { Prisma, company } from '@prisma/client';
import { PrismaService } from './prisma.service';

@Injectable()
export class CompanyRepo {
  constructor(private prisma: PrismaService) {}

  async create(
    data: Prisma.XOR<
      Prisma.companyCreateInput,
      Prisma.companyUncheckedCreateInput
    >,
  ): Promise<company> {
    return this.prisma.company.create({
      data,
    });
  }

  async getAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.companyWhereUniqueInput;
    where?: Prisma.companyWhereInput;
    orderBy?: Prisma.companyOrderByWithRelationInput;
  }): Promise<company[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.company.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async getAllWith<T>(params: {
    where?: Prisma.companyWhereInput;
    select?: Prisma.companySelect;
    orderBy?: Prisma.Enumerable<Prisma.companyOrderByWithRelationInput>;
  }): Promise<T> {
    const { where, select, orderBy } = params;
    const companys = await this.prisma.company.findMany({
      where,
      select,
      orderBy,
    });

    return companys as T;
  }
}

export { company };
