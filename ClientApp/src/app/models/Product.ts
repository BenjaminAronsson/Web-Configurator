export class Product {
    id: number;
    name: string;
    parameters: Parameter[];
    rules?: Rule[]
}

export class Parameter {
    id: number;
    name: string;
    parameterValues: ParameterValues[];
}

export class ParameterValues {
    id: number;
    name: string;
}

export class Rule {
    id: number;
    name: string;

    //[...(parameter1, value1)]
    parameterId1: number;
    parameterId2: number;

    parameterValueId1: number;
    parameterValueId2: number;
}

//lista med alla parametrar

/*jag vill ha en lista med alla parametrar och deras värden kopplade till en produkt
 *
 * alla parametrar för den valda produkten
 * 
 */





//lista med regler 
  
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
  