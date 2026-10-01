import { jsPDF } from 'jspdf';
import { CartItem, Currency } from '../types';

interface InvoiceData {
  orderNumber: string;
  cartItems: CartItem[];
  currency: Currency;
  total: number;
  transactionId?: string;
  paymentMethod?: string;
  gateway?: string;
  recipientName?: string;
  destinationCity?: string;
}

export function generateInvoicePDF(data: InvoiceData): void {
  const {
    orderNumber,
    cartItems,
    currency,
    total,
    transactionId = `TXN-${orderNumber}`,
    paymentMethod = 'UPI / NetBanking',
    gateway = 'Atelier Vault Gateway',
    recipientName = 'Valued Patron',
    destinationCity = 'India'
  } = data;

  // Initialize jsPDF A4 document
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;

  // Primary palette
  const darkBg = [18, 18, 18]; // #121212
  const goldColor = [197, 160, 89]; // #c5a059
  const textDark = [35, 35, 35];
  const textMuted = [115, 115, 115];
  const borderLight = [225, 225, 225];

  // 1. Top Decorative Brand Banner
  doc.setFillColor(darkBg[0], darkBg[1], darkBg[2]);
  doc.rect(0, 0, pageWidth, 38, 'F');

  // Gold accent accent stripe under banner
  doc.setFillColor(goldColor[0], goldColor[1], goldColor[2]);
  doc.rect(0, 38, pageWidth, 1.8, 'F');

  // Brand Name in header
  doc.setTextColor(goldColor[0], goldColor[1], goldColor[2]);
  doc.setFont('times', 'bold');
  doc.setFontSize(22);
  doc.text('VARNAM', margin, 18);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(240, 240, 240);
  doc.text('LUXURY HANDLOOM & BRIDAL ATELIER', margin, 24);
  doc.setTextColor(170, 170, 170);
  doc.text('Silk Mark Certified Guild • Kanchipuram • Varanasi • New Delhi', margin, 29);

  // Right Header: Invoice Badge
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(goldColor[0], goldColor[1], goldColor[2]);
  doc.text('OFFICIAL TAX INVOICE', pageWidth - margin, 16, { align: 'right' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(220, 220, 220);
  doc.text(`INVOICE #: VRN-${orderNumber}`, pageWidth - margin, 22, { align: 'right' });
  doc.text(`DATE: ${new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}`, pageWidth - margin, 27, { align: 'right' });
  doc.text('STATUS: PAID & VERIFIED (256-BIT SSL)', pageWidth - margin, 32, { align: 'right' });

  // 2. Information Grid: Billed To / Patron & Order Details Box
  let currentY = 48;

  // Box 1: Billed To (Left)
  doc.setFillColor(250, 250, 250);
  doc.setDrawColor(borderLight[0], borderLight[1], borderLight[2]);
  doc.roundedRect(margin, currentY, (pageWidth - margin * 2) / 2 - 3, 34, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(goldColor[0], goldColor[1], goldColor[2]);
  doc.text('PATRON BILLING & SHIPPING', margin + 4, currentY + 6);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text(recipientName, margin + 4, currentY + 12);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text(`Destination: ${destinationCity}`, margin + 4, currentY + 17);
  doc.text('Trousseau Keepsake Packaging: Yes (Insured)', margin + 4, currentY + 22);
  doc.text('Quality Check: Passed 100/100 (Master Weaver Guild)', margin + 4, currentY + 27);

  // Box 2: Order & Transaction Metadata (Right)
  const rightBoxX = margin + (pageWidth - margin * 2) / 2 + 3;
  const boxWidth = (pageWidth - margin * 2) / 2 - 3;
  doc.setFillColor(250, 250, 250);
  doc.roundedRect(rightBoxX, currentY, boxWidth, 34, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(goldColor[0], goldColor[1], goldColor[2]);
  doc.text('TRANSACTION DETAILS', rightBoxX + 4, currentY + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text(`Order Reference: #${orderNumber}`, rightBoxX + 4, currentY + 12);
  doc.text(`Payment Gateway: ${gateway}`, rightBoxX + 4, currentY + 17);
  doc.text(`Transaction ID: ${transactionId}`, rightBoxX + 4, currentY + 22);
  doc.text(`Method: ${paymentMethod.toUpperCase()}`, rightBoxX + 4, currentY + 27);

  // 3. Line Items Table Header
  currentY = 90;

  doc.setFillColor(darkBg[0], darkBg[1], darkBg[2]);
  doc.rect(margin, currentY, pageWidth - margin * 2, 8, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(goldColor[0], goldColor[1], goldColor[2]);

  doc.text('#', margin + 3, currentY + 5.5);
  doc.text('HANDLOOM ITEM & DESCRIPTION', margin + 12, currentY + 5.5);
  doc.text('BLOUSE OPTION', margin + 98, currentY + 5.5);
  doc.text('QTY', margin + 138, currentY + 5.5);
  doc.text('PRICE', pageWidth - margin - 3, currentY + 5.5, { align: 'right' });

  currentY += 8;

  // 4. Line Items Rows
  const currencySymbol = currency === 'INR' ? 'Rs.' : currency;
  let itemsSubtotal = 0;
  let blouseSubtotal = 0;
  let giftWrapSubtotal = 0;

  cartItems.forEach((item, index) => {
    const itemTotal = item.saree.price * item.quantity;
    const blouseTotal = item.blouseOption.price * item.quantity;
    const giftTotal = (item.giftWrap ? 250 : 0) * item.quantity;
    itemsSubtotal += itemTotal;
    blouseSubtotal += blouseTotal;
    giftWrapSubtotal += giftTotal;

    // Row background alternation
    if (index % 2 === 1) {
      doc.setFillColor(248, 248, 248);
      doc.rect(margin, currentY, pageWidth - margin * 2, 14, 'F');
    }

    // Row border bottom
    doc.setDrawColor(borderLight[0], borderLight[1], borderLight[2]);
    doc.line(margin, currentY + 14, pageWidth - margin, currentY + 14);

    // Item Number
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    doc.text(`${index + 1}`, margin + 3, currentY + 6);

    // Item Name & Weave Info
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.text(item.saree.name, margin + 12, currentY + 5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
    const craftInfo = `${item.saree.fabric} • ${item.saree.craft} • ${item.saree.originRegion}`;
    doc.text(craftInfo, margin + 12, currentY + 9.5);

    // Blouse Option
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    doc.text(item.blouseOption.name, margin + 98, currentY + 5);
    doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
    doc.text(
      item.blouseOption.price > 0 
        ? `(+${currencySymbol} ${item.blouseOption.price.toLocaleString()})`
        : '(Unstitched piece)',
      margin + 98,
      currentY + 9.5
    );

    // Quantity
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    doc.text(`${item.quantity}`, margin + 141, currentY + 6);

    // Line Total
    const rowTotal = itemTotal + blouseTotal + giftTotal;
    doc.setFont('helvetica', 'bold');
    doc.text(`${currencySymbol} ${rowTotal.toLocaleString()}`, pageWidth - margin - 3, currentY + 6, { align: 'right' });

    currentY += 14;
  });

  // Complimentary Services & Packaging Notification
  currentY += 4;
  doc.setFillColor(252, 250, 244);
  doc.setDrawColor(goldColor[0], goldColor[1], goldColor[2]);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, currentY, pageWidth - margin * 2, 16, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(goldColor[0], goldColor[1], goldColor[2]);
  doc.text('COMPLIMENTARY ATELIER PRIVILEGES INCLUDED:', margin + 4, currentY + 5.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text('• Traditional Hand-Done Fall & Pico Hemming: Included (Free of Cost)', margin + 4, currentY + 10);
  doc.text('• Authentic Ministry of Textiles Silk Mark Hologram affixed with individual serial code', margin + 4, currentY + 13.5);

  currentY += 21;

  // 5. Totals & Tax Breakdown Box (Right Aligned)
  const totalsBoxWidth = 85;
  const totalsBoxX = pageWidth - margin - totalsBoxWidth;

  doc.setFillColor(250, 250, 250);
  doc.setDrawColor(borderLight[0], borderLight[1], borderLight[2]);
  doc.roundedRect(totalsBoxX, currentY, totalsBoxWidth, 38, 2, 2, 'FD');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);

  doc.text('Sarees Subtotal:', totalsBoxX + 4, currentY + 6);
  doc.text(`${currencySymbol} ${itemsSubtotal.toLocaleString()}`, pageWidth - margin - 4, currentY + 6, { align: 'right' });

  doc.text('Blouse Stitching:', totalsBoxX + 4, currentY + 11);
  doc.text(
    blouseSubtotal > 0 ? `${currencySymbol} ${blouseSubtotal.toLocaleString()}` : 'Free / Unstitched',
    pageWidth - margin - 4,
    currentY + 11,
    { align: 'right' }
  );

  doc.text('Fall & Pico Hemming:', totalsBoxX + 4, currentY + 16);
  doc.setTextColor(46, 125, 50);
  doc.text('FREE (Complimentary)', pageWidth - margin - 4, currentY + 16, { align: 'right' });
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);

  doc.text('Trousseau Packaging & Insured Shipping:', totalsBoxX + 4, currentY + 21);
  doc.text(
    giftWrapSubtotal > 0 ? `${currencySymbol} ${giftWrapSubtotal.toLocaleString()}` : 'Complimentary',
    pageWidth - margin - 4,
    currentY + 21,
    { align: 'right' }
  );

  // Grand Total Line
  doc.setDrawColor(goldColor[0], goldColor[1], goldColor[2]);
  doc.line(totalsBoxX + 4, currentY + 25, pageWidth - margin - 4, currentY + 25);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text('Net Grand Total:', totalsBoxX + 4, currentY + 32);

  doc.setTextColor(goldColor[0], goldColor[1], goldColor[2]);
  doc.setFontSize(11);
  doc.text(`${currencySymbol} ${total.toLocaleString()}`, pageWidth - margin - 4, currentY + 32, { align: 'right' });

  // Left Note alongside Totals
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(darkBg[0], darkBg[1], darkBg[2]);
  doc.text('AUTHENTICITY & WEAVER CERTIFICATION', margin, currentY + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  const certLines = [
    'This document serves as the official tax invoice and Silk Mark authenticity',
    'certificate for handcrafted sarees woven on heritage wooden pit-looms.',
    'Certified pure silk threads tested under the Central Silk Board standard.',
    '100% of tailoring and finishing carried out by master generational artisans.'
  ];
  certLines.forEach((line, i) => {
    doc.text(line, margin, currentY + 12 + i * 4.5);
  });

  // 6. Luxury Bottom Footer
  const footerY = pageHeight - 22;

  doc.setDrawColor(goldColor[0], goldColor[1], goldColor[2]);
  doc.setLineWidth(0.4);
  doc.line(margin, footerY, pageWidth - margin, footerY);

  doc.setFont('times', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(goldColor[0], goldColor[1], goldColor[2]);
  doc.text('VARNAM HANDLOOM COUTURE GUILD', margin, footerY + 5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text('Patron Support: care@varnamhandlooms.com | Tel: +91 (0) 98400 12345 | www.varnamhandlooms.com', margin, footerY + 9);
  doc.text('Regd. Atelier: Plot 42, Weavers Colony, Kanchipuram, Tamil Nadu 631501 | GSTIN: 33AAACV9876K1Z8', margin, footerY + 13);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(46, 125, 50);
  doc.text('✓ 100% PURE SILK MARK VERIFIED', pageWidth - margin, footerY + 8, { align: 'right' });

  // Save the PDF file
  doc.save(`Varnam-Tax-Invoice-${orderNumber}.pdf`);
}
