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

           //retunera productResponse istället för produkt
            var parameter = await _context.Parameter.FindAsync(product.ObjectId);
           
            System.Console.WriteLine(product);
            
            var paramNames = new string[] {"Power", "Location"};

            var productResponse = new ProductResponse();
            productResponse.id = product.ObjectId;
            productResponse.name = product.Name;

            ParameterValueResponse dummyValue = new ParameterValueResponse {
                id = 33,
                name = "Val 1"
            };

            var parameters = new ParameterResponse[paramNames.Length];
           
            for(int j = 0; j < paramNames.Length; j++) {
                
                var values = new ParameterValueResponse[6];
                var paramName = paramNames[j];
                for(int i = 0; i < values.Length; i++) {
                    values[i] = new ParameterValueResponse {
                        id = 33 + i,
                        name = paramName + " " + (i + 1),
                    };
                }

                parameters[j] = new ParameterResponse {
                    id = 5 + j,
                    name = paramName,
                    parameterValues = values,
                };
            }

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