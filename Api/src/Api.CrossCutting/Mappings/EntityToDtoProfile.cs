using Api.Domain.Dtos.Task;
using Api.Domain.Dtos.User;
using Api.Domain.Entities;
using AutoMapper;

namespace Api.CrossCutting.Mappings
{
    public class EntityToDtoProfile : Profile
    {
        public EntityToDtoProfile()
        {
            CreateMap<UserDto, UserEntity>()
               .ReverseMap();

            CreateMap<UserDtoCreateResult, UserEntity>()
               .ReverseMap();

            CreateMap<UserDtoUpdateResult, UserEntity>()
               .ReverseMap();

            CreateMap<TaskDto, TaskEntity>()
               .ReverseMap();

            CreateMap<TaskDtoCreateResult, TaskEntity>()
               .ReverseMap();

            CreateMap<TaskDtoUpdateResult, TaskEntity>()
               .ReverseMap();

        }
    }
}
