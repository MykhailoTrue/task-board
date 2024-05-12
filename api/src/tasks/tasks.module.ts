import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Task } from './tasks.model';
import { BoardColumn } from 'src/columns/columns.model';
import { ColumnsModule } from 'src/columns/columns.module';

@Module({
  controllers: [TasksController],
  providers: [TasksService],
  imports: [SequelizeModule.forFeature([Task, BoardColumn]), ColumnsModule],
})
export class TasksModule {}
