
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CUSTOMER_FILE = path.join(
  __dirname,
  "../data/customers.json"
);

const readCustomers = async () => {
  try {
    const data = await readFile(CUSTOMER_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      return [];
    }

    throw error;
  }
};

const writeCustomers = async (customers) => {
  await writeFile(
    CUSTOMER_FILE,
    JSON.stringify(customers, null, 2),
    "utf-8"
  );
};

const validateCustomer = (customer) => {
  if (!customer.name?.trim()) {
    throw new Error("Customer name is required");
  }

  if (!customer.email?.trim() || !customer.email.includes("@")) {
    throw new Error("A valid customer email is required");
  }

  if (!customer.phone?.trim()) {
    throw new Error("Customer phone is required");
  }
};

const getAllCustomers = async () => {
  return await readCustomers();
};

const getCustomerById = async (id) => {
  const customers = await readCustomers();

  const numericId = Number(id);

  if (!Number.isInteger(numericId) || numericId <= 0) {
    return null;
  }

  return customers.find(
    (customer) => customer.id === numericId
  ) || null;
};

const createCustomer = async (customer) => {
  validateCustomer(customer);

  const customers = await readCustomers();

  const nextId =
    customers.length > 0
      ? Math.max(...customers.map((c) => c.id)) + 1
      : 1;

  const newCustomer = {
    id: nextId,
    name: customer.name.trim(),
    email: customer.email.trim().toLowerCase(),
    phone: customer.phone.trim(),
  };

  customers.push(newCustomer);

  await writeCustomers(customers);

  return newCustomer;
};

const updateCustomer = async (id, updates) => {
  const customers = await readCustomers();

  const numericId = Number(id);

  const index = customers.findIndex(
    (customer) => customer.id === numericId
  );

  if (index === -1) {
    return null;
  }

  const updatedCustomer = {
    ...customers[index],
    ...updates,
  };

  validateCustomer(updatedCustomer);

  customers[index] = updatedCustomer;

  await writeCustomers(customers);

  return updatedCustomer;
}

const deleteCustomer = async (id) => {
  const customers = await readCustomers();

  const numericId = Number(id);

  const index = customers.findIndex(
    (customer) => customer.id === numericId
  );

  if (index === -1) {
    return null;
  }

  const [deletedCustomer] = customers.splice(index, 1);

  await writeCustomers(customers);

  return deletedCustomer;
};

export {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  deleteCustomer,
  updateCustomer,
};
