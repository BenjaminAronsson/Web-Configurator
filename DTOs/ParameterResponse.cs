using System;
using System.Collections.Generic;

namespace MyWebApp.DTOs
{
    public class ParameterResponse
    {
        public int id { get; set; }

        public string name { get; set; }

        public IEnumerable<ParameterValueResponse> parameterValues { get; set; }

    }
}
