using System.Linq;
using System.Threading.Tasks;
using Api.Data.Context;
using Api.Data.Repository;
using Api.Domain.Entities;
using Api.Domain.Repository;
using Microsoft.EntityFrameworkCore;

namespace Api.Data.Implementations
{
    public class TaskImplementation : BaseRepository<TaskEntity>, ITaskRepository
    {
        private DbSet<TaskEntity> _dataset;

        public TaskImplementation(MyContext context) : base(context)
        {
            _dataset = context.Set<TaskEntity>();
        }

        public async Task<TaskEntity> SelectAsync(string titulo)
        {
            return await _dataset.Include(c => c.Title)
                                 .SingleOrDefaultAsync(u => u.Title.Equals(titulo));
        }
    }
}
