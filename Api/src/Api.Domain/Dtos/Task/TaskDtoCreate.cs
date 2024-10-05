using System;
using System.ComponentModel.DataAnnotations;

namespace Api.Domain.Dtos.Task
{
    public class TaskDtoCreate
    {
        [Required(ErrorMessage = "Titulo é campo obrigatório")]
        public string Title { get; set; }

        [Required(ErrorMessage = "Deve ser informado se a tarefa já foi completa")]
        public bool IsCompleted { get; set; }

        public string Description { get; set; }

        public DateTime? DueDate { get; set; }

    }
}
