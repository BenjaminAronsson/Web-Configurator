using System;
using System.Collections.Generic;
using MyWebApp.DTOs;


namespace MyWebApp.Builders {
        public interface IProductId
    {
        IProductName WithProductId(int id);
    }

    public interface IProductName
    {
        IProductParameters WithProductName(string name);
    }

    public interface IProductParameters
    {
        IProductOptionalValues WithProductParameters(IEnumerable<ParameterResponse> parameter);
    }

    public interface IProductOptionalValues
    {
        IProductOptionalValues WithProductRules(IEnumerable<RuleResponse> rules);
        ProductResponse Build();
    }
}
