using System;

namespace MyWebApp.DTOs
{
    public class RuleResponse
    {
        public int id { get; set; }

        public string name { get; set; }

        public int parameterId1 { get; set; }
        public int parameterId2 { get; set; }

        public int parameterValue1 { get; set; }
        public int parameterValue2 { get; set; }



    }
}
