import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { CreateColumnDto } from './dto/create-column.dto';

@Controller('columns')
export class ColumnsController {
  constructor(private columnsService: ColumnsService) {}

  @Post()
  async create(@Body() columnDto: CreateColumnDto) {
    try {
      const column = await this.columnsService.createColumn(columnDto);
      return column;
    } catch (e) {
      throw new BadRequestException('Bad Request');
    }
  }

  @Get()
  async get() {
    try {
      const columns = await this.columnsService.getColumns();
      return columns;
    } catch (e) {
      throw new BadRequestException('Bad Request');
    }
  }

  @Get('/with-tasks')
  async getColumnsWithTasks() {
    try {
      const columns = await this.columnsService.getColumnsWithTasks();
      return columns;
    } catch (e) {
      throw new BadRequestException('Bad Request');
    }
  }

  @Get(':id')
  async getColumnById(@Param('id', ParseIntPipe) id: number) {
    const task = await this.columnsService.getColumnById(id);
    if (!task) {
      throw new NotFoundException('Task Not Found');
    }
    return task;
  }

  @Delete(':id')
  async deleteTask(@Param('id', ParseIntPipe) id: number) {
    const task = await this.columnsService.getColumnById(id);
    if (!task) {
      throw new NotFoundException('Task Not Found');
    }
    await this.columnsService.deleteColumn(id);
  }

  @Put('order')
  async updateColumnOrder(@Body() body: { columnIds: number[] }) {
    try {
      await this.columnsService.updateColumnOrder(body.columnIds);
    } catch (e) {
      throw new BadRequestException('Bad Request');
    }
  }

  @Put(':id')
  async updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() columnDto: CreateColumnDto,
  ) {
    const task = await this.columnsService.getColumnById(id);
    if (!task) {
      throw new NotFoundException('Task Not Found');
    }
    const updatedTask = await this.columnsService.updateColumn(id, columnDto);
    return updatedTask;
  }
}
