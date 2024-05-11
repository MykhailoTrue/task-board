import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Task } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { ColumnsService } from 'src/columns/columns.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task) private taskRepository: typeof Task,
    private columnService: ColumnsService,
  ) {}

  async getTasks() {
    const tasks = await this.taskRepository.findAll();
    return tasks;
  }

  async getTaskById(id: number) {
    const task = await this.taskRepository.findOne({ where: { id } });
    return task;
  }

  async createTask(dto: CreateTaskDto) {
    const task = await this.taskRepository.create(dto);
    return task;
  }

  async deleteTask(id: number) {
    await this.taskRepository.destroy({ where: { id } });
  }

  async updateTask(id: number, dto: CreateTaskDto) {
    await this.taskRepository.update(dto, {
      where: { id },
    });
    return await this.getTaskById(id);
  }
}
