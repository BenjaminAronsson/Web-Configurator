using System.Collections.Generic;
using MyWebApp.DTOs;

namespace MyWebApp.DTOs
{
    public class ProductResponse
    {
        public int id { get; set; }

        public string name { get; set; }

        public IEnumerable<ParameterResponse> parameters { get; set; }

        public IEnumerable<RuleResponse> rules { get; set; }

    }
}
