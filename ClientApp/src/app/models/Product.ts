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
    parameterId: number;
    id: number;
    name: string;
}

export class Rule {
    id: number;
    name: string;

    incompatableValues: ParameterValues[];
}
