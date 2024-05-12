import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BoardColumn } from './columns.model';
import { CreateColumnDto } from './dto/create-column.dto';

@Injectable()
export class ColumnsService {
  constructor(
    @InjectModel(BoardColumn) private columnRepository: typeof BoardColumn,
  ) {}
  async createColumn(dto: CreateColumnDto) {
    const maxOrder = (await this.columnRepository.max('order')) as number;
    const column = await this.columnRepository.create({
      ...dto,
      order: maxOrder + 1,
    });
    return column;
  }
  async getColumns() {
    const columns = await this.columnRepository.findAll();
    return columns;
  }

  async getColumnById(id: number) {
    const column = await this.columnRepository.findOne({ where: { id } });

    return column;
  }

  async getColumnsWithTasks() {
    const columns = await this.columnRepository.findAll({
      include: { all: true },
    });
    return columns;
  }

  async deleteColumn(id: number) {
    await this.columnRepository.destroy({ where: { id } });
  }

  async updateColumn(id: number, dto: CreateColumnDto) {
    await this.columnRepository.update(dto, { where: { id } });
    return await this.getColumnById(id);
  }

  async updateColumnOrder(columnIds: number[]) {
    for (let i = 0; i < columnIds.length; i++) {
      await this.columnRepository.update(
        { order: i + 1 },
        { where: { id: columnIds[i] } },
      );
    }
  }
}
