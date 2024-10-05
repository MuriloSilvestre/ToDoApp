using System;
using System.ComponentModel.DataAnnotations;

namespace Api.Domain.Entities
{
    public class TaskEntity : BaseEntity
    {
        [Required]
        [MaxLength(100)]
        public string Title { get; set; }

        [Required]
        [MaxLength(500)]
        public string Description { get; set; }

        public bool IsCompleted { get; set; }

        public DateTime? DueDate { get; set; }

        [Required]
        public int UserId { get; set; }
        
        public UserEntity User { get; set; }
    }
}
