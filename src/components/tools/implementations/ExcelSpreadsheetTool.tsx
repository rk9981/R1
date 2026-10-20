import React, { useState } from 'react';
import { Table, Plus, Trash2, Download, RefreshCw, FileSpreadsheet, Calculator, Sparkles } from 'lucide-react';

interface RowData {
  id: string;
  item: string;
  category: string;
  quantity: number;
  unitPrice: number;
  status: 'In Stock' | 'Pending' | 'Sold';
}

const INITIAL_ROWS: RowData[] = [
  { id: '1', item: 'Samsung 4K Monitor', category: 'Electronics', quantity: 4, unitPrice: 24999, status: 'In Stock' },
  { id: '2', item: 'Logitech Wireless Keyboard', category: 'Accessories', quantity: 12, unitPrice: 2499, status: 'In Stock' },
  { id: '3', item: 'Ergonomic Desk Chair', category: 'Furniture', quantity: 6, unitPrice: 11500, status: 'Pending' },
  { id: '4', item: 'MacBook Air M2', category: 'Laptops', quantity: 3, unitPrice: 89900, status: 'Sold' },
  { id: '5', item: 'Noise Canceling Headphones', category: 'Audio', quantity: 8, unitPrice: 7999, status: 'In Stock' }
];

export const ExcelSpreadsheetTool: React.FC = () => {
  const [rows, setRows] = useState<RowData[]>(INITIAL_ROWS);
  const [currencySymbol, setCurrencySymbol] = useState<string>('₹');

  const addRow = () => {
    const newRow: RowData = {
      id: Date.now().toString(),
      item: 'New Product ' + (rows.length + 1),
      category: 'General',
      quantity: 1,
      unitPrice: 1000,
      status: 'In Stock'
    };
    setRows([...rows, newRow]);
  };

  const deleteRow = (id: string) => {
    setRows(rows.filter((r) => r.id !== id));
  };

  const updateCell = (id: string, field: keyof RowData, value: any) => {
    setRows(
      rows.map((row) => {
        if (row.id === id) {
          return { ...row, [field]: value };
        }
        return row;
      })
    );
  };

  // Calculations
  const totalAmount = rows.reduce((sum, r) => sum + r.quantity * r.unitPrice, 0);
  const totalQuantity = rows.reduce((sum, r) => sum + Number(r.quantity || 0), 0);
  const averagePrice = rows.length > 0 ? (totalAmount / totalQuantity).toFixed(2) : '0';

  const exportCsv = () => {
    const headers = ['ID,Item,Category,Quantity,UnitPrice,Total,Status'];
    const csvRows = rows.map((r) =>
      `"${r.id}","${r.item}","${r.category}",${r.quantity},${r.unitPrice},${r.quantity * r.unitPrice},"${r.status}"`
    );
    const csvContent = [headers, ...csvRows].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `MegaTools_Spreadsheet_${Date.now()}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const exportJson = () => {
    const dataWithTotals = rows.map((r) => ({
      ...r,
      total: r.quantity * r.unitPrice
    }));
    const blob = new Blob([JSON.stringify(dataWithTotals, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `MegaTools_Data_${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Top Controls & Formula Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-2xl bg-slate-900 border border-emerald-500/30">
          <p className="text-[11px] font-semibold text-emerald-400">कुल योग (Total Grand Sum)</p>
          <p className="text-xl font-black text-white mt-0.5">
            {currencySymbol} {totalAmount.toLocaleString('en-IN')}
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900 border border-purple-500/30">
          <p className="text-[11px] font-semibold text-purple-300">कुल मात्रा (Total Units)</p>
          <p className="text-xl font-black text-white mt-0.5">{totalQuantity} Pieces</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900 border border-cyan-500/30">
          <p className="text-[11px] font-semibold text-cyan-400">औसत मूल्य (Avg Price/Unit)</p>
          <p className="text-xl font-black text-white mt-0.5">
            {currencySymbol} {Number(averagePrice).toLocaleString('en-IN')}
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900 border border-amber-500/30 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold text-amber-300">करेंसी (Currency)</p>
            <div className="flex gap-2 mt-1">
              {['₹', '$', '€', '£'].map((sym) => (
                <button
                  key={sym}
                  type="button"
                  onClick={() => setCurrencySymbol(sym)}
                  className={`w-7 h-7 rounded-lg text-xs font-bold ${
                    currencySymbol === sym
                      ? 'bg-amber-400 text-slate-950'
                      : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  {sym}
                </button>
              ))}
            </div>
          </div>
          <Calculator className="w-6 h-6 text-amber-400" />
        </div>
      </div>

      {/* Spreadsheet Action Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/80 p-3 rounded-2xl border border-purple-500/20">
        <div className="flex items-center gap-2">
          <button
            onClick={addRow}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>नई रो जोड़ें (Add Row)</span>
          </button>

          <button
            onClick={() => setRows(INITIAL_ROWS)}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-purple-200 transition-all cursor-pointer"
          >
            रीसेट करें (Reset Table)
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={exportCsv}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:brightness-110 active:scale-95 transition-all shadow-md shadow-emerald-600/30 cursor-pointer"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>CSV / Excel फाइल डाउनलोड करें</span>
          </button>

          <button
            onClick={exportJson}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-purple-200 hover:text-white transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>JSON</span>
          </button>
        </div>
      </div>

      {/* Editable Grid Table */}
      <div className="overflow-x-auto rounded-2xl border border-purple-500/20 bg-slate-950/90 shadow-inner">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-900/90 text-purple-200 uppercase text-[10px] tracking-wider border-b border-white/10 font-bold">
            <tr>
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">आइटम नाम (Item Name)</th>
              <th className="py-3 px-4">कैटेगरी (Category)</th>
              <th className="py-3 px-4">मात्रा (Qty)</th>
              <th className="py-3 px-4">दर (Unit Price)</th>
              <th className="py-3 px-4">कुल (Total)</th>
              <th className="py-3 px-4">स्थिति (Status)</th>
              <th className="py-3 px-4 text-center">क्रिया</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {rows.map((row, index) => (
              <tr key={row.id} className="hover:bg-purple-950/20 transition-colors">
                <td className="py-2.5 px-4 text-purple-400 font-mono">{index + 1}</td>
                <td className="py-2.5 px-4 min-w-[180px]">
                  <input
                    type="text"
                    value={row.item}
                    onChange={(e) => updateCell(row.id, 'item', e.target.value)}
                    className="w-full bg-slate-900 border border-purple-500/20 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </td>
                <td className="py-2.5 px-4 min-w-[120px]">
                  <input
                    type="text"
                    value={row.category}
                    onChange={(e) => updateCell(row.id, 'category', e.target.value)}
                    className="w-full bg-slate-900 border border-purple-500/20 rounded-lg px-2.5 py-1 text-xs text-purple-200 focus:outline-none focus:border-cyan-400"
                  />
                </td>
                <td className="py-2.5 px-4 w-24">
                  <input
                    type="number"
                    min="1"
                    value={row.quantity}
                    onChange={(e) => updateCell(row.id, 'quantity', Number(e.target.value))}
                    className="w-full bg-slate-900 border border-purple-500/20 rounded-lg px-2 py-1 text-xs text-white text-center focus:outline-none focus:border-cyan-400"
                  />
                </td>
                <td className="py-2.5 px-4 w-32">
                  <div className="relative">
                    <span className="absolute left-2 top-1 text-purple-400">{currencySymbol}</span>
                    <input
                      type="number"
                      min="0"
                      value={row.unitPrice}
                      onChange={(e) => updateCell(row.id, 'unitPrice', Number(e.target.value))}
                      className="w-full bg-slate-900 border border-purple-500/20 rounded-lg pl-6 pr-2 py-1 text-xs text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </td>
                <td className="py-2.5 px-4 font-bold text-emerald-400 font-mono whitespace-nowrap">
                  {currencySymbol} {(row.quantity * row.unitPrice).toLocaleString('en-IN')}
                </td>
                <td className="py-2.5 px-4">
                  <select
                    value={row.status}
                    onChange={(e) => updateCell(row.id, 'status', e.target.value)}
                    className="bg-slate-900 border border-purple-500/20 rounded-lg px-2 py-1 text-xs text-purple-200 focus:outline-none"
                  >
                    <option value="In Stock">In Stock</option>
                    <option value="Pending">Pending</option>
                    <option value="Sold">Sold</option>
                  </select>
                </td>
                <td className="py-2.5 px-4 text-center">
                  <button
                    onClick={() => deleteRow(row.id)}
                    className="p-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900 text-rose-400 hover:text-white transition-colors cursor-pointer"
                    title="हटाएं"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
