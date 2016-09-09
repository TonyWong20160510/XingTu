using System.Data.Entity;

namespace XingTu.Models
{
    public class User
    {
        public int ID { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Introducer { get; set; }
        public string State { get; set; }
    }
    public class UserDBContext : DbContext 
    {
        public DbSet<User> Users { get; set; }
    }


    
}