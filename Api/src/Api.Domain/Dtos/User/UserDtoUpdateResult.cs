using System;

namespace Api.Domain.Dtos.User
{
    public class UserDtoUpdateResult
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public DateTime UpdateAt { get; set; }
    }
}
