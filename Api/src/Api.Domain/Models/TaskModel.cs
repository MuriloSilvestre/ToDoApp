using System;

namespace Api.Domain.Models
{
    public class TaskModel : BaseModel
    {
        private string _title;
        public string Title
        {
            get { return _title; }
            set
            {
                // Valida se o título não é nulo ou vazio
                if (string.IsNullOrEmpty(value))
                    throw new ArgumentException("Titulo Não pode ficar vazio.");
                _title = value;
            }
        }

        private string _description;
        public string Description
        {
            get { return _description; }
            set
            {
                // Se a descrição for nula ou vazia, definir como "No description"
                _description = string.IsNullOrEmpty(value) ? "Sem description" : value;
            }
        }

        private bool _isCompleted;
        public bool IsCompleted
        {
            get { return _isCompleted; }
            set
            {
                // Permitir apenas true ou false (o padrão)
                _isCompleted = value;
            }
        }

        private DateTime _dueDate;
        public DateTime DueDate
        {
            get { return _dueDate; }
            set
            {
                // Verifica se a data de vencimento é no passado, se sim, lançar exceção
                _dueDate = value;
            }
        }

        private int _userId;
        public int UserId
        {
            get { return _userId; }
            set
            {
               _userId = value;
            }
        }


    }
}
