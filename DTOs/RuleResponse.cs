using System;
using MyWebApp.Models;

namespace MyWebApp.DTOs
{
    public class RuleResponse
    {
        public int id { get; set; }

        public string name { get; set; }

        //theese alternative can't go together
        public ParameterValue[] incompatableValues { get; set; }

    }
}
