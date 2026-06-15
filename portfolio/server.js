const express = require("express");
const path = require("path");
const fs = require("fs");

const PORT = 3003;

const app = express();
app.use(express.json());
app.use(express.static(__dirname));

// Helper function to send PDF
function sendPDF(pdfPath, filename, res) {
  fs.readFile(pdfPath, (err, data) => {
    if (err) {
      console.error("Error reading PDF:", err);
      res.status(500).json({ error: "Failed to read PDF" });
      return;
    }

    res.contentType("application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.send(data);

    // Clean up temporary file
    fs.unlink(pdfPath, (unlinkErr) => {
      if (unlinkErr) console.error("Error deleting temp file:", unlinkErr);
    });
  });
}

// CV PDF generation endpoint
app.post("/generate-pdf/cv", async (req, res) => {
  const puppeteer = require("puppeteer");
  const { execSync } = require("child_process");
  const pdfPath = path.join(__dirname, "temp_cv.pdf");
  const phoneNumber = req.body.phoneNumber || "";

  try {
    // Find system Chromium on NixOS
    let chromiumPath;
    try {
      chromiumPath = execSync(
        "which chromium 2>/dev/null || nix-shell -p chromium --run 'which chromium'",
      )
        .toString()
        .trim();
    } catch (e) {
      console.error("Chromium not found:", e.message);
    }

    const browser = await puppeteer.launch({
      headless: "new",
      executablePath: chromiumPath || undefined,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    await page.goto(`file://${path.join(__dirname, "cv/index.html")}`, {
      waitUntil: "networkidle0",
    });

    // Wait for fonts to load
    await page.evaluateHandle("document.fonts.ready");

    // Inject phone number if provided
    if (phoneNumber) {
      await page.evaluate((phone) => {
        const editableField = document.querySelector(".editable-field");
        if (editableField) {
          editableField.textContent = phone;
        }
      }, phoneNumber);
    }

    // Inject print-specific CSS if exists
    const printCssPath = path.join(__dirname, "cv/style-print.css");
    if (fs.existsSync(printCssPath)) {
      await page.addStyleTag({ path: printCssPath });
    }

    await page.pdf({
      path: pdfPath,
      format: "A4",
      margin: {
        top: "3mm",
        right: "20mm",
        bottom: "15mm",
        left: "20mm",
      },
      printBackground: true,
      preferCSSPageSize: true,
    });

    await browser.close();

    // Generate filename with year and month
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const filename = `Alessandra_Margherito_CV_${year}${month}.pdf`;

    sendPDF(pdfPath, filename, res);
  } catch (error) {
    console.error("Error generating CV PDF:", error);
    res.status(500).json({
      error: "Failed to generate CV PDF",
      message: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log("\n" + "=".repeat(60));
  console.log("🚀 PORTFOLIO SERVER");
  console.log("=".repeat(60));
  console.log(`\n📄 Server running at http://localhost:${PORT}`);
  console.log(`   Open: http://localhost:${PORT}/index.html`);
  console.log(`   CV: http://localhost:${PORT}/cv.html`);
  console.log(`   PDF Endpoint: /generate-pdf/cv`);
  console.log("\n" + "=".repeat(60) + "\n");
});
