class Product {
    id: number;
    name: string;
    parameters: Parameter[];
    rules?: Rule[]
}

interface Parameter {
    id: number,
    name: string,
    parameterValues: ParameterValues[],
}

interface ParameterValues {
    id: number,
    name: string
}

interface Rule {
    id: number,
    name: string,
    parameterId1: number,
    parameterId2: number,

    parameterValueId1: number,
    parameterValueId2: number,
}

//lista med alla parametrar

/*jag vill ha en lista med alla parametrar och deras värden kopplade till en produkt
 *
 * alla parametrar för den valda produkten
 * 
 */





//lista med regler 

//interface regel {
    //parameter1 && värde1 retunerar parameter2 och värde2
      
  //}
  
  /* Antagligen hör detta till backend */
  
  
  /* en parameter har ett namn och vilken produkt den är kopplad till*/
//   interface Parameter {
//     ObjectID: number;
//     ProductID: number; /*(references the ObjectID of a Product)*/
//     Name: string;
//   }
  
//   /* varje parameter har ett "värde"/namn och och vilken parameter den hör till*/
//   interface ParameterValue {
//     ObjectID: number;
//     ParameterID: number; /*(references the ObjectID of a Parameter)*/
//     Name: string;
//   }
  