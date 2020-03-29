using MyWebApp.DTOs;

namespace MyWebApp.DTOs
{
    public class ProductResponse
    {
        public int id { get; set; }

        public string name { get; set; }

        public ParameterResponse parameters { get; set; }

        public RuleResponse rules { get; set; }

    }
}
