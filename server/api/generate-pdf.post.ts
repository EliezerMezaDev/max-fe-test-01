import puppeteer from "puppeteer";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { htmlContent, cssContent } = body;

  if (!htmlContent) {
    throw createError({
      statusCode: 400,
      statusMessage: "Falta contenido HTML",
    });
  }

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  const fullHtml = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        ${cssContent}        
        
        body { 
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }

        @page {
          margin: 0;
          size: A4;
        }

        .spreadsheet {
          width: 100%;
          max-width: 100%;
          padding: 1rem;
        }
      </style>
    </head>
    <body>
      ${htmlContent}
    </body>
    </html>
  `;

  await page.setContent(fullHtml, {
    waitUntil: "networkidle0",
    timeout: 60000,
  });

  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: { top: "10mm", bottom: "10mm", left: "0mm", right: "0mm" },
  });

  await browser.close();

  setHeaders(event, {
    "Content-Type": "application/pdf",
    "Content-Disposition": 'attachment; filename="planilla.pdf"',
  });

  return pdfBuffer;
});
