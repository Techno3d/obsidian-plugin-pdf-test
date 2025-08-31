import { FileView, Plugin, TFile, View, loadPdfJs } from 'obsidian'
import {} from 'pdfjs'

export default class ExamplePlugin extends Plugin {
	pdfjs: any;
	async onload(): Promise<void> {
		console.log("hihi");
		this.pdfjs = await loadPdfJs();
		this.app.workspace.on('file-open', async () => {
			let view = this.app.workspace.getActiveViewOfType(FileView);
			if(view?.getViewType() == "pdf") {
				console.log("Wow I have a PDF now");
				let file: TFile | null = this.app.workspace.getActiveFile()
				if (file == null) {
					return;
				}
				let pdf = await this.pdfjs.getDocument({data: await this.app.vault.readBinary(file) }).promise;
				console.log(pdf.numPages);
			}
		});
	}
}