import * as ExcelJS from 'exceljs';

export class ExcelHelper {
  static isRichTextValue(
    value: ExcelJS.CellValue,
  ): value is ExcelJS.CellRichTextValue {
    return (
      value !== null &&
      typeof value === 'object' &&
      'richText' in value &&
      Array.isArray(value.richText)
    );
  }

  static cellToString(value: ExcelJS.CellValue): string {
    if (value === null || value === undefined) return '';

    // primitive
    if (typeof value === 'string') return value;
    if (typeof value === 'number') return value.toString();
    if (typeof value === 'boolean') return value ? 'true' : 'false';

    // Date
    if (value instanceof Date) return value.toISOString();

    // Formula
    if (typeof value === 'object' && 'formula' in value) {
      const formulaValue = value as ExcelJS.CellFormulaValue;
      return formulaValue.result
        ? ExcelHelper.cellToString(formulaValue.result as ExcelJS.CellValue)
        : '';
    }

    // Rich Text (type-safe)
    if (ExcelHelper.isRichTextValue(value)) {
      return value.richText.map((t) => t.text).join('');
    }

    // Fallback
    try {
      return JSON.stringify(value);
    } catch {
      return '';
    }
  }

  static autoFitColumns(sheet: ExcelJS.Worksheet, minWidth = 10) {
    sheet.columns.forEach((column) => {
      const col = column as ExcelJS.Column;
      if (!col?.eachCell) return;

      let maxLength = minWidth;

      col.eachCell({ includeEmpty: true }, (cell) => {
        const str = ExcelHelper.cellToString(cell.value);
        maxLength = Math.max(maxLength, str.length);
      });

      col.width = maxLength + 2;
    });
  }
}
