export class CreateTaskDto {
  readonly title: string;
  readonly content: string;
  readonly order: number;
  readonly columnId: number;
}
