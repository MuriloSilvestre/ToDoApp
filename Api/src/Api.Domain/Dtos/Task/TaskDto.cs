using System;
using Api.Domain.Dtos.User; 
namespace Api.Domain.Dtos.Task
{
    public class TaskDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public bool IsCompleted { get; set; }
        public DateTime? DueDate { get; set; }
        public int UserId { get; set; }
        public UserDto User { get; set; } 
        public DateTime? CreateAt { get; set; }
    }
}
