using Api.Domain.Dtos.Task;
using Api.Domain.Dtos.User;
using Api.Domain.Models;
using AutoMapper;

namespace Api.CrossCutting.Mappings
{
    public class DtoToModelProfile : Profile
    {
        public DtoToModelProfile()
        {
            #region User
            CreateMap<UserModel, UserDto>()
                .ReverseMap();
            CreateMap<UserModel, UserDtoCreate>()
                .ReverseMap();
            CreateMap<UserModel, UserDtoUpdate>()
                .ReverseMap();
            #endregion

            #region TASK
            CreateMap<TaskModel, TaskDto>()
                .ReverseMap();
            CreateMap<TaskModel, TaskDtoCreate>()
                .ReverseMap();
            CreateMap<TaskModel, TaskDtoUpdate>()
                .ReverseMap();
            #endregion

        }

    }
}
