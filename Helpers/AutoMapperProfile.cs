using MyWebApp.DTOs;
using MyWebApp.Models;
using AutoMapper;

namespace MyWebApp.Helpers
{
    public class AutoMapperProfiles: Profile
    {
        public AutoMapperProfiles()
        {
            //CreateMap<AddProductDto, Product>();
            //CreateMap<EditProductDto, Product>();
            CreateMap<Product, ProductResponse>();
        }
    }
}