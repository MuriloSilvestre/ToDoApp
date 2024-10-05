using Api.Domain.Dtos.User;
using System;
using System.ComponentModel.DataAnnotations;

namespace Api.Domain.Dtos.Task
{
    public class TaskDtoCreateResult
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public bool IsCompleted { get; set; }
        public DateTime? DueDate { get; set; }
        public UserDto User { get; set; }
        public DateTime CreateAt { get; set; } 
    }
}
