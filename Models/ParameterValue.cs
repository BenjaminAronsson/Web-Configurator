using System;
using System.Collections.Generic;

namespace MyWebApp.Models
{
    public partial class ParameterValue
    {
        public int ObjectId { get; set; }
        public int ParameterId { get; set; }
        public string Name { get; set; }
    }
}
