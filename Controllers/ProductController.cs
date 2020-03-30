using System.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using MyWebApp.Models;
using MyWebApp.Repositories;
using MyWebApp.DTOs;
using MyWebApp.Builders;

namespace MyWebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly ConfiguratorSampleContext _context;
        private readonly IMapper _mapper;
        private readonly IDataRepository<Product> _repo;

       
       async Task<IEnumerable<ParameterResponse>> getParametersForProduct(int productId) {

            //fetch all parameters for product
            var fetchedParameters = await _context.Parameter.Where(p => p.ProductId == productId).ToListAsync();
            var parameters = new ParameterResponse[fetchedParameters.Count];

            for (int j = 0; j <fetchedParameters.Count; j++)
            {
                var parameter = fetchedParameters[j];

                System.Console.WriteLine("Parameter: {0}", parameter.Name); 
                //fetch all values for parameter
                var fetchedParametersValues = await _context.ParameterValue.Where(p => p.ParameterId == parameter.ObjectId).ToListAsync();
                
                //add all values to parameter
                var values = new ParameterValueResponse[fetchedParametersValues.Count];
                for(int i = 0; i < fetchedParametersValues.Count; i++)
                {
                    var value = fetchedParametersValues[i];
                    System.Console.WriteLine("   {0}", value.Name); 
                    
                    values[i] = ( new ParameterValueResponse {
                        id = value.ObjectId,
                        name = value.Name,
                    });
                }

                //populate parameter with value
                parameters[j] = (new ParameterResponse {
                    id = parameter.ObjectId,
                    name = parameter.Name,
                    parameterValues = values,
                });
            }
            return parameters;
       }


        async Task<IEnumerable<RuleResponse>> getRulesForParameters(int[] parameterIds)
        {
            var rules = new List<RuleResponse>(); 
            var ruleIds = new List<int>();
            //fetch all rules for the used each parameter
            var disallowedParameters = new List<DisallowedParameter>();
            foreach (var parameterId in parameterIds)
            {
                var fetchedParameters = await _context.DisallowedParameter
                    .Where(rule => rule.ParameterId == parameterId)
                    .ToListAsync();
                disallowedParameters.AddRange(fetchedParameters);
            }
            
            //create list of rules
            foreach (var param in disallowedParameters)
            {
                if(!ruleIds.Contains(param.DisallowedRuleId)) {
                    ruleIds.Add(param.DisallowedRuleId);
                }
            }


            foreach (var ruleId in ruleIds)
            {
                //foreach param
                foreach (var disallowedParameter in disallowedParameters) {

                    //if param have right
                    if(disallowedParameter.DisallowedRuleId == ruleId) {


                        //needs refactoring
                        //fetch param value
                        var fetchedRuleValues = await _context.DisallowedValue
                            .Where(value => value.ParameterValueId == disallowedParameter.ParameterId)
                            .ToArrayAsync();
                        
                        //add values
                        var incompatableValues = new List<ParameterValueResponse>();


                        //fetch name
                        var fetchedRuleName = await _context.DisallowedRule
                            .Where(rules => rules.ObjectId == disallowedParameter.DisallowedRuleId)
                            .FirstAsync();

                        //add values to rule
                        // foreach (var value in fetchedRuleValues)
                        // {
                        //     incompatableValues.Add( new ParameterValue{
                        //         ObjectId = value.ObjectId,
                        //         ParameterId = value.ParameterValueId,
                        //         Name = null,
                        //     });     
                        // }

                            incompatableValues.Add( new ParameterValueResponse{
                                 id = 1,
                                 parameterId = 1,
                                 name = null,
                          });
                        
                            incompatableValues.Add( new ParameterValueResponse{
                                 id = 6,
                                 parameterId = 2,
                                 name = null,
                          });

                        //creating rule response
                        var rule = new RuleResponse{
                            id = disallowedParameter.ObjectId, 
                            name = fetchedRuleName.Name,
                            incompatableValues = incompatableValues.ToArray(),
                        };

                        //adding rule to list
                        rules.Add(rule);
                    }
                }
            }
                return rules;
        }
        public ProductController(ConfiguratorSampleContext context, IMapper mapper, IDataRepository<Product> repo)
        {
            _context = context;
            _mapper = mapper;
            _repo = repo;
        }
        

        // GET: api/Product
        [HttpGet]
        public IEnumerable<Product> GetProduct()
        {
            return _context.Product;
        }

        // GET: api/Product/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProduct([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            //populate product
            var product = await _context.Product.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            
            //get parameters
            var parameters = await getParametersForProduct(product.ObjectId);
           
            var parameterIds = new List<int>();
            parameters.ToList().ForEach(parameter =>  parameterIds.Add(parameter.id));

            //get all rules for product
            var rules = await getRulesForParameters(parameterIds.ToArray());  

            var response = ProductBuilder.start()
            .WithProductId(product.ObjectId)
            .WithProductName(product.Name)
            .WithProductParameters(parameters)
            .WithProductRules(rules)
            .Build();

            return Ok(response);
        }


        // PUT: api/Product/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct([FromRoute] int id, [FromBody] Product product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != product.ObjectId)
            {
                return BadRequest();
            }

            _context.Entry(product).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Product
        [HttpPost]
        public async Task<IActionResult> PostProduct([FromBody] Product product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Product.Add(product);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ProductExists(product.ObjectId))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetProduct", new { id = product.ObjectId }, product);
        }

        // DELETE: api/Product/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var product = await _context.Product.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            _context.Product.Remove(product);
            await _context.SaveChangesAsync();

            return Ok(product);
        }

        private bool ProductExists(int id)
        {
            return _context.Product.Any(e => e.ObjectId == id);
        }
    }
}