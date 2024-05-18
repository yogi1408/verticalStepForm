import { Injectable } from '@nestjs/common';
import { CompanyRepo } from 'src/shared/dbaccess/company.repo';
import { FileUploadRepo } from 'src/shared/dbaccess/file.upload.repo';

@Injectable()
export class CompanyService {
  constructor(
    private companyRepo: CompanyRepo,
    private fileUploadRepo: FileUploadRepo,
  ) {}

  async createCompany(res, req) {
    const {
      companyUEN,
      companyName,
      email,
      name,
      position,
      phoneNumber,
      terms,
    } = req.body;

    const newCompany = await this.companyRepo.create({
      companyUEN,
      companyName,
      email,
      name,
      position,
      phoneNumber,
      terms,
    });

    return res.status(201).send({
      message: 'Company created successfully',
      data: newCompany,
      status: 200,
    });
  }

  async getAllCompanies(res, req) {
    let companies = await this.companyRepo.getAll({});
    companies = companies.sort((a: any, b: any) => a.createdAt - b.createdAt);

    return res.status(200).send({
      message: 'Companies retrieved successfully',
      data: companies,
      status: 200,
    });
  }

  async uploadFile(res, req) {
    const { companyUEN, name, content } = req.body;

    if (companyUEN == '')
      return res.status(404).send({
        message: 'Not uploaded successfully',
        status: 404,
      });

    const company = await this.fileUploadRepo.create({
      companyUEN,
      name,
      content,
    });

    return res.status(200).send({
      message: 'File uploaded successfully',
      data: company,
      status: 200,
    });
  }
}
