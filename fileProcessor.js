import { readFile} from "node:fs/promises";

const getFile = async () => {
  try {
    const file = await readFile("./data/customers.json", "utf-8");
    return file;
  } catch (error) {
    console.error("Error reading file:", error);
    throw error;
  }
}

const file = await getFile();
console.log(file)

const customers = JSON.parse(file).length;

console.log("Total customers:", customers);

const customersWithGmail = customers.filter((customer) => customer.email.endsWith("@gmail.com")).length;

console.log("Gmail customers:", customersWithGmail);