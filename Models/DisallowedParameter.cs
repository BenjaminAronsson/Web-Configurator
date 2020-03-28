using System;
using System.Collections.Generic;

namespace MyWebApp.Models
{
    public partial class DisallowedParameter
    {
        public int ObjectId { get; set; }
        public int DisallowedRuleId { get; set; }
        public int ParameterId { get; set; }
    }
}
