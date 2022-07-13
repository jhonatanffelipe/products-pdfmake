import { Request, Response, response, Router } from "express";
import PdfPrinter from "pdfmake";
import { TDocumentDefinitions } from "pdfmake/interfaces"; // eslint-disable-line import/no-unresolved

import { ProductsRepository } from "../../../../modules/products/infra/typeorm/repositories/ProductsRepository";
import { CreateProductController } from "../../../../modules/products/useCases/createProduct/CreateProductController";
import { ListProductsController } from "../../../../modules/products/useCases/listProducts/ListProductController";

const productsRoutes = Router();

const createProductController = new CreateProductController();
const listProductsController = new ListProductsController();

productsRoutes.post("/", createProductController.handle);

productsRoutes.get("/", listProductsController.handle);

productsRoutes.get("/report", async (request: Request, response: Response) => {
  const productsRepository = new ProductsRepository();
  const products = (await productsRepository.list()).map((product) => {
    return [
      product.id,
      product.description,
      product.price.toString(),
      product.amount.toString(),
    ];
  });

  console.log(products);

  const fonts = {
    Helvetica: {
      normal: "Helvetica",
      bold: "Helvetica-Bold",
      italics: "Helvetica-Oblique",
      bolditalics: "Helvetica-BoldOblique",
    },
  };

  const printer = new PdfPrinter(fonts);

  const docDefinitions: TDocumentDefinitions = {
    defaultStyle: { font: "Helvetica" },
    content: [{ text: "Meu Primeiro Relatório." }],
  };

  const pdfDoc = printer.createPdfKitDocument(docDefinitions);

  const chunks = [];

  pdfDoc.on("data", (chunk) => {
    chunks.push(chunk);
  });

  pdfDoc.end();

  pdfDoc.on("end", () => {
    console.log("Aqui");
  });

  pdfDoc.on("end", () => {
    const result = Buffer.concat(chunks);
    return response.end(result);
  });
});

export { productsRoutes };
