using Api.Domain.Dtos.User;
using System;

namespace Api.Domain.Dtos.Task
{
    public class TaskDtoUpdateResult
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public bool IsCompleted { get; set; }
        public DateTime? DueDate { get; set; }
        public UserDto User { get; set; }
        public DateTime UpdateAt { get; set; }
    }
}
