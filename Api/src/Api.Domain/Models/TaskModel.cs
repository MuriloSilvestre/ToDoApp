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
                // Valida se o t�tulo n�o � nulo ou vazio
                if (string.IsNullOrEmpty(value))
                    throw new ArgumentException("Titulo N�o pode ficar vazio.");
                _title = value;
            }
        }

        private string _description;
        public string Description
        {
            get { return _description; }
            set
            {
                // Se a descri��o for nula ou vazia, definir como "No description"
                _description = string.IsNullOrEmpty(value) ? "Sem description" : value;
            }
        }

        private bool _isCompleted;
        public bool IsCompleted
        {
            get { return _isCompleted; }
            set
            {
                // Permitir apenas true ou false (o padr�o)
                _isCompleted = value;
            }
        }

        private DateTime _dueDate;
        public DateTime DueDate
        {
            get { return _dueDate; }
            set
            {
                // Verifica se a data de vencimento � no passado, se sim, lan�ar exce��o
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
