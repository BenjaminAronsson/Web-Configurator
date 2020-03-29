using MyWebApp.DTOs;
using MyWebApp.Models;
using AutoMapper;

namespace MyWebApp.Helpers
{
    public class AutoMapperProfiles: Profile
    {
        public AutoMapperProfiles()
        {
            //CreateMap<AddSupplierDto, Suppliers>();
            //CreateMap<EditSupplierDto, Suppliers>();
            CreateMap<Product, ProductResponse>();
        }
    }
}