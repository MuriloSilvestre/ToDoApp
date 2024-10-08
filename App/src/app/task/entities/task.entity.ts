export class Task {
  public id?: number;

  public Title!: string;

  public Description!: string;

  public IsCompleted!: boolean;

  public DueDate!: Date;

  public UserId?: number;

  public CreateAt!: Date;

  public UpdateAt?: Date;
}
