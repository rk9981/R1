import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import { Receipt, Plus, Trash2, Download, Check } from 'lucide-react';

interface InvoiceItem {
  id: string;
  name: string;
  qty: number;
  rate: number;
}

export const InvoicePdfGeneratorTool: React.FC = () => {
  const [invoiceNo, setInvoiceNo] = useState('INV-2026-089');
  const [date, setDate] = useState('2026-10-20');
  const [businessName, setBusinessName] = useState('Digital Cloud Solutions Pvt Ltd');
  const [clientName, setClientName] = useState('Ramesh Pandey Enterprises');
  const [taxPercent, setTaxPercent] = useState(18);
  const [currency, setCurrency] = useState('₹');

  const [items, setItems] = useState<InvoiceItem[]>([
    { id: '1', name: 'Web Application Architecture & Development', qty: 1, rate: 45000 },
    { id: '2', name: 'Cloud Hosting & Domain Setup (1 Year)', qty: 1, rate: 8500 },
    { id: '3', name: 'UI/UX Interactive Component Design', qty: 1, rate: 12000 }
  ]);

  const addItem = () => {
    setItems([
      ...items,
      { id: Date.now().toString(), name: 'New Service Item', qty: 1, rate: 2500 }
    ]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter((i) => i.id !== id));
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: any) => {
    setItems(items.map((it) => (it.id === id ? { ...it, [field]: value } : it)));
  };

  const subtotal = items.reduce((sum, item) => sum + item.qty * item.rate, 0);
  const taxAmount = (subtotal * taxPercent) / 100;
  const grandTotal = subtotal + taxAmount;

  const downloadPdf = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    // Header banner
    doc.setFillColor(30, 41, 59); // Slate-800
    doc.rect(0, 0, pageWidth, 40, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.text('TAX INVOICE', 14, 25);

    doc.setFontSize(10);
    doc.text(`Invoice No: ${invoiceNo}`, pageWidth - 14, 20, { align: 'right' });
    doc.text(`Date: ${date}`, pageWidth - 14, 28, { align: 'right' });

    // Business details
    doc.setTextColor(51, 65, 85);
    doc.setFontSize(11);
    doc.text('Billed By:', 14, 52);
    doc.setFontSize(13);
    doc.setTextColor(15, 23, 42);
    doc.text(businessName, 14, 60);

    doc.setFontSize(11);
    doc.setTextColor(51, 65, 85);
    doc.text('Billed To:', pageWidth / 2 + 10, 52);
    doc.setFontSize(13);
    doc.setTextColor(15, 23, 42);
    doc.text(clientName, pageWidth / 2 + 10, 60);

    // Table Header
    let y = 80;
    doc.setFillColor(241, 245, 249);
    doc.rect(14, y, pageWidth - 28, 8, 'F');
    doc.setFontSize(10);
    doc.setTextColor(71, 85, 105);
    doc.text('Description', 18, y + 6);
    doc.text('Qty', 120, y + 6);
    doc.text('Rate', 145, y + 6);
    doc.text('Amount', pageWidth - 18, y + 6, { align: 'right' });

    y += 14;
    doc.setTextColor(15, 23, 42);
    items.forEach((item) => {
      doc.text(item.name, 18, y);
      doc.text(item.qty.toString(), 120, y);
      doc.text(item.rate.toLocaleString('en-IN'), 145, y);
      doc.text((item.qty * item.rate).toLocaleString('en-IN'), pageWidth - 18, y, { align: 'right' });
      y += 10;
    });

    // Divider
    doc.setDrawColor(226, 232, 240);
    doc.line(14, y, pageWidth - 14, y);
    y += 10;

    // Totals
    doc.text(`Subtotal: ${currency} ${subtotal.toLocaleString('en-IN')}`, pageWidth - 18, y, { align: 'right' });
    y += 8;
    doc.text(`GST/Tax (${taxPercent}%): ${currency} ${taxAmount.toLocaleString('en-IN')}`, pageWidth - 18, y, { align: 'right' });
    y += 10;
    doc.setFontSize(14);
    doc.setTextColor(16, 185, 129); // Emerald
    doc.text(`Grand Total: ${currency} ${grandTotal.toLocaleString('en-IN')}`, pageWidth - 18, y, { align: 'right' });

    // Footer
    doc.setFontSize(9);
    doc.setTextColor(148, 163, 184);
    doc.text('Thank you for your business! Generated via MegaTools 50+ Suite.', pageWidth / 2, 280, { align: 'center' });

    doc.save(`Invoice_${invoiceNo}.pdf`);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-900/90 p-4 rounded-2xl border border-purple-500/20">
        <div>
          <label className="block text-xs font-semibold text-purple-200 mb-1">
            बिल बनाने वाली कंपनी (Your Business / Name)
          </label>
          <input
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            className="w-full bg-slate-950 border border-purple-500/30 rounded-xl px-3 py-2 text-xs text-white"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-purple-200 mb-1">
            ग्राहक का नाम (Client / Buyer Name)
          </label>
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="w-full bg-slate-950 border border-purple-500/30 rounded-xl px-3 py-2 text-xs text-white"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-purple-200 mb-1">
            इनवॉइस नंबर (Invoice #)
          </label>
          <input
            type="text"
            value={invoiceNo}
            onChange={(e) => setInvoiceNo(e.target.value)}
            className="w-full bg-slate-950 border border-purple-500/30 rounded-xl px-3 py-2 text-xs text-white"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs font-semibold text-purple-200 mb-1">टैक्स (GST %)</label>
            <input
              type="number"
              value={taxPercent}
              onChange={(e) => setTaxPercent(Number(e.target.value))}
              className="w-full bg-slate-950 border border-purple-500/30 rounded-xl px-3 py-2 text-xs text-white"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-purple-200 mb-1">करेंसी (Symbol)</label>
            <input
              type="text"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full bg-slate-950 border border-purple-500/30 rounded-xl px-3 py-2 text-xs text-white"
            />
          </div>
        </div>
      </div>

      {/* Item rows */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">
            सामान व सेवाओं की सूची (Invoice Line Items)
          </h4>
          <button
            onClick={addItem}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-cyan-500 text-slate-950 hover:bg-cyan-400 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>नया आइटम जोड़ें</span>
          </button>
        </div>

        <div className="space-y-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center gap-2 p-2.5 bg-slate-950 border border-purple-500/20 rounded-xl"
            >
              <input
                type="text"
                value={item.name}
                onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                placeholder="Description"
                className="flex-1 w-full bg-slate-900 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white"
              />
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <input
                  type="number"
                  min="1"
                  value={item.qty}
                  onChange={(e) => updateItem(item.id, 'qty', Number(e.target.value))}
                  placeholder="Qty"
                  className="w-16 bg-slate-900 border border-white/10 rounded-lg px-2 py-1.5 text-xs text-white text-center"
                />
                <input
                  type="number"
                  min="0"
                  value={item.rate}
                  onChange={(e) => updateItem(item.id, 'rate', Number(e.target.value))}
                  placeholder="Rate"
                  className="w-24 bg-slate-900 border border-white/10 rounded-lg px-2 py-1.5 text-xs text-white"
                />
                <span className="w-24 text-xs font-bold text-emerald-400 text-right font-mono">
                  {currency} {(item.qty * item.rate).toLocaleString('en-IN')}
                </span>
                <button
                  onClick={() => removeItem(item.id)}
                  className="p-1.5 rounded-lg bg-rose-950 text-rose-400 hover:bg-rose-900 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Box */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-purple-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-xs text-purple-300">
            सबटोटल: {currency} {subtotal.toLocaleString('en-IN')} | टैक्स ({taxPercent}%): {currency} {taxAmount.toLocaleString('en-IN')}
          </p>
          <p className="text-xl font-black text-emerald-400">
            कुल देय राशि: {currency} {grandTotal.toLocaleString('en-IN')}
          </p>
        </div>

        <button
          onClick={downloadPdf}
          className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-cyan-500/30 flex items-center justify-center gap-2 cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>इनवॉइस PDF डाउनलोड करें (Save Bill)</span>
        </button>
      </div>
    </div>
  );
};
