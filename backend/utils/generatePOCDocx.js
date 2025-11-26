// // utils/generatePOCDocx.js
// import {
//   Document,
//   Packer,
//   Paragraph,
//   TextRun,
//   HeadingLevel,
//   Table,
//   TableRow,
//   TableCell,
//   WidthType,
//   AlignmentType
// } from "docx";
// import fs from "fs";
// import path from "path";

// /**
//  * Generate a DOCX buffer for a POC object following the uploaded SOW structure.
//  * @param {Object} poc - populated POC document from Mongo
//  * @returns {Buffer} - docx file buffer
//  */
// export const generatePOCDocxBuffer = async (poc) => {
//   console.log("docx generatePOCDocxBuffer",poc);

//   const doc = new Document({
//     sections: [
//       {
//         properties: {},
//         children: [
//           // Title
//           new Paragraph({
//             alignment: AlignmentType.CENTER,
//             text: "Scope of Work (SOW)",
//              size: 72,
//             heading: HeadingLevel.TITLE,
//           }),
//           new Paragraph({ text: "" }),
//           new Paragraph({
//             alignment: AlignmentType.CENTER,
//             text: `Of`,
//              size: 72,
//             spacing: { after: 200 },
//           }),
//           new Paragraph({
//             alignment: AlignmentType.CENTER,
//             text: `${poc.title || "Project Title"}`,
//              size: 72,
//             heading: HeadingLevel.HEADING_1,
//           }),
//           new Paragraph({
//             children: [
//               new TextRun({
//                 text: "",
//                 break: 1  // page break
//               }),
//             ],
//           }),

//           // Table of Contents placeholder (simple)
//           new Paragraph({ text: "Table of Contents", size: 40, heading: HeadingLevel.HEADING_2 }),
//           new Paragraph({ text: "" }),
//           // Table of Contents (static list exactly as shared)
//           new Paragraph({
//             children: [
//               new TextRun({
//                 text: "Document Control ................................................................. 3",
//                 size: 32,
//               }),
//             ],
//           }),
//           new Paragraph({
//             children: [
//               new TextRun({
//                 text: "Purpose of the Document .......................................................... 4",
//                 size: 32,
//               }),
//             ],
//           }),
//           new Paragraph({
//             children: [
//               new TextRun({
//                 text: "Purpose of the Project .................................................................. 5",
//                 size: 32,
//               }),
//             ],
//           }),
//           new Paragraph({
//             children: [
//               new TextRun({
//                 text: "Requirement Map .......................................................................... 6",
//                 size: 32,
//               }),
//             ],
//           }),
//           new Paragraph({
//             children: [
//               new TextRun({
//                 text: "1. Project Details ...................................................................................... 6",
//                 size: 32,
//               }),
//             ],
//           }),
//           new Paragraph({
//             children: [
//               new TextRun({
//                 text: "2. Scope Of Project ................................................................................. 6",
//                 size: 32,
//               }),
//             ],
//           }),
//           new Paragraph({
//             children: [
//               new TextRun({
//                 text: "3. Additional Notes ................................................................................ 7",
//                 size: 32,
//               }),
//             ],
//           }),
//           new Paragraph({
//             children: [
//               new TextRun({
//                 text: "4. Mandatory Fields ............................................................................... 7",
//                 size: 32,
//               }),
//             ],
//           }),
//           new Paragraph({
//             children: [
//               new TextRun({
//                 text: "5. Annotations ......................................................................................... 9",
//                 size: 32,
//               }),
//             ],
//           }),

// ,
// new Paragraph({
//   children: [
//     new TextRun({
//       text: "",
//       break: 1  // page break
//     }),
//   ],
// }),


//           // Document Control
//           new Paragraph({ text: "Document Control",size: 32, heading: HeadingLevel.HEADING_2 }),
//           // small table with version, date, author, release summary
//           new Table({
//             width: {
//               size: 100,
//               type: WidthType.PERCENTAGE,
//             },
//             rows: [
//               new TableRow({
//                 children: [
//                   new TableCell({ children: [new Paragraph("Version")] }),
//                   new TableCell({ children: [new Paragraph("Date")] }),
//                   new TableCell({ children: [new Paragraph("Author")] }),
//                   new TableCell({ children: [new Paragraph("Release Summary")] }),
//                 ],
//               }),
//               new TableRow({
//                 children: [
//                   new TableCell({ children: [new Paragraph("1.0")] }),
//                   new TableCell({ children: [new Paragraph(poc.date ? new Date(poc.date).toLocaleDateString() : new Date().toLocaleDateString())] }),
//                   new TableCell({ children: [new Paragraph( poc.asignedBy|| "")] }),
//                   new TableCell({ children: [new Paragraph("First Release")] }),
//                 ],
//               }),
//             ],
//           }),


// ,
// new Paragraph({
//   children: [
//     new TextRun({
//       text: "",
//       break: 1  // page break
//     }),
//   ],
// }),

//           // Purpose of the Document
//           new Paragraph({ text: "Purpose of the Document",size: 40, heading: HeadingLevel.HEADING_2 }),
//           new Paragraph({
//             children: [
//               new TextRun({
//                 text:
//                   "This document comprises of the requirement details that has been either discussed with Sales team or have been shared by client with Actowiz. Compliance of the requirement will be done by technical team of Actowiz in accordance with requirement details mentioned in this document. For any deviation or change in Scope of Work, client has to explicitly communicate the same with Sales Team & Technical Team. Updated SOW document to be submitted to client in case of any deviation or change in Scope of Work Agreement. ",
//                 size: 32,
//               }),
//             ],
//           }),

//          new Paragraph({
//   children: [
//     new TextRun({
//       text: "",
//       break: 1  // page break
//     }),
//   ],
// }),
// ,

//           // Purpose of the Project
//           new Paragraph({ text: "Purpose of the Project",size: 40, heading: HeadingLevel.HEADING_2 }),
//           new Paragraph({
//             children: [
//               new TextRun({
//                 text:
//                   poc.PurposeOftheProject ||
//                   "The purpose of this project is to collect, process, and deliver product information as per requirements.",
//                 size: 32,
//               }),
//             ],
//           }),

//           new Paragraph({
//   children: [
//     new TextRun({
//       text: "",
//       break: 1  // page break
//     }),
//   ],
// }),
// ,

//           // Requirement Map heading
//           new Paragraph({ text: "Requirement Map", size: 32, heading: HeadingLevel.HEADING_2 }),
//           new Paragraph({ text: "" }),

//           // Project Details table
//           new Paragraph({ text: "1.Project Details", heading: HeadingLevel.HEADING_3 }),
//           new Table({
//             width: { size: 100, type: WidthType.PERCENTAGE },
//             rows: [
//               new TableRow({
//                 children: [
//                   new TableCell({ children: [new Paragraph("Item")],
//                     shading: {
//         fill: "16476A", // Light gray (hex color without #)
//       },
//                    }),
//                   new TableCell({ children: [new Paragraph("Description")],shading: {
//         fill: "16476A", // Light gray (hex color without #)
//       }, }),
//                 ],
//               }),
//               createRow("Project Code", poc.ProjectCode),
//               createRow("Record Count", poc.RecordCount),
//               createRow("Task Id", poc.TaskId || (poc.taskId?._id?.toString() || "")),
//               createRow("Bitrix URL", poc.BitrixURL),
//             ],
//           }),

//           new Paragraph({ text: "" }),

//           // Scope Of Project
//           new Paragraph({ text: "2.Scope Of Project",size: 32, heading: HeadingLevel.HEADING_3 }),
//           new Table({
//             width: { size: 100, type: WidthType.PERCENTAGE },
//             rows: [
//               new TableRow({
//                 children: [
//                   new TableCell({ children: [new Paragraph("Requirement")],
//                     shading: {
//         fill: "16476A", // Light gray (hex color without #)
//                     }
//                    }),
//                   new TableCell({ children: [new Paragraph("Details")],
//                     shading: {
//         fill: "16476A", // Light gray (hex color without #)
//                     }
//                    }),
//                 ],
//               }),
//               createRow("Industry", poc.Industry),
//               createRow("Client Geography", poc.ClientGeography),
//              createRow("Target Website", Array.isArray(poc.TargetWebsite) ? poc.TargetWebsite.join(", ") : poc.TargetWebsite || ""),
//               createRow("Location Coverage", poc.LocationCoverage),
//               createRow("Input Parameter", poc.InputParameter),
//               createRow("Scope of Data", poc.ScopeOfData),
//                createRow("Output Attributes", poc.OutputAttributes),
//               createRow("Output Format", poc.OutputFormat?.title || poc.OutputFormat || ""),
//               createRow("Output Delivery Mode", poc.OutputDeliveryMode),
//               createRow("Frequency", poc.Frequency?.title || poc.Frequency || ""),
//               createRow("Timeline", poc.Timeline),
//               createRow("Input File",""),
//               createRow("Sample","")
//             ],
//           }),




//           new Paragraph({ text: "" }),


//           // Additional Notes
//           new Paragraph({ text: "3.Additional Notes",size: 32, heading: HeadingLevel.HEADING_3 }),
//           new Paragraph({ text: poc.AdditionalNotes || "" }),

//           new Paragraph({ text: "" }),

//           // Mandatory Fields header + rows
//           new Paragraph({ text: "4.Mandatory Fields", heading: HeadingLevel.HEADING_2 }),
//           // Header for mandatory fields table
//           new Table({
//             width: { size: 100, type: WidthType.PERCENTAGE },
//             rows: [
//               new TableRow({
//                 children: [
//                   new TableCell({ children: [new Paragraph("Header")],
//                     shading: {
//         fill: "16476A", // Light gray (hex color without #)
//                     }
//                    }),
//                   new TableCell({ children: [new Paragraph("Description")],
//                     shading: {
//         fill: "16476A", // Light gray (hex color without #)
//                     }
//                    }),
//                 ],
//               }),
//               // add rows from poc.MandatoryFields
//               ...(Array.isArray(poc.MandatoryFields) && poc.MandatoryFields.length
//                 ? poc.MandatoryFields.map((mf) =>
//                   new TableRow({
//                     children: [
//                       new TableCell({ children: [new Paragraph(mf.fieldName || "")] }),
//                       new TableCell({ children: [new Paragraph(mf.description || "")] }),
//                     ],
//                   })
//                 )
//                 : [new TableRow({ children: [new TableCell({ children: [new Paragraph("N/A")] }), new TableCell({ children: [new Paragraph("N/A")] })] })]),
//             ],
//           }),

//           new Paragraph({ text: "" }),

//           // Annotations
//           new Paragraph({ text: "Annotations", heading: HeadingLevel.HEADING_2 }),
//           new Table({
//             width: { size: 100, type: WidthType.PERCENTAGE },
//             rows: [
//               new TableRow({
//                 children: [
//                   new TableCell({ children: [new Paragraph("Item")],
//                     shading: {
//         fill: "16476A", // Light gray (hex color without #)
//                     }
//                    }),
//                   new TableCell({ children: [new Paragraph("Annotations")],
//                     shading: {
//         fill: "16476A", // Light gray (hex color without #)
//                     }
//                    }),
//                 ],
//               }),
//               createRow("Costco", ""),

//             ],
//           }),
//         ],
//       },
//     ],
//   });

//   const buffer = await Packer.toBuffer(doc);
//   return buffer;
// };

// // small helper to create table rows
// function createRow(title, value) {
//   const fontSize = 32; // Change this to increase/decrease table font size

//   return new TableRow({
//     children: [
//       new TableCell({
//         children: [
//           new Paragraph({
//             children: [
//               new TextRun({
//                 text: title || "",
//                 size: fontSize,
//               }),
//             ],
//           }),
//         ],
//       }),
//       new TableCell({
//         children: [
//           new Paragraph({
//             children: [
//               new TextRun({
//                 text: value || "",
//                 size: fontSize,
//               }),
//             ],
//           }),
//         ],
//       }),
//     ],
//   });
// }

// utils/generatePOCDocx.js
import { log } from "console";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  ShadingType,
  PageNumber,
} from "docx";
import fs from "fs";
import path from "path";

/**
 * Generate a DOCX buffer for a POC object following the uploaded SOW structure (exact reproduction).
 * @param {Object} poc - populated POC document from Mongo
 * @returns {Buffer} - docx file buffer
 */
export const generatePOCDocxBuffer = async (poc = {}) => {
  console.log("poc",poc.projectName);
  
  // Helper sizes: docx TextRun 'size' uses half-points. 11pt -> 22, 14pt -> 28, etc.
  const SIZE_BODY = 30; // 11pt
  const SIZE_H3 = 35; // 14pt
  const SIZE_H2 = 40; // 16pt
  const SIZE_H1 = 50; // 20pt
  const SIZE_TITLE = 70; // 28pt

  // Utility: page break paragraph
  const pageBreak = () =>
    new Paragraph({
      children: [new TextRun({ text: "", break: 1 })],
    });

  // Utility: many blank paragraph lines (exact reproduction uses many empty paragraphs)
  const blankLines = (count = 1) =>
    Array.from({ length: count }).map(() => new Paragraph({ text: "" }));

  // Header cell with shading and white bold text
  function headerCell(text) {
    return new TableCell({
      width: { size: 40, type: WidthType.PERCENTAGE },
      shading: {
        type: ShadingType.CLEAR,
        fill: "16476A", // header background from your DOCX
      },
      children: [
        new Paragraph({
          children: [
            new TextRun({
              text: text || "",
              bold: true,
              color: "FFFFFF",
              size: SIZE_BODY,
            }),
          ],
        }),
      ],
    });
  }

  // Row creator used for Project Details, Scope of Project, etc.
  function createRow(title, value) {
    return new TableRow({
      width: { size: 50, type: WidthType.PERCENTAGE },
      children: [
        new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({ text: title || "", size: SIZE_BODY }),
              ],
            }),
          ],
        }),
        new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({ text: value || "", size: SIZE_BODY }),
              ],
            }),
          ],
        }),
      ],
    });
  }

  // Build the document
  const doc = new Document({
    // Page size & margins (A4 + 1 inch margins)
    sections: [
      {
        properties: {
          page: {
            size: {
              orientation: "portrait",
              // A4 size in twentieths of a point: width 11906, height 16838 (these are typical values used by docx lib)
              width: 11906,
              height: 16838,
            },
            margin: {
              top: 1440, // 1 inch
              right: 1440,
              bottom: 1440,
              left: 1440,
            },
          },
        },
        children: [
          // Title block (centered)
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: "Scope of Work (SOW)",
                bold: true,
                size: SIZE_TITLE,
                font: "Calibri",
              }),
            ],
          }),
          // Insert blank paragraphs (match original file's big gap)
          ...blankLines(4), // Title page has ~20 blank lines in the uploaded DOCX
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: "Of",
                size: SIZE_H2,
                font: "Calibri",
              }),
            ],
          }),
          ...blankLines(4),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: poc.projectName || "Project Title",
                bold: true,
                size: SIZE_H1 + 8, // larger than H1 like the sample
                font: "Calibri",
              }),
            ],
          }),




          new Paragraph({
            children: [],
            pageBreakBefore: true,   // 🔥 forces a new page
          }),


          // Table of Contents heading
          new Paragraph({
            properties: {
              type: "nextPage",
            },
            children: [
              new TextRun({
                text: "Table of Contents",
                bold: true,
                size: SIZE_H2,
                font: "Calibri",
              }),
            ],
          }),
          new Paragraph({ text: "" }),

          // Static TOC entries (matching your original)
          new Paragraph({
            children: [new TextRun({ text: "Document Control ................................................................. 3", size: SIZE_BODY })],
          }),
          new Paragraph({
            children: [new TextRun({ text: "Purpose of the Document................................................................. 4", size: SIZE_BODY })],
          }),
          new Paragraph({
            children: [new TextRun({ text: "Purpose of the Project .................................................................5", size: SIZE_BODY })],
          }),
          new Paragraph({
            children: [new TextRun({ text: "Requirement Map .................................................................6", size: SIZE_BODY })],
          }),
          new Paragraph({
            children: [new TextRun({ text: "1. Project Details ................................................................. 6", size: SIZE_BODY })],
          }),
          new Paragraph({
            children: [new TextRun({ text: "2. Scope Of Project ................................................................. 6", size: SIZE_BODY })],
          }),
          new Paragraph({
            children: [new TextRun({ text: "3. Additional Notes ................................................................. 7", size: SIZE_BODY })],
          }),
          new Paragraph({
            children: [new TextRun({ text: "4. Mandatory Fields ................................................................. 7", size: SIZE_BODY })],
          }),
          new Paragraph({
            children: [new TextRun({ text: "5. Annotations ................................................................. 9", size: SIZE_BODY })],
          }),

          // page break to next section (TOC end -> Doc Control)

          new Paragraph({
            children: [],
            pageBreakBefore: true,   // 🔥 forces a new page
          }),

          // Document Control heading
          new Paragraph({

            children: [new TextRun({ text: "Document Control", bold: true, size: SIZE_H2 })],
          }),

          // Add the small table with version, date, author, release summary
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
           
            rows: [
              new TableRow({
                children: [
                  headerCell("Version"),
                  headerCell("Date"),
                  headerCell("Author"),
                  headerCell("Release Summary"),
                ],
              }),
              new TableRow({

                children: [
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "1.0", size: SIZE_BODY })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: poc.date ? new Date(poc.date).toLocaleDateString() : new Date().toLocaleDateString(), size: SIZE_BODY })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: poc.asignedBy || poc.assignedBy || "", size: SIZE_BODY })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "First Release", size: SIZE_BODY })] })] }),
                ],
              }),
            ],
          }),

          // page break (match file)

          new Paragraph({
            children: [],
            pageBreakBefore: true,   // 🔥 forces a new page
          }),

          // Purpose of the Document
          new Paragraph({

            children: [new TextRun({ text: "Purpose of the Document", bold: true, size: SIZE_H2 })]
          }),
          // large gap like original
          ...blankLines(1),
          new Paragraph({
            children: [
              new TextRun({
                text:
                  "This document comprises of the requirement details that has been either discussed with Sales team or have been shared by client with Actowiz. Compliance of the requirement will be done by technical team of Actowiz in accordance with requirement details mentioned in this document. For any deviation or change in Scope of Work, client has to explicitly communicate the same with Sales Team & Technical Team. Updated SOW document to be submitted to client in case of any deviation or change in Scope of Work Agreement.",
                size: SIZE_BODY,
              }),
            ],
          }),


          new Paragraph({
            children: [],
            pageBreakBefore: true,   // 🔥 forces a new page
          }),

          // Purpose of the Project heading
          new Paragraph({

            children: [new TextRun({ text: "Purpose of the Project", bold: true, size: SIZE_H2 })]
          }),
          ...blankLines(1),
          new Paragraph({
            children: [
              new TextRun({
                text:
                  poc.PurposeOftheProject ||
                  "",
                size: SIZE_BODY,
              }),
            ],
          }),



          // Requirement Map heading
          new Paragraph({
            children: [],
            pageBreakBefore: true,   // 🔥 forces a new page
          }),
          new Paragraph({

            children: [new TextRun({ text: "Requirement Map", bold: true, size: SIZE_H2 })]
          }),
          new Paragraph({ text: "" }),

          // 1. Project Details heading
          new Paragraph({ children: [new TextRun({ text: "1.Project Details", bold: true, size: SIZE_H3 })] }),

          // Project Details table
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            layout: "fixed",
            rows: [
              new TableRow({
                children: [
                  headerCell("Item", 50),
                  headerCell("Description", 50),
                ],
              }),
              createRow("Project Code", poc.ProjectCode || ""),
              createRow("Record Count", poc.RecordCount || ""),
              createRow("Task Id", poc.TaskId || (poc.taskId?._id?.toString() || "")),
              createRow("Bitrix URL", poc.BitrixURL || ""),
            ],
          }),

          new Paragraph({ text: "" }),

          // 2. Scope Of Project
          new Paragraph({ children: [new TextRun({ text: "2.Scope Of Project", bold: true, size: SIZE_H3 })] }),

          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [headerCell("Requirement"), headerCell("Details")],
              }),
              createRow("Industry", poc.Industry || ""),
              createRow("Client Geography", Array.isArray(poc.ClientGeography) ? poc.ClientGeography.join(", ") : (poc.ClientGeography || "")),
              createRow("Target Website", Array.isArray(poc.TargetWebsite) ? poc.TargetWebsite.join(", ") : (poc.TargetWebsite || "")),
              createRow("Location Coverage", Array.isArray(poc.LocationCoverage) ? poc.LocationCoverage.join(", ") : (poc.LocationCoverage || "")),
              createRow("Input Parameter", poc.InputParameter || ""),
              createRow("Scope of Data", poc.ScopeOfData || ""),
              createRow("Output Attributes", "Output Attributes	Mentioned Below in Mandatory Fields"),
              createRow("Output Format", poc.OutputFormat?.title || poc.OutputFormat || ""),
              createRow("Output Delivery Mode", poc.OutputDeliveryMode || ""),
              createRow("Frequency", poc.Frequency?.title || poc.Frequency || ""),
              createRow("Timeline", poc.Timeline || ""),
              createRow("Input File", poc.InputFile || ""),
              createRow("Sample", poc.Sample || ""),
            ],
          }),

          new Paragraph({ text: "" }),

          // 3. Additional Notes
          new Paragraph({ children: [new TextRun({ text: "3.Additional Notes", bold: true, size: SIZE_H3 })] }),
          new Paragraph({ children: [new TextRun({ text: poc.AdditionalNotes || "", size: SIZE_BODY })] }),

          new Paragraph({ text: "" }),

          // 4. Mandatory Fields
          new Paragraph({ children: [new TextRun({ text: "4.Mandatory Fields", bold: true, size: SIZE_H2 })] }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [headerCell("Header"), headerCell("Description")],
              }),
              // If MandatoryFields exists, map; otherwise include static list (as in your SOW)
              ...(Array.isArray(poc.MandatoryFields) && poc.MandatoryFields.length
                ? poc.MandatoryFields.map((mf) =>
                  new TableRow({
                    children: [
                      new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: mf.fieldName || "", size: SIZE_BODY })] })] }),
                      new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: mf.description || "", size: SIZE_BODY })] })] }),
                    ],
                  })
                )
                : [

                  createRow(""),
                ]),
            ],
          }),

          new Paragraph({ text: "" }),

          // Annotations section
          new Paragraph({ children: [new TextRun({ text: "5.Annotations", bold: true, size: SIZE_H2 })] }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [headerCell("Item"), headerCell("Annotations")],
              }),
              createRow("Costco", ""),
            ],
          }),

          // final page break if needed
          // pageBreak(),
        ],
      },
    ],
    // Global default run style -> Calibri 11pt
    styles: {
      default: {
        document: {
          run: {
            font: "Calibri",
            size: SIZE_BODY,
          },
          paragraph: {
            spacing: { line: 276 }, // approx 1.15 line-height
          },
        },
      },
    },
  });

  const buffer = await Packer.toBuffer(doc);
  return buffer;
};
