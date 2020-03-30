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
           
            //hämta alla regler med objectid = produkt.id            

            var response = ProductBuilder.start()
            .WithProductId(product.ObjectId)
            .WithProductName(product.Name)
            .WithProductParameters(parameters)
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