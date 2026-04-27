import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

async function getHTMLElement(DOMSelector: string) {
    return document.querySelector(DOMSelector) as HTMLElement;
}

async function renderCanvas(el: HTMLElement) {
    const clone = el.cloneNode(true) as HTMLElement;

    const originCanvasList = el.querySelectorAll('canvas');
    const cloneCanvasList = clone.querySelectorAll('canvas');

    originCanvasList.forEach((canvas, i) => {
        try {
            const dataURL = canvas.toDataURL('image/png');

            const img = document.createElement('img');
            img.src = dataURL;
            img.style.width = canvas.style.width || canvas.width + 'px';
            img.style.height = canvas.style.height || canvas.height + 'px';

            cloneCanvasList[i]?.replaceWith(img);
        } catch (e) {}
    });

    const wrapper = document.createElement('div');
    wrapper.style.position = 'fixed';
    wrapper.style.left = '-99999px';
    wrapper.style.top = '0';

    clone.style.height = 'auto';
    clone.style.maxHeight = 'none';
    clone.style.overflow = 'visible';

    wrapper.appendChild(clone);
    document.body.appendChild(wrapper);

    try {
        await new Promise((r) => setTimeout(r, 200));

        const canvas = await html2canvas(clone, {
            scale: 2,
            useCORS: true,
            backgroundColor: '#fff',
        });

        return canvas;
    } finally {
        document.body.removeChild(wrapper);
    }
}

async function exportPDF(DOMSelector: string) {
    const el = await getHTMLElement(DOMSelector);

    const canvas = await renderCanvas(el);

    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'mm', 'a4');

    const pageWidth = 210;
    const pageHeight = 297;

    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
    }

    pdf.save(`导出_${Date.now()}.pdf`);
}

async function exportPNG(DOMSelector: string) {
    const el = await getHTMLElement(DOMSelector);

    const canvas = await renderCanvas(el);

    const url = canvas.toDataURL('image/png');

    const a = document.createElement('a');
    a.href = url;
    a.download = `截图_${Date.now()}.png`;
    a.click();
}

export { exportPDF, exportPNG };
