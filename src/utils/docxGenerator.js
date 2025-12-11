import { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, WidthType, BorderStyle } from "docx";
import { saveAs } from "file-saver";

export const exportToDocx = (content, filename = "Modul_Ajar.docx") => {
    const lines = content.split("\n");
    const children = [];

    let inTable = false;
    let tableRows = [];

    lines.forEach((line) => {
        const trimmed = line.trim();

        // Simple Table Parsing (Markdown style)
        if (trimmed.startsWith("|")) {
            if (!inTable) {
                inTable = true;
                tableRows = [];
            }
            // Parse row
            const cells = trimmed.split("|").filter(c => c !== "").map(c => c.trim());
            // Skip separator lines like |---|---|
            if (!cells[0].includes("---")) {
                tableRows.push(cells);
            }
            return;
        } else if (inTable) {
            // End of table
            inTable = false;
            // Create table
            if (tableRows.length > 0) {
                const table = new Table({
                    width: { size: 100, type: WidthType.PERCENTAGE },
                    rows: tableRows.map(row =>
                        new TableRow({
                            children: row.map(cellText =>
                                new TableCell({
                                    children: [new Paragraph(cellText)],
                                    width: { size: 100 / row.length, type: WidthType.PERCENTAGE },
                                    borders: {
                                        top: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                                        bottom: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                                        left: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                                        right: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                                    }
                                })
                            )
                        })
                    )
                });
                children.push(table);
                children.push(new Paragraph("")); // Spacer
            }
        }

        if (trimmed === "") {
            children.push(new Paragraph(""));
            return;
        }

        // Headers
        if (line.startsWith("# ")) {
            children.push(new Paragraph({
                text: line.replace("# ", ""),
                heading: HeadingLevel.HEADING_1,
                spacing: { before: 400, after: 200 },
            }));
        } else if (line.startsWith("## ")) {
            children.push(new Paragraph({
                text: line.replace("## ", ""),
                heading: HeadingLevel.HEADING_2,
                spacing: { before: 300, after: 150 },
            }));
        } else if (line.startsWith("### ")) {
            children.push(new Paragraph({
                text: line.replace("### ", ""),
                heading: HeadingLevel.HEADING_3,
                spacing: { before: 200, after: 100 },
            }));
        }
        // Lists
        else if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
            children.push(new Paragraph({
                text: line.trim().substring(2),
                bullet: { level: 0 }
            }));
        }
        // Numbered Lists (Simple detection)
        else if (/^\d+\./.test(line.trim())) {
            children.push(new Paragraph({
                text: line.trim(),
                spacing: { before: 100 }
            }));
        }
        // Normal Text
        else {
            // Handle Bold text simple case **text**
            // Splitting by **
            const parts = line.split("**");
            const runs = parts.map((part, index) => {
                return new TextRun({
                    text: part,
                    bold: index % 2 === 1, // Every odd index was inside ** **
                });
            });

            children.push(new Paragraph({
                children: runs,
                spacing: { after: 100 }
            }));
        }
    });

    // Flush remaining table if exists
    if (inTable && tableRows.length > 0) {
        const table = new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: tableRows.map(row =>
                new TableRow({
                    children: row.map(cellText =>
                        new TableCell({
                            children: [new Paragraph(cellText)],
                            width: { size: 100 / row.length, type: WidthType.PERCENTAGE },
                            borders: {
                                top: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                                bottom: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                                left: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                                right: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                            }
                        })
                    )
                })
            )
        });
        children.push(table);
    }

    const doc = new Document({
        sections: [{
            properties: {},
            children: children,
        }],
    });

    Packer.toBlob(doc).then((blob) => {
        saveAs(blob, filename);
    });
};
