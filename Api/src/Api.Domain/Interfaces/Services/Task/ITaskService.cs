using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Domain.Dtos.Task;

namespace Api.Domain.Interfaces.Services.Task
{
    public interface ITaskService
    {
        Task<TaskDto> Get(int id);
        Task<IEnumerable<TaskDto>> GetAll();
        Task<TaskDtoCreateResult> Post(TaskDtoCreate task);
        Task<TaskDtoUpdateResult> Put(TaskDtoUpdate task);
        Task<bool> Delete(int id);
    }
}
