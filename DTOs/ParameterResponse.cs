using System;

namespace MyWebApp.DTOs
{
    public class ParameterResponse
    {
        public int id { get; set; }

        public string name { get; set; }

        public ParameterValueResponse parameterValues { get; set; }

    }
}
