import { Model, Table, Column, DataType, HasMany } from 'sequelize-typescript';
import { Task } from 'src/tasks/tasks.model';

interface BoardColumnCreationAttrs {
  title: string;
  order: number;
}

@Table({ tableName: 'boardColumns' })
export class BoardColumn extends Model<BoardColumn, BoardColumnCreationAttrs> {
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
    type: DataType.INTEGER,
    allowNull: false,
  })
  order: number;

  @HasMany(() => Task, { onDelete: 'CASCADE' })
  tasks: Task[];
}
