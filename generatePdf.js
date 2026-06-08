import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

async function createResumePdf() {
  const pdfDoc = await PDFDocument.create();
  const timesBoldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const timesFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Letter page: 612 x 792
  let page = pdfDoc.addPage([612, 792]);
  let { width, height } = page.getSize();
  
  let y = height - 50;
  const marginX = 50;

  function drawText(text, options = {}) {
    const font = options.bold ? timesBoldFont : timesFont;
    const size = options.size || 10;
    const color = options.color || rgb(0.1, 0.1, 0.1);
    const lineGap = options.lineGap || 14;

    const words = text.split(' ');
    let line = '';
    const maxWidth = width - (marginX * 2);

    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + ' ';
      const testWidth = font.widthOfTextAtSize(testLine, size);
      
      if (testWidth > maxWidth && i > 0) {
        if (y < 45) {
          page = pdfDoc.addPage([612, 792]);
          y = height - 50;
        }
        page.drawText(line.trim(), {
          x: marginX,
          y,
          size,
          font,
          color,
        });
        line = words[i] + ' ';
        y -= lineGap;
      } else {
        line = testLine;
      }
    }

    if (line.trim()) {
      if (y < 45) {
        page = pdfDoc.addPage([612, 792]);
        y = height - 50;
      }
      page.drawText(line.trim(), {
        x: marginX,
        y,
        size,
        font,
        color,
      });
      y -= lineGap;
    }
  }

  function drawHeading(text) {
    y -= 10;
    drawText(text, { bold: true, size: 12, color: rgb(0.05, 0.05, 0.05) });
    y -= 2;
    // Draw a thin horizontal line under main headings
    page.drawLine({
      start: { x: marginX, y: y + 2 },
      end: { x: width - marginX, y: y + 2 },
      thickness: 0.5,
      color: rgb(0.7, 0.7, 0.7),
    });
    y -= 8;
  }

  // Header Name
  const nameText = 'Rajat Pande';
  const nameWidth = timesBoldFont.widthOfTextAtSize(nameText, 20);
  page.drawText(nameText, {
    x: (width - nameWidth) / 2,
    y,
    size: 20,
    font: timesBoldFont,
    color: rgb(0.05, 0.05, 0.05),
  });
  y -= 20;

  // Title
  const titleText = 'SAP ABAP Consultant';
  const titleWidth = timesFont.widthOfTextAtSize(titleText, 11);
  page.drawText(titleText, {
    x: (width - titleWidth) / 2,
    y,
    size: 11,
    font: timesFont,
    color: rgb(0.2, 0.2, 0.2),
  });
  y -= 15;

  // Contact info
  const contactText = 'Bangalore, Karnataka, India  |  +91 8218944922  |  panderajat27@gmail.com';
  const contactWidth = timesFont.widthOfTextAtSize(contactText, 9.5);
  page.drawText(contactText, {
    x: (width - contactWidth) / 2,
    y,
    size: 9.5,
    font: timesFont,
    color: rgb(0.3, 0.3, 0.3),
  });
  y -= 20;

  // Professional Summary
  drawHeading('PROFESSIONAL SUMMARY');
  drawText('SAP ABAP Consultant with 5+ years of experience in enterprise product development, performance optimization, and scalable SAP solutions across S/4HANA and ECC environments. Expert in Object-Oriented ABAP, data-intensive processing, and Agile delivery models. Experienced in collaborating with cross-functional teams across the US, Europe, Poland, and Slovakia. Actively seeking remote SAP ABAP consulting opportunities.', { size: 10, lineGap: 14 });

  // Skills
  drawHeading('SKILLS');
  drawText('OOPS ABAP, SAP ECC, SAP S/4HANA, RAP, RICEFW, ALV, MCP, Module Pool, Open SQL, SAP BTP, CDS Views, OData Services, Dynamic programming, Performance Optimization, Agile/Scrum, JIRA', { size: 10, lineGap: 14 });

  // Experience
  drawHeading('PROFESSIONAL EXPERIENCE');

  // Job 1
  drawText('SNP - VALIDATE – Senior ABAP Consultant | Bangalore, India (July 2020 – Present)', { bold: true, size: 10.5 });
  y -= 2;
  const bullets1 = [
    'Designed and implemented LLMs MCP-based APIs integrating with SAP systems, enabling AI-driven business data access, reducing manual data lookup efforts by 80% and improving tool usability by 70%.',
    'Designed and delivered complex SAP ABAP applications using Object-Oriented ABAP (OOPS) and design patterns, improving code maintainability by 30% and accelerating feature delivery across SAP ECC and S/4HANA landscapes.',
    'Delivered 100+ user stories, resolved 170+ defects, and managed 250+ tasks using Agile and JIRA.',
    'Optimized large-scale data processing using advanced clustering, hashing and aggregation techniques, achieving up to 90% faster retrieval.',
    'Collaborated with functional consultants to deliver scalable SAP solutions, leveraging AI tools for requirement analysis, solution design, and preparation of technical specifications for junior developers, improving development efficiency by 30%.'
  ];
  for (const bullet of bullets1) {
    drawText('• ' + bullet, { size: 9.5, lineGap: 13.5 });
  }
  y -= 6;

  // Job 2
  drawText('EXA AG – OTP Extractor – Technology Consultant | Bangalore, India (March 2022 – August 2022)', { bold: true, size: 10.5 });
  y -= 2;
  const bullets2 = [
    'Implemented end-to-end OTP extractor framework including data extraction, AL11 handling, and imports to desired systems.',
    'Improved performance using parallel cursor techniques and background jobs.',
    'Used dynamic programming to implement complex business logics.'
  ];
  for (const bullet of bullets2) {
    drawText('• ' + bullet, { size: 9.5, lineGap: 13.5 });
  }
  y -= 6;

  // Job 3
  drawText('EXA OTP (Operational Transfer Pricing) – Technology Consultant (April 2021 – February 2022)', { bold: true, size: 10.5 });
  y -= 2;
  const bullets3 = [
    'Built and exposed backend data using ABAP CDS Views and OData services in a SAP S/4HANA system, enabling data consumption and visualization on SAP BTP (Business Technology Platform).',
    'Developed and maintained databases, views, and Table Maintenance Generators (TMGs) in the S/4HANA environment.',
    'Designed and implemented an automated translation utility for SAP backend objects, reducing manual effort by 95%.',
    'Resolved critical defects, improving overall application stability and performance.'
  ];
  for (const bullet of bullets3) {
    drawText('• ' + bullet, { size: 9.5, lineGap: 13.5 });
  }
  y -= 6;

  // Education
  drawHeading('EDUCATION');
  drawText('Bachelor of Technology – Electronics and Communication Engineering', { bold: true, size: 10 });
  drawText('Vellore Institute of Technology (VIT) | Vellore, Tamil Nadu', { size: 9.5 });
  y -= 4;
  drawText('12th Standard – Doon International School, Dehradun | 87% | 2016', { size: 9.5 });
  drawText('10th Standard – Doon International School, Dehradun | GPA: 8.6 | 2014', { size: 9.5 });
  y -= 6;

  // Additional Skills
  drawHeading('ADDITIONAL SKILLS');
  const addBullets = [
    'Scrum Master experience for Agile teams, improving sprint delivery by 20%.',
    'Trained and mentored new joiners in SAP ABAP.',
    'Performed beatboxing at college festivals and corporate office events.'
  ];
  for (const bullet of addBullets) {
    drawText('• ' + bullet, { size: 9.5, lineGap: 13.5 });
  }

  const pdfBytes = await pdfDoc.save();
  const destPath = path.join(process.cwd(), 'public', 'resume.pdf');
  
  // Ensure public directory exists
  if (!fs.existsSync(path.dirname(destPath))) {
    fs.mkdirSync(path.dirname(destPath), { recursive: true });
  }
  
  fs.writeFileSync(destPath, pdfBytes);
  console.log('PDF Resume built successfully at', destPath);
}

createResumePdf().catch(err => {
  console.error('Error generating PDF:', err);
  process.exit(1);
});
