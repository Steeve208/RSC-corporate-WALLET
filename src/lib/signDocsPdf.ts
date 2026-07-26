import { PDFDocument } from 'pdf-lib';
import type { SignatureStamp } from './signDocsApi';

/** posY is percentage from bottom of page (pdf-lib origin). page -1 = last page. */
export async function mergeSignaturesIntoPdf(
  pdfBytes: ArrayBuffer,
  stamps: SignatureStamp[]
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const pages = pdfDoc.getPages();

  for (const stamp of stamps) {
    const pageIndex =
      stamp.page < 0 ? pages.length + stamp.page : Math.min(stamp.page, pages.length - 1);
    const page = pages[Math.max(0, pageIndex)];
    const { width, height } = page.getSize();

    const pngBytes = Uint8Array.from(atob(stamp.imageBase64), (c) => c.charCodeAt(0));
    const image = await pdfDoc.embedPng(pngBytes);

    const boxW = (stamp.posW / 100) * width;
    const boxH = (stamp.posH / 100) * height;
    const x = (stamp.posX / 100) * width;
    const y = (stamp.posY / 100) * height;

    page.drawImage(image, { x, y, width: boxW, height: boxH });

    page.drawText(`${stamp.name} — ${stamp.roleLabel}`, {
      x,
      y: y - 10,
      size: 7,
    });
  }

  return pdfDoc.save();
}

export function downloadPdfBytes(bytes: Uint8Array, filename: string) {
  const copy = Uint8Array.from(bytes);
  const blob = new Blob([copy], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
