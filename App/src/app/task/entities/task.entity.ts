export class Task {
  public id!: number;

  public title!: string;

  public description!: string;

  public isCompleted!: boolean;

  public dueDate!: Date;

  public userId?: number;

  public createAt!: Date;

  public updateAt?: Date;
}
