import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { BoardColumn } from 'src/columns/columns.model';

interface TaskCreationAttrs {
  title: string;
  content: string;
  columnId: number;
}

@Table({ tableName: 'tasks' })
export class Task extends Model<Task, TaskCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  content: string;

  @ForeignKey(() => BoardColumn)
  @Column({ type: DataType.INTEGER })
  columnId: number;

  @BelongsTo(() => BoardColumn, { onDelete: 'CASCADE' })
  column: BoardColumn;
}
