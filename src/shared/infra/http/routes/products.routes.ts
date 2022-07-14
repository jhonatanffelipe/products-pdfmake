import { Request, Response, Router } from "express";
import moment from "moment";
import PdfPrinter from "pdfmake";
import { TableCell, TDocumentDefinitions } from "pdfmake/interfaces"; // eslint-disable-line import/no-unresolved

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
  const products = await productsRepository.list();

  const fonts = {
    Helvetica: {
      normal: "Helvetica",
      bold: "Helvetica-Bold",
      italics: "Helvetica-Oblique",
      bolditalics: "Helvetica-BoldOblique",
    },
  };

  const printer = new PdfPrinter(fonts);

  const body = [];

  const columnsTitle: TableCell = [
    { text: "ID", style: "columnsTitle" },
    { text: "Descrição", style: "columnsTitle" },
    { text: "Preço", style: "columnsTitle" },
    { text: "Quantidade", style: "columnsTitle" },
  ];

  products.forEach((product) => {
    const rows = [];
    rows.push(product.id);
    rows.push(product.description);
    rows.push(product.price);
    rows.push(product.amount);
    body.push(rows);
  });

  const docDefinitions: TDocumentDefinitions = {
    defaultStyle: { font: "Helvetica" },
    content: [
      {
        columns: [
          { text: "Relatório de produtos", style: "header" },
          {
            text: `${moment().format("DD/MM/YYYY HH:mm")}hs \n\n`,
            style: "header",
            alignment: "right",
          },
        ],
      },
      {
        table: {
          heights: () => {
            return 30;
          },
          widths: [270, "auto", "auto", "auto"],
          body: [columnsTitle, ...body],
        },
      },
    ],
    styles: {
      header: {
        fontSize: 15,
        bold: true,
      },
      columnsTitle: {
        fontSize: 10,
        bold: true,
        fillColor: "#7159c1",
        color: "#fff",
        alignment: "center",
      },
    },
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
