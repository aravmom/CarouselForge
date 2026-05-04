import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';

/**
 * Export carousel slides as a LinkedIn-ready PDF (1080x1080 per page)
 * @param {HTMLElement[]} slideElements - Array of DOM elements to capture
 * @param {string} filename - Output filename
 */
export async function exportCarouselPdf(slideElements, filename = 'carousel.pdf') {
  if (!slideElements.length) return;

  // LinkedIn carousel = PDF with square pages (1080x1080)
  // 1080px = 285.75mm at 96dpi
  const pageW = 285.75;
  const pageH = 285.75;
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: [pageW, pageH],
  });

  for (let i = 0; i < slideElements.length; i++) {
    const el = slideElements[i];
    if (i > 0) pdf.addPage([pageW, pageH]);

    try {
      const dataUrl = await toPng(el, {
        width: 1080,
        height: 1080,
        pixelRatio: 2,
        cacheBust: true,
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left',
        },
      });

      pdf.addImage(dataUrl, 'PNG', 0, 0, pageW, pageH);
    } catch (err) {
      console.error(`Error capturing slide ${i + 1}:`, err);
    }
  }

  pdf.save(filename);
}

/**
 * Export a single slide as PNG
 */
export async function exportSlidePng(slideElement, filename = 'slide.png') {
  try {
    const dataUrl = await toPng(slideElement, {
      width: 1080,
      height: 1080,
      pixelRatio: 2,
      cacheBust: true,
    });

    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    link.click();
  } catch (err) {
    console.error('Error exporting slide:', err);
  }
}
