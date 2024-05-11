import { Module } from '@nestjs/common';
import { ColumnsController } from './columns.controller';
import { ColumnsService } from './columns.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { BoardColumn } from './columns.model';
import { Task } from 'src/tasks/tasks.model';

@Module({
  controllers: [ColumnsController],
  providers: [ColumnsService],
  imports: [SequelizeModule.forFeature([Task, BoardColumn])],
  exports: [ColumnsService],
})
export class ColumnsModule {}
