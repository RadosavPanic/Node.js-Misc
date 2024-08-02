interface IOrder {
  description: string;
  amountInEuros: number;
}

interface ICustomer {
  name: string;
  industry?: string;
  orders?: IOrder[];
}

export { ICustomer };
