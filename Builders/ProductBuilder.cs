
using System.Collections.Generic;
using MyWebApp.DTOs;

namespace MyWebApp.Builders {
    public class ProductBuilder :
    IProductId,
    IProductName,
    IProductParameters,
    IProductOptionalValues
{

    private int _productId;
    private string _productName;
    private IEnumerable<ParameterResponse> _productParameter;
    private IEnumerable<RuleResponse> _productRules;

        private ProductBuilder() {
        }

        public static IProductId start() {
            return new ProductBuilder();
        }

        public ProductResponse Build()
        {
            return new ProductResponse {
                id = _productId,
                name = _productName,
                parameters = _productParameter,
                rules = _productRules
            };
        }

        public IProductName WithProductId(int id)
        {
            _productId = id;
            return this;
        }

        public IProductParameters WithProductName(string name)
        {
            _productName = name;
            return this;
        }

        public IProductOptionalValues WithProductParameters(IEnumerable<ParameterResponse> parameters)
        {
            _productParameter = parameters;
            return this;
        }

        public IProductOptionalValues WithProductRules(IEnumerable<RuleResponse> rules)
        {
            _productRules = rules;
            return this;
        }
    }
}