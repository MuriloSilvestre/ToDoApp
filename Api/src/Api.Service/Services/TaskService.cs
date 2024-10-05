using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Security.Principal;
using System.Threading.Tasks;
using Api.Domain.Dtos.Task;
using Api.Domain.Entities;
using Api.Domain.Interfaces.Services.Task;
using Api.Domain.Models;
using Api.Domain.Repository;
using AutoMapper;
using Microsoft.AspNetCore.Http;

namespace Api.Service.Services
{
    public class TaskService : ITaskService
    {
        private ITaskRepository _repository;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public TaskService(ITaskRepository repository, IUserRepository userRepository, IMapper mapper, IHttpContextAccessor httpContextAccessor)
        {
            _repository = repository;
            _userRepository = userRepository;
            _mapper = mapper;
            _httpContextAccessor = httpContextAccessor;

        }

        public async Task<IEnumerable<TaskDto>> GetAll()
        {
            var listEntity = await _repository.SelectAsync();
            return _mapper.Map<IEnumerable<TaskDto>>(listEntity);
        }

        public async Task<TaskDto> Get(int id)
        {
            var entity = await _repository.SelectAsync(id);
            return _mapper.Map<TaskDto>(entity);
        }

        public async Task<TaskDto> Get(string titulo)
        {
            var entity = await _repository.SelectAsync(titulo);
            return _mapper.Map<TaskDto>(entity);
        }

        public async Task<TaskDtoCreateResult> Post(TaskDtoCreate task)
        {
            var email = _httpContextAccessor.HttpContext.User.Identity.Name;

            var user = await _userRepository.FindByLogin(email);

            if (user == null)
            {
                throw new Exception("Usuário não autenticado.");
            }

            var model = _mapper.Map<TaskModel>(task);
            var entity = _mapper.Map<TaskEntity>(model);

            entity.UserId = user.Id;

            var result = await _repository.InsertAsync(entity);

            return _mapper.Map<TaskDtoCreateResult>(result);
        }

        public async Task<TaskDtoUpdateResult> Put(TaskDtoUpdate task)
        {
            var model = _mapper.Map<TaskModel>(task);
            var entity = _mapper.Map<TaskEntity>(model);

            var result = await _repository.UpdateAsync(entity);
            return _mapper.Map<TaskDtoUpdateResult>(result);
        }

        public async Task<bool> Delete(int id)
        {
            return await _repository.DeleteAsync(id);
        }
    }
}
