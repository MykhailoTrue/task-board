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
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { ColumnsService } from 'src/columns/columns.service';

@Controller('tasks')
export class TasksController {
  constructor(
    private tasksService: TasksService,
    private columnService: ColumnsService,
  ) {}

  @Post()
  async create(@Body() taskDto: CreateTaskDto) {
    const boardColumn = await this.columnService.getColumnById(
      taskDto.columnId,
    );
    if (!boardColumn) {
      throw new BadRequestException('Column Not Found');
    }
    try {
      const task = await this.tasksService.createTask(taskDto);
      return task;
    } catch (e) {
      throw new BadRequestException('Bad Request');
    }
  }

  @Get()
  async get() {
    try {
      const tasks = await this.tasksService.getTasks();
      return tasks;
    } catch (e) {
      throw new BadRequestException('Bad Request');
    }
  }

  @Get(':id')
  async getTaskById(@Param('id', ParseIntPipe) id: number) {
    const task = await this.tasksService.getTaskById(id);
    if (!task) {
      throw new NotFoundException('Task Not Found');
    }
    return task;
  }

  @Delete(':id')
  async deleteTask(@Param('id', ParseIntPipe) id: number) {
    if (!id) {
      throw new NotFoundException('Task Not Found');
    }
    await this.tasksService.deleteTask(id);
  }

  @Put(':id')
  async updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() taskDto: CreateTaskDto,
  ) {
    const boardColumn = await this.columnService.getColumnById(
      taskDto.columnId,
    );
    if (!boardColumn) {
      throw new BadRequestException('Column Not Found');
    }
    if (!id) {
      throw new NotFoundException('Task Not Found');
    }

    const updatedTask = await await this.tasksService.updateTask(id, taskDto);
    return updatedTask;
  }
}
