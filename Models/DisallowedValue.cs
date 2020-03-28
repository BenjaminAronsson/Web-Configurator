using System;
using System.Collections.Generic;

namespace MyWebApp.Models
{
    public partial class DisallowedValue
    {
        public int ObjectId { get; set; }
        public int DisallowedParameterId { get; set; }
        public int ParameterValueId { get; set; }
    }
}
