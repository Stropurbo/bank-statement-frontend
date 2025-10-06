import { FileText, GripVertical, Download, Image, FileCode, Table } from 'lucide-react'

export const toolsConfig = {
	'merge-pdf': {
		title: 'Merge PDF Files',
		description: 'Combine multiple PDF documents into a single file. Drag to reorder pages before merging.',
		category: 'PDF Tools',
		apiEndpoint: 'pdf/merged/',
		allowMultiple: true,
		minFiles: 2,
		allowedTypes: ['application/pdf'],
		fileTypeLabel: 'PDF files',
		requiresPassword: true,
		allowReorder: true,
		buttonLabel: 'Merge & Download',
		processingLabel: 'Merging PDFs...',
		actionLabel: 'merge PDFs',
		outputFileName: 'sheetlypro_merge.pdf',
		keywords: 'merge pdf, combine pdf, pdf joiner, join pdf files',
		instructions: [
			'Upload multiple PDF files using the upload area above',
			'Drag and drop files to rearrange their order',
			'Click "Merge & Download" to combine them into one PDF'
		],
		features: [
			{ icon: FileText, title: 'Unlimited Files', description: 'Merge as many PDF files as you need' },
			{ icon: GripVertical, title: 'Reorder Pages', description: 'Drag & drop to arrange files in any order' },
			{ icon: Download, title: 'Fast Download', description: 'Get your merged PDF instantly' }
		]
	},
	'compress-pdf': {
		title: 'Compress PDF',
		description: 'Reduce PDF file size without losing quality.',
		category: 'PDF Tools',
		apiEndpoint: 'pdf/compress/',
		allowMultiple: false,
		allowedTypes: ['application/pdf'],
		fileTypeLabel: 'PDF file',
		requiresPassword: false,
		allowReorder: false,
		buttonLabel: 'Compress & Download',
		processingLabel: 'Compressing...',
		actionLabel: 'compress PDF',
		outputFileName: 'sheetlypro_compressed.pdf',
		keywords: 'compress pdf, reduce pdf size, pdf optimizer',
		hasQualitySelector: true,
		qualityOptions: [
			{ value: 'low', label: 'Low Quality', description: 'Maximum compression, smaller file size' },
			{ value: 'medium', label: 'Balanced', description: 'Good balance between quality and size' },
			{ value: 'high', label: 'High Quality', description: 'Minimum compression, better quality' }
		],
		defaultQuality: 'medium',
		instructions: [
			'Upload your PDF file',
			'Select compression quality',
			'Click "Compress & Download"',
			'Get your compressed PDF'
		],
		features: [
			{ icon: FileText, title: 'High Quality', description: 'Maintain quality while reducing size' },
			{ icon: Download, title: 'Fast Processing', description: 'Compress PDFs in seconds' },
			{ icon: FileCode, title: 'Smart Compression', description: 'Optimized compression algorithm' }
		]
	},
	'split-pdf': {
		title: 'Split PDF',
		description: 'Split PDF into multiple files.',
		category: 'PDF Tools',
		apiEndpoint: 'pdf/split/',
		allowMultiple: false,
		allowedTypes: ['application/pdf'],
		fileTypeLabel: 'PDF file',
		requiresPassword: false,
		allowReorder: false,
		buttonLabel: 'Split & Download',
		processingLabel: 'Splitting...',
		actionLabel: 'split PDF',
		outputFileName: 'sheetlypro_split.zip',
		keywords: 'split pdf, divide pdf, pdf splitter',
		hasCustomFields: true,
		customFields: [
			{
				name: 'split_type',
				label: 'Split Type',
				type: 'select',
				defaultValue: 'range',
				options: [
					{ value: 'range', label: 'Page Ranges (e.g., 1-5, 10-15)' },
					{ value: 'individual', label: 'Individual Pages (e.g., 1, 3, 5, 10)' },
					{ value: 'chunks', label: 'Split into Chunks (e.g., every 5 pages)' }
				]
			},
			{
				name: 'pages',
				label: 'Pages/Range',
				type: 'text',
				placeholder: 'e.g., 1-5, 10-15 or 1,3,5 or 5',
				required: true
			}
		],
		instructions: [
			'Upload your PDF file',
			'Select split type and enter page numbers',
			'Click "Split & Download"',
			'Get your split PDFs'
		],
		features: [
			{ icon: FileText, title: 'Easy Split', description: 'Split PDF files easily' },
			{ icon: Download, title: 'Quick Download', description: 'Get all split files in a zip' },
			{ icon: FileCode, title: 'Preserve Quality', description: 'No quality loss' }
		]
	},
	'pdf-to-word': {
		title: 'PDF to Word',
		description: 'Convert PDF to Word document.',
		category: 'PDF Tools',
		apiEndpoint: 'pdf/pdf-to-word/',
		allowMultiple: false,
		allowedTypes: ['application/pdf'],
		fileTypeLabel: 'PDF file',
		requiresPassword: false,
		allowReorder: false,
		buttonLabel: 'Convert & Download',
		processingLabel: 'Converting...',
		actionLabel: 'convert PDF to Word',
		outputFileName: 'sheetlypro_document.docx',
		keywords: 'pdf to word, pdf to docx, convert pdf to word',
		instructions: [
			'Upload your PDF file',
			'Click "Convert & Download"',
			'Get your Word document'
		],
		features: [
			{ icon: FileText, title: 'Accurate Conversion', description: 'Preserve formatting and layout' },
			{ icon: Download, title: 'Fast Download', description: 'Get your DOCX instantly' },
			{ icon: FileCode, title: 'Editable Output', description: 'Fully editable Word document' }
		]
	},
	'word-to-pdf': {
		title: 'Word to PDF',
		description: 'Convert Word to PDF.',
		category: 'PDF Tools',
		apiEndpoint: 'pdf/word-to-pdf/',
		allowMultiple: false,
		allowedTypes: ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'],
		fileTypeLabel: 'Word file',
		requiresPassword: false,
		allowReorder: false,
		buttonLabel: 'Convert & Download',
		processingLabel: 'Converting...',
		actionLabel: 'convert Word to PDF',
		outputFileName: 'sheetlypro_document.pdf',
		keywords: 'word to pdf, docx to pdf, convert word to pdf',
		instructions: [
			'Upload your Word file',
			'Click "Convert & Download"',
			'Get your PDF document'
		],
		features: [
			{ icon: FileText, title: 'Perfect Conversion', description: 'Keep all formatting intact' },
			{ icon: Download, title: 'Instant Download', description: 'Get your PDF quickly' },
			{ icon: FileCode, title: 'High Quality', description: 'Professional PDF output' }
		]
	},
	'pdf-to-powerpoint': {
		title: 'PDF to PowerPoint',
		description: 'Convert PDF to PowerPoint presentation.',
		category: 'PDF Tools',
		apiEndpoint: 'pdf/pdf-to-ppt/',
		allowMultiple: false,
		allowedTypes: ['application/pdf'],
		fileTypeLabel: 'PDF file',
		requiresPassword: false,
		allowReorder: false,
		buttonLabel: 'Convert & Download',
		processingLabel: 'Converting...',
		actionLabel: 'convert PDF to PowerPoint',
		outputFileName: 'sheetlypro_presentation.pptx',
		keywords: 'pdf to powerpoint, pdf to ppt, convert pdf to pptx',
		instructions: [
			'Upload your PDF file',
			'Click "Convert & Download"',
			'Get your PowerPoint presentation'
		],
		features: [
			{ icon: FileText, title: 'Smart Conversion', description: 'Convert PDF pages to slides' },
			{ icon: Download, title: 'Quick Process', description: 'Fast conversion' },
			{ icon: FileCode, title: 'Editable Slides', description: 'Fully editable PPTX' }
		]
	},
	'powerpoint-to-pdf': {
		title: 'PowerPoint to PDF',
		description: 'Convert PowerPoint to PDF.',
		category: 'PDF Tools',
		apiEndpoint: 'pdf/ppt-to-pdf/',
		allowMultiple: false,
		allowedTypes: ['application/vnd.openxmlformats-officedocument.presentationml.presentation', 'application/vnd.ms-powerpoint'],
		fileTypeLabel: 'PowerPoint file',
		requiresPassword: false,
		allowReorder: false,
		buttonLabel: 'Convert & Download',
		processingLabel: 'Converting...',
		actionLabel: 'convert PowerPoint to PDF',
		outputFileName: 'sheetlypro_presentation.pdf',
		keywords: 'powerpoint to pdf, ppt to pdf, convert pptx to pdf',
		instructions: [
			'Upload your PowerPoint file',
			'Click "Convert & Download"',
			'Get your PDF document'
		],
		features: [
			{ icon: FileText, title: 'Perfect Output', description: 'Preserve all slides and formatting' },
			{ icon: Download, title: 'Fast Conversion', description: 'Quick processing' },
			{ icon: FileCode, title: 'High Quality', description: 'Professional PDF output' }
		]
	},
	'excel-to-pdf': {
		title: 'Excel to PDF',
		description: 'Convert Excel to PDF.',
		category: 'PDF Tools',
		apiEndpoint: 'pdf/excel-to-pdf/',
		allowMultiple: false,
		allowedTypes: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'],
		fileTypeLabel: 'Excel file',
		requiresPassword: false,
		allowReorder: false,
		buttonLabel: 'Convert & Download',
		processingLabel: 'Converting...',
		actionLabel: 'convert Excel to PDF',
		outputFileName: 'sheetlypro_spreadsheet.pdf',
		keywords: 'excel to pdf, xlsx to pdf, convert excel to pdf',
		instructions: [
			'Upload your Excel file',
			'Click "Convert & Download"',
			'Get your PDF document'
		],
		features: [
			{ icon: Table, title: 'Table Preservation', description: 'Keep all tables and data' },
			{ icon: Download, title: 'Quick Convert', description: 'Fast processing' },
			{ icon: FileCode, title: 'Clean Output', description: 'Professional PDF' }
		]
	},
	'html-to-pdf': {
		title: 'HTML to PDF',
		description: 'Convert HTML to PDF.',
		category: 'PDF Tools',
		apiEndpoint: 'pdf/html-to-pdf/',
		allowMultiple: false,
		allowedTypes: ['text/html'],
		fileTypeLabel: 'HTML file',
		requiresPassword: false,
		allowReorder: false,
		buttonLabel: 'Convert & Download',
		processingLabel: 'Converting...',
		actionLabel: 'convert HTML to PDF',
		outputFileName: 'sheetlypro_webpage.pdf',
		keywords: 'html to pdf, web to pdf, convert html to pdf',
		instructions: [
			'Upload your HTML file',
			'Click "Convert & Download"',
			'Get your PDF document'
		],
		features: [
			{ icon: FileCode, title: 'Style Support', description: 'CSS and styling preserved' },
			{ icon: Download, title: 'Fast Process', description: 'Quick conversion' },
			{ icon: FileText, title: 'Clean PDF', description: 'Professional output' }
		]
	},
	'receipt-scanner': {
		title: 'Receipt Scanner',
		description: 'Scan and extract receipt data.',
		category: 'PDF Tools',
		apiEndpoint: 'receipt/receipt-scanner/',
		allowMultiple: false,
		allowedTypes: ['application/pdf', 'image/jpeg', 'image/png'],
		fileTypeLabel: 'Receipt file',
		requiresPassword: false,
		allowReorder: false,
		buttonLabel: 'Scan & Extract',
		processingLabel: 'Scanning...',
		actionLabel: 'scan receipt',
		outputFileName: 'sheetlypro_receipt_data.json',
		keywords: 'receipt scanner, extract receipt data, ocr receipt',
		instructions: [
			'Upload your receipt image or PDF',
			'Click "Scan & Extract"',
			'Get extracted receipt data'
		],
		features: [
			{ icon: FileText, title: 'Smart OCR', description: 'Extract text accurately' },
			{ icon: Download, title: 'Data Export', description: 'Get structured data' },
			{ icon: FileCode, title: 'Multiple Formats', description: 'Support PDF and images' }
		]
	},
	'pdf-to-image': {
		title: 'PDF to Image',
		description: 'Convert PDF pages to high-quality image files.',
		category: 'PDF Tools',
		apiEndpoint: 'pdf/to-image/',
		allowMultiple: false,
		allowedTypes: ['application/pdf'],
		fileTypeLabel: 'PDF file',
		requiresPassword: false,
		allowReorder: false,
		buttonLabel: 'Convert to Image',
		processingLabel: 'Converting...',
		actionLabel: 'convert PDF to image',
		outputFileName: 'sheetlypro_images.zip',
		keywords: 'pdf to image, pdf to jpg, pdf to png',
		instructions: [
			'Upload your PDF file',
			'Click "Convert to Image"',
			'Download your images'
		],
		features: [
			{ icon: Image, title: 'High Quality', description: 'Convert PDF to high-quality images' },
			{ icon: FileText, title: 'All Pages', description: 'Convert all PDF pages to images' },
			{ icon: Download, title: 'Fast Conversion', description: 'Get your images instantly' }
		]
	},

	// Notun tools add korte just evabe add koro:
	// 'tool-name': {
	//   title: 'Tool Title',
	//   description: 'Tool description',
	//   category: 'Category Name',
	//   apiEndpoint: '/api/endpoint/',
	//   allowMultiple: true/false,
	//   allowedTypes: ['mime/type'],
	//   fileTypeLabel: 'File type',
	//   requiresPassword: true/false,
	//   allowReorder: true/false,
	//   buttonLabel: 'Button text',
	//   processingLabel: 'Processing text...',
	//   actionLabel: 'action description',
	//   outputFileName: 'output.ext',
	//   keywords: 'keywords, for, seo',
	//   instructions: ['Step 1', 'Step 2', 'Step 3'],
	//   features: [
	//     { icon: IconComponent, title: 'Feature', description: 'Description' }
	//   ]
	// },
}
