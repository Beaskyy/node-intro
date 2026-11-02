
import {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  deleteCustomer,
} from "./services/customerService.js";

import { formatCurrency } from "./utils/formatCurrency.js";

const main = async () => {
  try {
    console.log(formatCurrency(5000));

    const john = await createCustomer({
      name: "John Doe",
      email: "john@example.com",
      phone: "1234567890",
    });

    const jane = await createCustomer({
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "9876543210",
    });

    console.log("Created customers:", john, jane);

    const customers = await getAllCustomers();
    console.log("All customers:", customers);

    const customer = await getCustomerById(1);
    console.log("Customer by ID:", customer);

    const deleted = await deleteCustomer(2);
    console.log("Deleted customer:", deleted);

  } catch (error) {
    console.error("Application error:", error.message);
  }
};

main();
