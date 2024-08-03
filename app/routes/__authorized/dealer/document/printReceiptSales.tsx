import { text, image, barcodes } from '@pdfme/schemas';
import { generate } from "@pdfme/generator";


export default function PrintReceipt(toReceipt) {
  console.log(toReceipt, 'firstsdf')
  async function RunIt() {
    const data = toReceipt
    const template = {
      "schemas": [
        {
          "qrCode": {
            "type": "qrcode",
            "icon": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-qr-code\"><rect width=\"5\" height=\"5\" x=\"3\" y=\"3\" rx=\"1\"/><rect width=\"5\" height=\"5\" x=\"16\" y=\"3\" rx=\"1\"/><rect width=\"5\" height=\"5\" x=\"3\" y=\"16\" rx=\"1\"/><path d=\"M21 16h-3a2 2 0 0 0-2 2v3\"/><path d=\"M21 21v.01\"/><path d=\"M12 7v3a2 2 0 0 1-2 2H7\"/><path d=\"M3 12h.01\"/><path d=\"M12 3h.01\"/><path d=\"M12 16v.01\"/><path d=\"M16 12h1\"/><path d=\"M21 12v.01\"/><path d=\"M12 21v-1\"/></svg>",
            "content": "https://pdfme.com/",
            "position": {
              "x": 134.99,
              "y": 236.49
            },
            "backgroundColor": "#ffffff",
            "barColor": "#000000",
            "width": 30,
            "height": 30,
            "rotate": 0,
            "opacity": 1,
            "input": "https://pdfme.com/"
          },
          "brand": {
            "type": "text",
            "icon": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-text-cursor-input\"><path d=\"M5 4h1a3 3 0 0 1 3 3 3 3 0 0 1 3-3h1\"/><path d=\"M13 20h-1a3 3 0 0 1-3-3 3 3 0 0 1-3 3H5\"/><path d=\"M5 16H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1\"/><path d=\"M13 8h7a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-7\"/><path d=\"M9 7v10\"/></svg>",
            "content": "BMW",
            "position": {
              "x": 113.39,
              "y": 50.31
            },
            "width": 51.61,
            "height": 4.7,
            "rotate": 0,
            "alignment": "right",
            "verticalAlignment": "top",
            "fontSize": 12,
            "lineHeight": 1,
            "characterSpacing": 0,
            "fontColor": "#000000",
            "backgroundColor": "",
            "opacity": 1,
            "strikethrough": false,
            "underline": false,
            "fontName": "Roboto"
          },
          "model": {
            "type": "text",
            "icon": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-text-cursor-input\"><path d=\"M5 4h1a3 3 0 0 1 3 3 3 3 0 0 1 3-3h1\"/><path d=\"M13 20h-1a3 3 0 0 1-3-3 3 3 0 0 1-3 3H5\"/><path d=\"M5 16H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1\"/><path d=\"M13 8h7a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-7\"/><path d=\"M9 7v10\"/></svg>",
            "content": "S1000RR",
            "position": {
              "x": 113.28,
              "y": 56.39
            },
            "width": 51.61,
            "height": 4.7,
            "rotate": 0,
            "alignment": "right",
            "verticalAlignment": "top",
            "fontSize": 12,
            "lineHeight": 1,
            "characterSpacing": 0,
            "fontColor": "#000000",
            "backgroundColor": "",
            "opacity": 1,
            "strikethrough": false,
            "underline": false,
            "fontName": "Roboto"
          },
          "color": {
            "type": "text",
            "icon": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-text-cursor-input\"><path d=\"M5 4h1a3 3 0 0 1 3 3 3 3 0 0 1 3-3h1\"/><path d=\"M13 20h-1a3 3 0 0 1-3-3 3 3 0 0 1-3 3H5\"/><path d=\"M5 16H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1\"/><path d=\"M13 8h7a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-7\"/><path d=\"M9 7v10\"/></svg>",
            "content": "Black",
            "position": {
              "x": 113.5,
              "y": 62.07
            },
            "width": 51.61,
            "height": 4.7,
            "rotate": 0,
            "alignment": "right",
            "verticalAlignment": "top",
            "fontSize": 12,
            "lineHeight": 1,
            "characterSpacing": 0,
            "fontColor": "#000000",
            "backgroundColor": "",
            "opacity": 1,
            "strikethrough": false,
            "underline": false,
            "fontName": "Roboto"
          },
          "msrp": {
            "type": "text",
            "icon": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-text-cursor-input\"><path d=\"M5 4h1a3 3 0 0 1 3 3 3 3 0 0 1 3-3h1\"/><path d=\"M13 20h-1a3 3 0 0 1-3-3 3 3 0 0 1-3 3H5\"/><path d=\"M5 16H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1\"/><path d=\"M13 8h7a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-7\"/><path d=\"M9 7v10\"/></svg>",
            "content": "$19,999",
            "position": {
              "x": 113.34,
              "y": 82.08
            },
            "width": 51.61,
            "height": 4.7,
            "rotate": 0,
            "alignment": "right",
            "verticalAlignment": "top",
            "fontSize": 12,
            "lineHeight": 1,
            "characterSpacing": 0,
            "fontColor": "#000000",
            "backgroundColor": "",
            "opacity": 1,
            "strikethrough": false,
            "underline": false,
            "fontName": "Roboto"
          },
          "freight": {
            "type": "text",
            "icon": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-text-cursor-input\"><path d=\"M5 4h1a3 3 0 0 1 3 3 3 3 0 0 1 3-3h1\"/><path d=\"M13 20h-1a3 3 0 0 1-3-3 3 3 0 0 1-3 3H5\"/><path d=\"M5 16H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1\"/><path d=\"M13 8h7a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-7\"/><path d=\"M9 7v10\"/></svg>",
            "content": "$750",
            "position": {
              "x": 113.44,
              "y": 88.15
            },
            "width": 51.61,
            "height": 4.7,
            "rotate": 0,
            "alignment": "right",
            "verticalAlignment": "top",
            "fontSize": 12,
            "lineHeight": 1,
            "characterSpacing": 0,
            "fontColor": "#000000",
            "backgroundColor": "",
            "opacity": 1,
            "strikethrough": false,
            "underline": false,
            "fontName": "Roboto"
          },
          "pdi": {
            "type": "text",
            "icon": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-text-cursor-input\"><path d=\"M5 4h1a3 3 0 0 1 3 3 3 3 0 0 1 3-3h1\"/><path d=\"M13 20h-1a3 3 0 0 1-3-3 3 3 0 0 1-3 3H5\"/><path d=\"M5 16H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1\"/><path d=\"M13 8h7a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-7\"/><path d=\"M9 7v10\"/></svg>",
            "content": "$289",
            "position": {
              "x": 113.44,
              "y": 94.42
            },
            "width": 51.61,
            "height": 4.7,
            "rotate": 0,
            "alignment": "right",
            "verticalAlignment": "top",
            "fontSize": 12,
            "lineHeight": 1,
            "characterSpacing": 0,
            "fontColor": "#000000",
            "backgroundColor": "",
            "opacity": 1,
            "strikethrough": false,
            "underline": false,
            "fontName": "Roboto"
          },
          "admin": {
            "type": "text",
            "icon": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-text-cursor-input\"><path d=\"M5 4h1a3 3 0 0 1 3 3 3 3 0 0 1 3-3h1\"/><path d=\"M13 20h-1a3 3 0 0 1-3-3 3 3 0 0 1-3 3H5\"/><path d=\"M5 16H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1\"/><path d=\"M13 8h7a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-7\"/><path d=\"M9 7v10\"/></svg>",
            "content": "$289",
            "position": {
              "x": 113.38,
              "y": 100.68
            },
            "width": 51.61,
            "height": 4.7,
            "rotate": 0,
            "alignment": "right",
            "verticalAlignment": "top",
            "fontSize": 12,
            "lineHeight": 1,
            "characterSpacing": 0,
            "fontColor": "#000000",
            "backgroundColor": "",
            "opacity": 1,
            "strikethrough": false,
            "underline": false,
            "fontName": "Roboto"
          },
          "msrp copy 4": {
            "type": "text",
            "icon": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-text-cursor-input\"><path d=\"M5 4h1a3 3 0 0 1 3 3 3 3 0 0 1 3-3h1\"/><path d=\"M13 20h-1a3 3 0 0 1-3-3 3 3 0 0 1-3 3H5\"/><path d=\"M5 16H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1\"/><path d=\"M13 8h7a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-7\"/><path d=\"M9 7v10\"/></svg>",
            "content": "$500",
            "position": {
              "x": 113.48,
              "y": 107.35
            },
            "width": 51.61,
            "height": 4.7,
            "rotate": 0,
            "alignment": "right",
            "verticalAlignment": "top",
            "fontSize": 12,
            "lineHeight": 1,
            "characterSpacing": 0,
            "fontColor": "#000000",
            "backgroundColor": "",
            "opacity": 1,
            "strikethrough": false,
            "underline": false,
            "fontName": "Roboto"
          },
          "msrp copy 5": {
            "type": "text",
            "icon": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-text-cursor-input\"><path d=\"M5 4h1a3 3 0 0 1 3 3 3 3 0 0 1 3-3h1\"/><path d=\"M13 20h-1a3 3 0 0 1-3-3 3 3 0 0 1-3 3H5\"/><path d=\"M5 16H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1\"/><path d=\"M13 8h7a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-7\"/><path d=\"M9 7v10\"/></svg>",
            "content": "2",
            "position": {
              "x": 113.32,
              "y": 113.42
            },
            "width": 51.61,
            "height": 4.7,
            "rotate": 0,
            "alignment": "right",
            "verticalAlignment": "top",
            "fontSize": 12,
            "lineHeight": 1,
            "characterSpacing": 0,
            "fontColor": "#000000",
            "backgroundColor": "",
            "opacity": 1,
            "strikethrough": false,
            "underline": false,
            "fontName": "Roboto"
          },
          "msrp copy 6": {
            "type": "text",
            "icon": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-text-cursor-input\"><path d=\"M5 4h1a3 3 0 0 1 3 3 3 3 0 0 1 3-3h1\"/><path d=\"M13 20h-1a3 3 0 0 1-3-3 3 3 0 0 1-3 3H5\"/><path d=\"M5 16H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1\"/><path d=\"M13 8h7a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-7\"/><path d=\"M9 7v10\"/></svg>",
            "content": "$65",
            "position": {
              "x": 113.42,
              "y": 119.1
            },
            "width": 51.61,
            "height": 4.7,
            "rotate": 0,
            "alignment": "right",
            "verticalAlignment": "top",
            "fontSize": 12,
            "lineHeight": 1,
            "characterSpacing": 0,
            "fontColor": "#000000",
            "backgroundColor": "",
            "opacity": 1,
            "strikethrough": false,
            "underline": false,
            "fontName": "Roboto"
          },
          "weekly": {
            "type": "text",
            "icon": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-text-cursor-input\"><path d=\"M5 4h1a3 3 0 0 1 3 3 3 3 0 0 1 3-3h1\"/><path d=\"M13 20h-1a3 3 0 0 1-3-3 3 3 0 0 1-3 3H5\"/><path d=\"M5 16H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1\"/><path d=\"M13 8h7a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-7\"/><path d=\"M9 7v10\"/></svg>",
            "content": "$65/wk",
            "position": {
              "x": 50.73,
              "y": 141.22
            },
            "width": 30.7,
            "height": 4.7,
            "rotate": 0,
            "alignment": "left",
            "verticalAlignment": "top",
            "fontSize": 12,
            "lineHeight": 1,
            "characterSpacing": 0,
            "fontColor": "#000000",
            "backgroundColor": "",
            "opacity": 1,
            "strikethrough": false,
            "underline": false,
            "fontName": "Roboto"
          },
          "biweekly": {
            "type": "text",
            "icon": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-text-cursor-input\"><path d=\"M5 4h1a3 3 0 0 1 3 3 3 3 0 0 1 3-3h1\"/><path d=\"M13 20h-1a3 3 0 0 1-3-3 3 3 0 0 1-3 3H5\"/><path d=\"M5 16H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1\"/><path d=\"M13 8h7a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-7\"/><path d=\"M9 7v10\"/></svg>",
            "content": "$65/biwk",
            "position": {
              "x": 92.74,
              "y": 141.12
            },
            "width": 30.7,
            "height": 4.7,
            "rotate": 0,
            "alignment": "center",
            "verticalAlignment": "top",
            "fontSize": 12,
            "lineHeight": 1,
            "characterSpacing": 0,
            "fontColor": "#000000",
            "backgroundColor": "",
            "opacity": 1,
            "strikethrough": false,
            "underline": false,
            "fontName": "Roboto"
          },
          "monthly": {
            "type": "text",
            "icon": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-text-cursor-input\"><path d=\"M5 4h1a3 3 0 0 1 3 3 3 3 0 0 1 3-3h1\"/><path d=\"M13 20h-1a3 3 0 0 1-3-3 3 3 0 0 1-3 3H5\"/><path d=\"M5 16H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1\"/><path d=\"M13 8h7a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-7\"/><path d=\"M9 7v10\"/></svg>",
            "content": "$65/mt",
            "position": {
              "x": 134.22,
              "y": 141.16
            },
            "width": 30.7,
            "height": 4.7,
            "rotate": 0,
            "alignment": "right",
            "verticalAlignment": "top",
            "fontSize": 12,
            "lineHeight": 1,
            "characterSpacing": 0,
            "fontColor": "#000000",
            "backgroundColor": "",
            "opacity": 1,
            "strikethrough": false,
            "underline": false,
            "fontName": "Roboto"
          },
          "term": {
            "type": "text",
            "icon": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-text-cursor-input\"><path d=\"M5 4h1a3 3 0 0 1 3 3 3 3 0 0 1 3-3h1\"/><path d=\"M13 20h-1a3 3 0 0 1-3-3 3 3 0 0 1-3 3H5\"/><path d=\"M5 16H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1\"/><path d=\"M13 8h7a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-7\"/><path d=\"M9 7v10\"/></svg>",
            "content": "60",
            "position": {
              "x": 113.28,
              "y": 163.33
            },
            "width": 51.61,
            "height": 4.7,
            "rotate": 0,
            "alignment": "right",
            "verticalAlignment": "top",
            "fontSize": 12,
            "lineHeight": 1,
            "characterSpacing": 0,
            "fontColor": "#000000",
            "backgroundColor": "",
            "opacity": 1,
            "strikethrough": false,
            "underline": false,
            "fontName": "Roboto"
          },
          "iRate": {
            "type": "text",
            "icon": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-text-cursor-input\"><path d=\"M5 4h1a3 3 0 0 1 3 3 3 3 0 0 1 3-3h1\"/><path d=\"M13 20h-1a3 3 0 0 1-3-3 3 3 0 0 1-3 3H5\"/><path d=\"M5 16H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1\"/><path d=\"M13 8h7a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-7\"/><path d=\"M9 7v10\"/></svg>",
            "content": "10.99%",
            "position": {
              "x": 113.22,
              "y": 169.59
            },
            "width": 51.61,
            "height": 4.7,
            "rotate": 0,
            "alignment": "right",
            "verticalAlignment": "top",
            "fontSize": 12,
            "lineHeight": 1,
            "characterSpacing": 0,
            "fontColor": "#000000",
            "backgroundColor": "",
            "opacity": 1,
            "strikethrough": false,
            "underline": false,
            "fontName": "Roboto"
          },
          "deposit": {
            "type": "text",
            "icon": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-text-cursor-input\"><path d=\"M5 4h1a3 3 0 0 1 3 3 3 3 0 0 1 3-3h1\"/><path d=\"M13 20h-1a3 3 0 0 1-3-3 3 3 0 0 1-3 3H5\"/><path d=\"M5 16H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1\"/><path d=\"M13 8h7a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-7\"/><path d=\"M9 7v10\"/></svg>",
            "content": "$500",
            "position": {
              "x": 113.32,
              "y": 176.26
            },
            "width": 51.61,
            "height": 4.7,
            "rotate": 0,
            "alignment": "right",
            "verticalAlignment": "top",
            "fontSize": 12,
            "lineHeight": 1,
            "characterSpacing": 0,
            "fontColor": "#000000",
            "backgroundColor": "",
            "opacity": 1,
            "strikethrough": false,
            "underline": false,
            "fontName": "Roboto"
          },
          "tradeValue": {
            "type": "text",
            "icon": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-text-cursor-input\"><path d=\"M5 4h1a3 3 0 0 1 3 3 3 3 0 0 1 3-3h1\"/><path d=\"M13 20h-1a3 3 0 0 1-3-3 3 3 0 0 1-3 3H5\"/><path d=\"M5 16H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1\"/><path d=\"M13 8h7a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-7\"/><path d=\"M9 7v10\"/></svg>",
            "content": "$5000",
            "position": {
              "x": 113.16,
              "y": 182.33
            },
            "width": 51.61,
            "height": 4.7,
            "rotate": 0,
            "alignment": "right",
            "verticalAlignment": "top",
            "fontSize": 12,
            "lineHeight": 1,
            "characterSpacing": 0,
            "fontColor": "#000000",
            "backgroundColor": "",
            "opacity": 1,
            "strikethrough": false,
            "underline": false,
            "fontName": "Roboto"
          },
          "lien": {
            "type": "text",
            "icon": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-text-cursor-input\"><path d=\"M5 4h1a3 3 0 0 1 3 3 3 3 0 0 1 3-3h1\"/><path d=\"M13 20h-1a3 3 0 0 1-3-3 3 3 0 0 1-3 3H5\"/><path d=\"M5 16H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1\"/><path d=\"M13 8h7a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-7\"/><path d=\"M9 7v10\"/></svg>",
            "content": "$2500\n\n",
            "position": {
              "x": 113.26,
              "y": 188.01
            },
            "width": 51.61,
            "height": 4.7,
            "rotate": 0,
            "alignment": "right",
            "verticalAlignment": "top",
            "fontSize": 12,
            "lineHeight": 1,
            "characterSpacing": 0,
            "fontColor": "#000000",
            "backgroundColor": "",
            "opacity": 1,
            "strikethrough": false,
            "underline": false,
            "fontName": "Roboto"
          },
          "total": {
            "type": "text",
            "icon": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-text-cursor-input\"><path d=\"M5 4h1a3 3 0 0 1 3 3 3 3 0 0 1 3-3h1\"/><path d=\"M13 20h-1a3 3 0 0 1-3-3 3 3 0 0 1-3 3H5\"/><path d=\"M5 16H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1\"/><path d=\"M13 8h7a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-7\"/><path d=\"M9 7v10\"/></svg>",
            "content": "$15000",
            "position": {
              "x": 113.26,
              "y": 208.62
            },
            "width": 51.61,
            "height": 4.7,
            "rotate": 0,
            "alignment": "right",
            "verticalAlignment": "top",
            "fontSize": 12,
            "lineHeight": 1,
            "characterSpacing": 0,
            "fontColor": "#000000",
            "backgroundColor": "",
            "opacity": 1,
            "strikethrough": false,
            "underline": false,
            "fontName": "Roboto"
          },
          "onTax": {
            "type": "text",
            "icon": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-text-cursor-input\"><path d=\"M5 4h1a3 3 0 0 1 3 3 3 3 0 0 1 3-3h1\"/><path d=\"M13 20h-1a3 3 0 0 1-3-3 3 3 0 0 1-3 3H5\"/><path d=\"M5 16H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1\"/><path d=\"M13 8h7a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-7\"/><path d=\"M9 7v10\"/></svg>",
            "content": "$16500",
            "position": {
              "x": 113.36,
              "y": 214.5
            },
            "width": 51.61,
            "height": 4.7,
            "rotate": 0,
            "alignment": "right",
            "verticalAlignment": "top",
            "fontSize": 12,
            "lineHeight": 1,
            "characterSpacing": 0,
            "fontColor": "#000000",
            "backgroundColor": "",
            "opacity": 1,
            "strikethrough": false,
            "underline": false,
            "fontName": "Roboto"
          },
          "firstName": {
            "type": "text",
            "icon": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-text-cursor-input\"><path d=\"M5 4h1a3 3 0 0 1 3 3 3 3 0 0 1 3-3h1\"/><path d=\"M13 20h-1a3 3 0 0 1-3-3 3 3 0 0 1-3 3H5\"/><path d=\"M5 16H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1\"/><path d=\"M13 8h7a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-7\"/><path d=\"M9 7v10\"/></svg>",
            "content": "Skyler",
            "position": {
              "x": 50.78,
              "y": 235.51
            },
            "width": 51.61,
            "height": 4.7,
            "rotate": 0,
            "alignment": "left",
            "verticalAlignment": "top",
            "fontSize": 12,
            "lineHeight": 1,
            "characterSpacing": 0,
            "fontColor": "#000000",
            "backgroundColor": "",
            "opacity": 1,
            "strikethrough": false,
            "underline": false,
            "fontName": "Roboto"
          },
          "lastName": {
            "type": "text",
            "icon": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-text-cursor-input\"><path d=\"M5 4h1a3 3 0 0 1 3 3 3 3 0 0 1 3-3h1\"/><path d=\"M13 20h-1a3 3 0 0 1-3-3 3 3 0 0 1-3 3H5\"/><path d=\"M5 16H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1\"/><path d=\"M13 8h7a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-7\"/><path d=\"M9 7v10\"/></svg>",
            "content": "Zanth",
            "position": {
              "x": 50.72,
              "y": 241.77
            },
            "width": 51.61,
            "height": 4.7,
            "rotate": 0,
            "alignment": "left",
            "verticalAlignment": "top",
            "fontSize": 12,
            "lineHeight": 1,
            "characterSpacing": 0,
            "fontColor": "#000000",
            "backgroundColor": "",
            "opacity": 1,
            "strikethrough": false,
            "underline": false,
            "fontName": "Roboto"
          },
          "phone": {
            "type": "text",
            "icon": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-text-cursor-input\"><path d=\"M5 4h1a3 3 0 0 1 3 3 3 3 0 0 1 3-3h1\"/><path d=\"M13 20h-1a3 3 0 0 1-3-3 3 3 0 0 1-3 3H5\"/><path d=\"M5 16H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1\"/><path d=\"M13 8h7a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-7\"/><path d=\"M9 7v10\"/></svg>",
            "content": "613-613-6134",
            "position": {
              "x": 50.82,
              "y": 248.44
            },
            "width": 51.61,
            "height": 4.7,
            "rotate": 0,
            "alignment": "left",
            "verticalAlignment": "top",
            "fontSize": 12,
            "lineHeight": 1,
            "characterSpacing": 0,
            "fontColor": "#000000",
            "backgroundColor": "",
            "opacity": 1,
            "strikethrough": false,
            "underline": false,
            "fontName": "Roboto"
          },
          "email": {
            "type": "text",
            "icon": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-text-cursor-input\"><path d=\"M5 4h1a3 3 0 0 1 3 3 3 3 0 0 1 3-3h1\"/><path d=\"M13 20h-1a3 3 0 0 1-3-3 3 3 0 0 1-3 3H5\"/><path d=\"M5 16H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1\"/><path d=\"M13 8h7a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-7\"/><path d=\"M9 7v10\"/></svg>",
            "content": "skylerzanth@email.com",
            "position": {
              "x": 50.66,
              "y": 254.51
            },
            "width": 51.61,
            "height": 4.7,
            "rotate": 0,
            "alignment": "left",
            "verticalAlignment": "top",
            "fontSize": 12,
            "lineHeight": 1,
            "characterSpacing": 0,
            "fontColor": "#000000",
            "backgroundColor": "",
            "opacity": 1,
            "strikethrough": false,
            "underline": false,
            "fontName": "Roboto"
          },
          "address": {
            "type": "text",
            "icon": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-text-cursor-input\"><path d=\"M5 4h1a3 3 0 0 1 3 3 3 3 0 0 1 3-3h1\"/><path d=\"M13 20h-1a3 3 0 0 1-3-3 3 3 0 0 1-3 3H5\"/><path d=\"M5 16H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1\"/><path d=\"M13 8h7a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-7\"/><path d=\"M9 7v10\"/></svg>",
            "content": "1234 Sales St",
            "position": {
              "x": 50.76,
              "y": 260.19
            },
            "width": 51.61,
            "height": 4.7,
            "rotate": 0,
            "alignment": "left",
            "verticalAlignment": "top",
            "fontSize": 12,
            "lineHeight": 1,
            "characterSpacing": 0,
            "fontColor": "#000000",
            "backgroundColor": "",
            "opacity": 1,
            "strikethrough": false,
            "underline": false,
            "fontName": "Roboto"
          }
        }
      ],
      "basePdf": "data:application/pdf;base64,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PItk/4T22vzJk/0VZkL2V+gZbv4pPdb2Kvhs2Fc/7SD03VrXCtR81AP4+r2B3/6cxgmr6PsG+KG4VwplbmRzdHJlYW0KZW5kb2JqCgoyMTQgMCBvYmoKPDwvVHlwZS9Gb250L1N1YnR5cGUvVHlwZTMvTmFtZS9CYWhuc2NocmlmdAovRm9udEJCb3hbLTEwNTYgLTI3MCAxMTA3IDExMTJdCi9Gb250TWF0cml4WzAuMDAwNDg4MjgxMjUgMCAwIDAuMDAwNDg4MjgxMjUgMCAwXQovQ2hhclByb2NzPDwKL2dpZDY2IDIxNSAwIFIKL2dpZDIwMCAyMTYgMCBSCi9naWQxNDkgMjE3IDAgUgovZ2lkMTU1IDIxOCAwIFIKL2dpZDE4OCAyMTkgMCBSCi9naWQxNCAyMjAgMCBSCi9naWQyMTYgMjIxIDAgUgovZ2lkMTMwIDIyMiAwIFIKL2dpZDE5NCAyMjMgMCBSCi9naWQxNiAyMjQgMCBSCi9naWQ4NiAyMjUgMCBSCi9naWQxNzUgMjI2IDAgUgovZ2lkMTQ0IDIyNyAwIFIKL2dpZDkzIDIyOCAwIFIKL2dpZDg5IDIyOSAwIFIKL2dpZDQwIDIzMCAwIFIKL2dpZDE2OSAyMzEgMCBSCi9naWQxNzMgMjMyIDAgUgovZ2lkMjI3IDIzMyAwIFIKL2dpZDIxIDIzNCAwIFIKL2dpZDQ4IDIzNSAwIFIKL2dpZDIgMjM2IDAgUgovZ2lkMTkzIDIzNyAwIFIKL2dpZDIyMCAyMzggMCBSCi9naWQ2MSAyMzkgMCBSCi9naWQxNDIgMjQwIDAgUgovZ2lkMjMxIDI0MSAwIFIKL2dpZDEgMjQyIDAgUgovZ2lkMTAwIDI0MyAwIFIKL2dpZDExNiAyNDQgMCBSCi9naWQyMTMgMjQ1IDAgUgovZ2lkMjQ1IDI0NiAwIFIKL2dpZDE2OCAyNDcgMCBSCj4+Ci9FbmNvZGluZzw8L1R5cGUvRW5jb2RpbmcvRGlmZmVyZW5jZXNbMSAvZ2lkNjYgL2dpZDIwMCAvZ2lkMTQ5IC9naWQxNTUgL2dpZDE4OCAvZ2lkMTQgL2dpZDIxNiAvZ2lkMTMwIC9naWQxOTQgL2dpZDE2IC9naWQ4NiAvZ2lkMTc1IC9naWQxNDQgL2dpZDkzIC9naWQ4OSAvZ2lkNDAgL2dpZDE2OSAvZ2lkMTczIC9naWQyMjcgL2dpZDIxIC9naWQ0OCAvZ2lkMiAvZ2lkMTkzIC9naWQyMjAgL2dpZDYxIC9naWQxNDIgL2dpZDIzMSAvZ2lkMSAvZ2lkMTAwIC9naWQxMTYgL2dpZDIxMyAvZ2lkMjQ1IC9naWQxNjhdPj4KL0ZpcnN0Q2hhciAwCi9MYXN0Q2hhciAzNAovV2lkdGhzWzAgMTU5NiAxMTE2IDExMDQgMTA5OCA1OTMgMTMyMiA4NzQgMTA5MCAxMTQ0IDEyNjcgMTI3NSA1MTQgMTAyMCAxMjYxIDEzMzUgMTE0NSAxMTA0IDExNDQgNjY4IDEzNDQgNTY0IDEzMjYgMTc1NCAxMDYyIDExNzQgMTExNCAxMTM5IDU1MCA5ODYgMTIwMiAxMTE0IDEwNTkgNjQ5IF0KL0ZvbnREZXNjcmlwdG9yIDIxMiAwIFIKL1Jlc291cmNlcyAyNDggMCBSCi9Ub1VuaWNvZGUgMjEzIDAgUgo+PgplbmRvYmoKCjIxNSAwIG9iago8PC9MZW5ndGggMjcyPj4Kc3RyZWFtCjE1OTYgMCBkMApxIDEwIDAgMCAxMCAwIC03OTIwIGNtCjEyNi41IDkzNy4zOTkgbQoxNDEuNTk5IDkzNy4zOTkgbCAxNDEuNTk5IDc5MiBsIDEyNy4yIDc5MiBsIDEyNy4yIDkxNi44OTkgbAoxMjguNjk5IDkxMC41IGwgODQuOSA4MTIuMiBsIDc0LjcgODEyLjIgbCAzMC44OTkgOTA4LjUgbCAzMi4zOTkgOTE2Ljg5OSBsCjMyLjM5OSA3OTIgbCAxOCA3OTIgbCAxOCA5MzcuMzk5IGwgMzMuMSA5MzcuMzk5IGwgNzkuNzk5IDgzMi4zOTkgbAoxMjYuNSA5MzcuMzk5IGwgaApmClEKZW5kc3RyZWFtCmVuZG9iagoKMjE2IDAgb2JqCjw8L0xlbmd0aCA5ODk+PgpzdHJlYW0KMTExNiAwIGQwCnEgMTAgMCAwIDEwIDAgLTc5MjAgY20KMzIuNyA3OTUuNzk5IG0KMjYuMyA3OTkuMzMzIDIxLjQxNiA4MDQuNDgzIDE4LjA1IDgxMS4yNSBjIDE0LjY4MyA4MTguMDE2IDEzIDgyNi4xNjYgMTMgODM1LjcgYwoxMyA4NTIuNiBsIDEzIDg2MiAxNC42ODMgODcwLjA0OSAxOC4wNSA4NzYuNzUgYyAyMS40MTYgODgzLjQ1IDI2LjMgODg4LjU0OSAzMi43IDg5Mi4wNDkgYwozOS4xIDg5NS41NDkgNDYuNzk5IDg5Ny4yOTkgNTUuNzk5IDg5Ny4yOTkgYyA2NC43OTkgODk3LjI5OSA3Mi41IDg5NS41NDkgNzguOSA4OTIuMDQ5IGMKODUuMjk5IDg4OC41NDkgOTAuMTgzIDg4My40NSA5My41NDkgODc2Ljc1IGMgOTYuOTE2IDg3MC4wNDkgOTguNTk5IDg2MiA5OC41OTkgODUyLjYgYwo5OC41OTkgODM1LjM5OSBsIDk4LjU5OSA4MjUuOTMzIDk2LjkxNiA4MTcuODUgOTMuNTQ5IDgxMS4xNDkgYyA5MC4xODMgODA0LjQ1IDg1LjI5OSA3OTkuMzMzIDc4LjkgNzk1Ljc5OSBjCjcyLjUgNzkyLjI2NiA2NC43OTkgNzkwLjUgNTUuNzk5IDc5MC41IGMgNDYuNzk5IDc5MC41IDM5LjEgNzkyLjI2NiAzMi43IDc5NS43OTkgYwpoCjc2Ljc1IDgxMi4xNDkgbQo4MS43MTYgODE3LjY0OSA4NC4yIDgyNS4zOTkgODQuMiA4MzUuMzk5IGMgODQuMiA4NTIuNiBsCjg0LjIgODYyLjUzMyA4MS43MTYgODcwLjIzMyA3Ni43NSA4NzUuNyBjIDcxLjc4MyA4ODEuMTY2IDY0Ljc2NiA4ODMuODk5IDU1LjcgODgzLjg5OSBjCjQ2LjcgODgzLjg5OSAzOS43MzMgODgxLjE2NiAzNC43OTkgODc1LjcgYyAyOS44NjYgODcwLjIzMyAyNy4zOTkgODYyLjUzMyAyNy4zOTkgODUyLjYgYwoyNy4zOTkgODM1LjM5OSBsIDI3LjM5OSA4MjUuMzk5IDI5Ljg2NiA4MTcuNjQ5IDM0Ljc5OSA4MTIuMTQ5IGMgMzkuNzMzIDgwNi42NDkgNDYuNyA4MDMuODk5IDU1LjcgODAzLjg5OSBjCjY0Ljc2NiA4MDMuODk5IDcxLjc4MyA4MDYuNjQ5IDc2Ljc1IDgxMi4xNDkgYyBoCmYKUQplbmRzdHJlYW0KZW5kb2JqCgoyMTcgMCBvYmoKPDwvTGVuZ3RoIDEwMjM+PgpzdHJlYW0KMTEwNCAwIGQwCnEgMTAgMCAwIDEwIDAgLTc5MjAgY20KODEgOTM3LjM5OSBtCjk1LjQgOTM3LjM5OSBsIDk1LjQgNzkyIGwgODEgNzkyIGwgODEgOTM3LjM5OSBsIGgKMjkuNSA3OTUuNDUgbQoyNC4xIDc5OC43NSAyMCA4MDMuNTMzIDE3LjE5OSA4MDkuNzk5IGMgMTQuNCA4MTYuMDY2IDEzIDgyMy42IDEzIDgzMi4zOTkgYwoxMyA4NTUgbCAxMyA4NjMuOTMzIDE0LjM2NiA4NzEuNTY2IDE3LjEgODc3Ljg5OSBjIDE5LjgzMyA4ODQuMjMzIDIzLjgxNiA4ODkuMDQ5IDI5LjA1IDg5Mi4zNSBjCjM0LjI4MyA4OTUuNjQ5IDQwLjU2NiA4OTcuMjk5IDQ3Ljg5OSA4OTcuMjk5IGMgNTUuODMzIDg5Ny4yOTkgNjIuNzgzIDg5NS44MTYgNjguNzUgODkyLjg1IGMKNzQuNzE2IDg4OS44ODMgNzkuNSA4ODUuMDMzIDgzLjA5OSA4NzguMjk5IGMgODEgODU4LjI5OSBsIDgxIDg2Mi44MzMgNzkuOTUgODY3LjEzMyA3Ny44NDkgODcxLjIgYwo3NS43NSA4NzUuMjY2IDcyLjcgODc4LjU2NiA2OC43IDg4MS4xIGMgNjQuNyA4ODMuNjMzIDYwIDg4NC44OTkgNTQuNiA4ODQuODk5IGMKNDUuOTMzIDg4NC44OTkgMzkuMjMzIDg4Mi4yODMgMzQuNSA4NzcuMDQ5IGMgMjkuNzY2IDg3MS44MTYgMjcuMzk5IDg2NC40MzMgMjcuMzk5IDg1NC44OTkgYwoyNy4zOTkgODMyLjM5OSBsIDI3LjM5OSA4MjMuMDY2IDI5Ljc2NiA4MTUuODE2IDM0LjUgODEwLjY0OSBjIDM5LjIzMyA4MDUuNDgzIDQ1LjkzMyA4MDIuODk5IDU0LjYgODAyLjg5OSBjCjU5LjkzMyA4MDIuODk5IDY0LjU5OSA4MDQuMiA2OC41OTkgODA2Ljc5OSBjIDcyLjU5OSA4MDkuMzk5IDc1LjY2NiA4MTIuNzgzIDc3Ljc5OSA4MTYuOTUgYwo3OS45MzMgODIxLjExNiA4MSA4MjUuNDY2IDgxIDgzMCBjIDgyLjQgODA4LjI5OSBsIDc5Ljc5OSA4MDEuOTY2IDc1LjY2NiA3OTcuNDE2IDcwIDc5NC42NDkgYwo2NC4zMzMgNzkxLjg4MyA1Ny4yOTkgNzkwLjUgNDguODk5IDc5MC41IGMgNDEuMzY2IDc5MC41IDM0Ljg5OSA3OTIuMTQ5IDI5LjUgNzk1LjQ1IGMKaApmClEKZW5kc3RyZWFtCmVuZG9iagoKMjE4IDAgb2JqCjw8L0xlbmd0aCAxMDA1Pj4Kc3RyZWFtCjEwOTggMCBkMApxIDEwIDAgMCAxMCAwIC03OTIwIGNtCjMzLjg5OSA3OTUuOTUgbQoyNy4xIDc5OS41ODMgMjEuOTE2IDgwNC44ODMgMTguMzUgODExLjg1IGMgMTQuNzgzIDgxOC44MTYgMTMgODI3LjIgMTMgODM3IGMKMTMgODQ4LjcgbCAxMyA4NTguOTY2IDE0LjcxNiA4NjcuNzMzIDE4LjE0OSA4NzUgYyAyMS41ODMgODgyLjI2NiAyNi41NjYgODg3Ljc5OSAzMy4xIDg5MS42IGMKMzkuNjMzIDg5NS4zOTkgNDcuNSA4OTcuMjk5IDU2LjcgODk3LjI5OSBjIDY1LjM2NiA4OTcuMjk5IDcyLjc2NiA4OTUuNDMzIDc4LjkgODkxLjcgYwo4NS4wMzMgODg3Ljk2NiA4OS43MTYgODgyLjUxNiA5Mi45NSA4NzUuMzUgYyA5Ni4xODMgODY4LjE4MyA5Ny43OTkgODU5LjU2NiA5Ny43OTkgODQ5LjUgYwo5Ny43OTkgODM3LjYgbCAyMi44IDgzNy42IGwgMjIuOCA4NTAuNiBsIDg0LjQgODUwLjYgbCA4NC40IDg1MS42IGwKODQuNCA4NjEuODY2IDgxLjk4MyA4NjkuODE2IDc3LjE1IDg3NS40NSBjIDcyLjMxNiA4ODEuMDgzIDY1LjUgODgzLjg5OSA1Ni43IDg4My44OTkgYwo0Ny4wMzMgODgzLjg5OSAzOS41NjYgODgwLjkzMyAzNC4yOTkgODc1IGMgMjkuMDMzIDg2OS4wNjYgMjYuMzk5IDg2MC42NjYgMjYuMzk5IDg0OS43OTkgYwoyNi4zOTkgODM2LjYgbCAyNi4zOTkgODI2LjIgMjkuMTk5IDgxOC4xNDkgMzQuNzk5IDgxMi40NSBjIDQwLjM5OSA4MDYuNzUgNDguMjk5IDgwMy44OTkgNTguNSA4MDMuODk5IGMKNjMuMjk5IDgwMy44OTkgNjguMDQ5IDgwNC44OTkgNzIuNzUgODA2Ljg5OSBjIDc3LjQ1IDgwOC44OTkgODEuNjMzIDgxMS43MzMgODUuMjk5IDgxNS4zOTkgYwo4NS4yOTkgODE1LjM5OSBsIDk1LjA5OSA4MDYgbCA5NS4wOTkgODA2IGwgOTAuMDMzIDgwMS4wNjYgODQuMjk5IDc5Ny4yNSA3Ny45IDc5NC41NDkgYwo3MS41IDc5MS44NSA2NS4wMzMgNzkwLjUgNTguNSA3OTAuNSBjIDQ4Ljg5OSA3OTAuNSA0MC43IDc5Mi4zMTYgMzMuODk5IDc5NS45NSBjCmgKZgpRCmVuZHN0cmVhbQplbmRvYmoKCjIxOSAwIG9iago8PC9MZW5ndGggMzEwPj4Kc3RyZWFtCjU5MyAwIGQwCnEgMTAgMCAwIDEwIDAgLTc5MjAgY20KMzAuMzk5IDgxOS4yOTkgbQozMC4zOTkgODE0Ljg5OSAzMS40ODMgODExLjQ4MyAzMy42NDkgODA5LjA0OSBjIDM1LjgxNiA4MDYuNjE2IDM4LjgzMyA4MDUuMzk5IDQyLjcgODA1LjM5OSBjCjUyLjI5OSA4MDUuMzk5IGwgNTIuMjk5IDc5MiBsIDQwLjI5OSA3OTIgbCAzMi41NjYgNzkyIDI2LjU4MyA3OTQuMzk5IDIyLjM1IDc5OS4yIGMKMTguMTE2IDgwNCAxNiA4MTAuNzY2IDE2IDgxOS41IGMgMTYgOTM3LjM5OSBsIDMwLjM5OSA5MzcuMzk5IGwgMzAuMzk5IDgxOS4yOTkgbApoCmYKUQplbmRzdHJlYW0KZW5kb2JqCgoyMjAgMCBvYmoKPDwvTGVuZ3RoIDEyNDQ+PgpzdHJlYW0KMTMyMiAwIGQwCnEgMTAgMCAwIDEwIDAgLTc5MjAgY20KMzAgODA1LjM5OSBtCjY5LjkgODA1LjM5OSBsIDgyLjIzMyA4MDUuMzk5IDkxLjIxNiA4MDcuNzE2IDk2Ljg0OSA4MTIuMzUgYwoxMDIuNDgzIDgxNi45ODMgMTA1LjI5OSA4MjMuNSAxMDUuMjk5IDgzMS44OTkgYyAxMDUuMjk5IDgzMi4yIGwgMTA1LjI5OSA4MzcuOTMzIDEwNC4yNSA4NDIuODY2IDEwMi4xNSA4NDcgYwoxMDAuMDQ5IDg1MS4xMzMgOTYuNzUgODU0LjMxNiA5Mi4yNSA4NTYuNTQ5IGMgODcuNzUgODU4Ljc4MyA4MS45NjYgODU5Ljg5OSA3NC45IDg1OS44OTkgYwozMCA4NTkuODk5IGwgMzAgODczLjI5OSBsIDc0LjkgODczLjI5OSBsIDg0LjM2NiA4NzMuMjk5IDkxLjQ4MyA4NzUuMzk5IDk2LjI1IDg3OS42IGMKMTAxLjAxNiA4ODMuNzk5IDEwMy40IDg5MC4wMzMgMTAzLjQgODk4LjI5OSBjIDEwMy40IDg5OC4yOTkgbCAxMDMuNCA5MDYuODk5IDEwMC43OTkgOTEzLjMzMyA5NS41OTkgOTE3LjYgYwo5MC40IDkyMS44NjYgODIuNTY2IDkyNCA3Mi4wOTkgOTI0IGMgMzAgOTI0IGwgMzAgOTM3LjM5OSBsIDc1LjI5OSA5MzcuMzk5IGwKODQuNyA5MzcuMzk5IDkyLjU2NiA5MzUuNzk5IDk4LjkgOTMyLjYgYyAxMDUuMjMzIDkyOS4zOTkgMTA5Ljk2NiA5MjQuODY2IDExMy4wOTkgOTE5IGMKMTE2LjIzMyA5MTMuMTMzIDExNy43OTkgOTA2LjEzMyAxMTcuNzk5IDg5OCBjIDExNy43OTkgODk4IGwgMTE3Ljc5OSA4OTMuMDY2IDExNi44MzMgODg4LjQxNiAxMTQuOSA4ODQuMDQ5IGMKMTEyLjk2NiA4NzkuNjgzIDExMC4wMTYgODc1LjkzMyAxMDYuMDQ5IDg3Mi43OTkgYyAxMDIuMDgzIDg2OS42NjYgOTcuMTY2IDg2Ny41NjYgOTEuMjk5IDg2Ni41IGMKOTcuMTY2IDg2NS42MzMgMTAyLjIzMyA4NjMuNTQ5IDEwNi41IDg2MC4yNSBjIDExMC43NjYgODU2Ljk1IDExNC4wMzMgODUyLjgzMyAxMTYuMjk5IDg0Ny44OTkgYwoxMTguNTY2IDg0Mi45NjYgMTE5LjcgODM3LjYzMyAxMTkuNyA4MzEuODk5IGMgMTE5LjcgODMxLjYgbCAxMTkuNyA4MjMuNzMzIDExNy45NjYgODE2Ljc5OSAxMTQuNSA4MTAuNzk5IGMKMTExLjAzMyA4MDQuNzk5IDEwNi4wNjYgODAwLjE2NiA5OS41OTkgNzk2Ljg5OSBjIDkzLjEzMyA3OTMuNjMzIDg1LjU5OSA3OTIgNzcgNzkyIGMKMzAgNzkyIGwgMzAgODA1LjM5OSBsIGgKMTggOTM3LjM5OSBtCjMyLjM5OSA5MzcuMzk5IGwgMzIuMzk5IDc5MiBsIDE4IDc5MiBsIDE4IDkzNy4zOTkgbCBoCmYKUQplbmRzdHJlYW0KZW5kb2JqCgoyMjEgMCBvYmoKPDwvTGVuZ3RoIDUwNz4+CnN0cmVhbQo4NzQgMCBkMApxIDEwIDAgMCAxMCAwIC03OTIwIGNtCjE2IDg5NS43OTkgbQozMC4zOTkgODk1Ljc5OSBsIDMwLjM5OSA3OTIgbCAxNiA3OTIgbCAxNiA4OTUuNzk5IGwgaAo2OS4wNDkgODgyLjIgbQo2NS44MTYgODgzLjMzMyA2Mi4wNjYgODgzLjg5OSA1Ny43OTkgODgzLjg5OSBjIDQ5LjEzMyA4ODMuODk5IDQyLjM5OSA4ODEuNTgzIDM3LjYgODc2Ljk1IGMKMzIuNzk5IDg3Mi4zMTYgMzAuMzk5IDg2NS44OTkgMzAuMzk5IDg1Ny43IGMgMjguMyA4NzcuNyBsIDMyLjEgODgzLjg5OSAzNy4wODMgODg4LjcxNiA0My4yNSA4OTIuMTQ5IGMKNDkuNDE2IDg5NS41ODMgNTYuMTY2IDg5Ny4yOTkgNjMuNSA4OTcuMjk5IGMgNjguMjMzIDg5Ny4yOTkgNzIuNTE2IDg5Ni42MTYgNzYuMzQ5IDg5NS4yNSBjCjgwLjE4MyA4OTMuODgzIDgzLjUzMyA4OTEuODY2IDg2LjQgODg5LjIgYyA3Ny4wOTkgODc3LjIgbCA3NC45NjYgODc5LjM5OSA3Mi4yODMgODgxLjA2NiA2OS4wNDkgODgyLjIgYwpoCmYKUQplbmRzdHJlYW0KZW5kb2JqCgoyMjIgMCBvYmoKPDwvTGVuZ3RoIDExMDU+PgpzdHJlYW0KMTA5MCAwIGQwCnEgMTAgMCAwIDEwIDAgLTc5MjAgY20KNzkuNTk5IDg1Ny43OTkgbQo3OS41OTkgODY2LjIgNzcuMzQ5IDg3Mi43MTYgNzIuODQ5IDg3Ny4zNSBjIDY4LjM0OSA4ODEuOTgzIDYxLjk2NiA4ODQuMjk5IDUzLjcgODg0LjI5OSBjCjQ4Ljc2NiA4ODQuMjk5IDQzLjkzMyA4ODMuNSAzOS4yIDg4MS44OTkgYyAzNC40NjYgODgwLjI5OSAzMC4yNjYgODc4LjAzMyAyNi42IDg3NS4xIGMKMTYuMSA4ODIuMjk5IGwgMjAuMDMzIDg4Ny4wMzMgMjUuMjE2IDg5MC43MTYgMzEuNjQ5IDg5My4zNSBjIDM4LjA4MyA4OTUuOTgzIDQ1LjIzMyA4OTcuMjk5IDUzLjEgODk3LjI5OSBjCjYxLjcgODk3LjI5OSA2OS4wNjYgODk1Ljc4MyA3NS4yIDg5Mi43NSBjIDgxLjMzMyA4ODkuNzE2IDg2IDg4NS4zMTYgODkuMiA4NzkuNTQ5IGMKOTIuNCA4NzMuNzgzIDk0IDg2Ni44MzMgOTQgODU4LjcgYyA5NCA3OTIgbCA3OS41OTkgNzkyIGwgNzkuNTk5IDg1Ny43OTkgbApoCjIxIDc5OC44OTkgbQoxNC4zMzMgODA0LjUgMTEgODEyLjM5OSAxMSA4MjIuNiBjIDExIDgzMi4zOTkgMTQuMDUgODM5Ljk4MyAyMC4xNDkgODQ1LjM1IGMKMjYuMjUgODUwLjcxNiAzNC44NjYgODUzLjM5OSA0NiA4NTMuMzk5IGMgODAuNSA4NTMuMzk5IGwgODEuOSA4NDAgbAo0Ni4xIDg0MCBsIDM5LjQzMyA4NDAgMzQuMjgzIDgzOC40ODMgMzAuNjQ5IDgzNS40NSBjIDI3LjAxNiA4MzIuNDE2IDI1LjE5OSA4MjguMTMzIDI1LjE5OSA4MjIuNiBjCjI1LjE5OSA4MTYuNzMzIDI3LjQ4MyA4MTIuMTgzIDMyLjA0OSA4MDguOTUgYyAzNi42MTYgODA1LjcxNiA0My4wNjYgODA0LjEgNTEuMzk5IDgwNC4xIGMKNjAuMzMzIDgwNC4xIDY3LjI2NiA4MDUgNzIuMiA4MDYuNzk5IGMgNzcuMTMzIDgwOC42IDc5LjU5OSA4MTEuMTMzIDc5LjU5OSA4MTQuMzk5IGMKODEuNyA4MDAuNzk5IGwgNzkuNjMzIDc5OC42NjYgNzYuOTgzIDc5Ni44MTYgNzMuNzUgNzk1LjI1IGMgNzAuNTE2IDc5My42ODMgNjYuODE2IDc5Mi41IDYyLjY0OSA3OTEuNyBjCjU4LjQ4MyA3OTAuODk5IDU0IDc5MC41IDQ5LjIgNzkwLjUgYyAzNy4wNjYgNzkwLjUgMjcuNjY2IDc5My4yOTkgMjEgNzk4Ljg5OSBjCmgKZgpRCmVuZHN0cmVhbQplbmRvYmoKCjIyMyAwIG9iago8PC9MZW5ndGggNTA3Pj4Kc3RyZWFtCjExNDQgMCBkMApxIDEwIDAgMCAxMCAwIC03OTIwIGNtCjE2IDg5NS43OTkgbQozMC4zOTkgODk1Ljc5OSBsIDMwLjM5OSA3OTIgbCAxNiA3OTIgbCAxNiA4OTUuNzk5IGwgaAo4NSA4NTQuODk5IG0KODUgODY0LjEgODIuNTgzIDg3MS4yMzMgNzcuNzUgODc2LjI5OSBjIDcyLjkxNiA4ODEuMzY2IDY2LjA5OSA4ODMuODk5IDU3LjI5OSA4ODMuODk5IGMKNDguNzY2IDg4My44OTkgNDIuMTQ5IDg4MS42NDkgMzcuNDUgODc3LjE0OSBjIDMyLjc1IDg3Mi42NDkgMzAuMzk5IDg2Ni4yNjYgMzAuMzk5IDg1OCBjCjI4LjMgODc4IGwgMzEuOTY2IDg4NC43OTkgMzYuODMzIDg4OS43MTYgNDIuODk5IDg5Mi43NSBjIDQ4Ljk2NiA4OTUuNzgzIDU2IDg5Ny4yOTkgNjQgODk3LjI5OSBjCjc1LjI2NiA4OTcuMjk5IDgzLjk4MyA4OTMuNjE2IDkwLjE1IDg4Ni4yNSBjIDk2LjMxNiA4NzguODgzIDk5LjQgODY4LjQ2NiA5OS40IDg1NSBjCjk5LjQgNzkyIGwgODUgNzkyIGwgODUgODU0Ljg5OSBsIGgKZgpRCmVuZHN0cmVhbQplbmRvYmoKCjIyNCAwIG9iago8PC9MZW5ndGggMTE4OT4+CnN0cmVhbQoxMjY3IDAgZDAKcSAxMCAwIDAgMTAgMCAtNzkyMCBjbQozOS4wNDkgNzk3LjIgbQozMS40MTYgODAxLjY2NiAyNS41IDgwOCAyMS4zIDgxNi4yIGMgMTcuMSA4MjQuMzk5IDE1IDgzMy44OTkgMTUgODQ0LjcgYwoxNSA4ODQuNiBsIDE1IDg5NS4zOTkgMTcuMSA5MDQuODk5IDIxLjMgOTEzLjEgYyAyNS41IDkyMS4yOTkgMzEuNDE2IDkyNy42NDkgMzkuMDQ5IDkzMi4xNDkgYwo0Ni42ODMgOTM2LjY0OSA1NS41MzMgOTM4Ljg5OSA2NS41OTkgOTM4Ljg5OSBjIDczLjkzMyA5MzguODk5IDgxLjU5OSA5MzcuMiA4OC41OTkgOTMzLjc5OSBjCjk1LjU5OSA5MzAuMzk5IDEwMS40NSA5MjUuNTgzIDEwNi4xNSA5MTkuMzUgYyAxMTAuODQ5IDkxMy4xMTYgMTE0LjAzMyA5MDUuODk5IDExNS43IDg5Ny43IGMKMTE1LjcgODk3LjcgbCAxMDEuMjk5IDg5Ny43IGwgMTAxLjI5OSA4OTcuNyBsIDk5LjcgOTAzLjE2NiA5Ny4wODMgOTA4IDkzLjQ1IDkxMi4yIGMKODkuODE2IDkxNi4zOTkgODUuNTY2IDkxOS42NjYgODAuNyA5MjIgYyA3NS44MzMgOTI0LjMzMyA3MC43OTkgOTI1LjUgNjUuNTk5IDkyNS41IGMKNTguMzk5IDkyNS41IDUyLjA2NiA5MjMuNzk5IDQ2LjYgOTIwLjM5OSBjIDQxLjEzMyA5MTcgMzYuODk5IDkxMi4yMTYgMzMuODk5IDkwNi4wNDkgYwozMC44OTkgODk5Ljg4MyAyOS4zOTkgODkyLjczMyAyOS4zOTkgODg0LjYgYyAyOS4zOTkgODQ0LjcgbCAyOS4zOTkgODM2LjU2NiAzMC44OTkgODI5LjQxNiAzMy44OTkgODIzLjI1IGMKMzYuODk5IDgxNy4wODMgNDEuMTMzIDgxMi4zMTYgNDYuNiA4MDguOTUgYyA1Mi4wNjYgODA1LjU4MyA1OC4zOTkgODAzLjg5OSA2NS41OTkgODAzLjg5OSBjCjcwLjc5OSA4MDMuODk5IDc1LjgzMyA4MDUgODAuNyA4MDcuMiBjIDg1LjU2NiA4MDkuMzk5IDg5LjgxNiA4MTIuNiA5My40NSA4MTYuNzk5IGMKOTcuMDgzIDgyMSA5OS43IDgyNS45NjYgMTAxLjI5OSA4MzEuNyBjIDEwMS4yOTkgODMxLjcgbCAxMTUuNyA4MzEuNyBsCjExNS43IDgzMS43IGwgMTE0LjAzMyA4MjMuNSAxMTAuODMzIDgxNi4yODMgMTA2LjA5OSA4MTAuMDQ5IGMgMTAxLjM2NiA4MDMuODE2IDk1LjUgNzk5IDg4LjUgNzk1LjYgYwo4MS41IDc5Mi4yIDczLjg2NiA3OTAuNSA2NS41OTkgNzkwLjUgYyA1NS41MzMgNzkwLjUgNDYuNjgzIDc5Mi43MzMgMzkuMDQ5IDc5Ny4yIGMKaApmClEKZW5kc3RyZWFtCmVuZG9iagoKMjI1IDAgb2JqCjw8L0xlbmd0aCA3NTY+PgpzdHJlYW0KMTI3NSAwIGQwCnEgMTAgMCAwIDEwIDAgLTc5MjAgY20KMjguNSA4NjEuNzk5IG0KNzUgODYxLjc5OSBsIDgwLjY2NiA4NjEuNzk5IDg1LjY2NiA4NjMuMSA5MCA4NjUuNyBjCjk0LjMzMyA4NjguMjk5IDk3LjY4MyA4NzEuOTMzIDEwMC4wNDkgODc2LjYgYyAxMDIuNDE2IDg4MS4yNjYgMTAzLjU5OSA4ODYuNjY2IDEwMy41OTkgODkyLjc5OSBjCjEwMy41OTkgODkyLjc5OSBsIDEwMy41OTkgODk5IDEwMi40MTYgOTA0LjQ1IDEwMC4wNDkgOTA5LjE0OSBjIDk3LjY4MyA5MTMuODUgOTQuMzMzIDkxNy41IDkwIDkyMC4xIGMKODUuNjY2IDkyMi43IDgwLjY2NiA5MjQgNzUgOTI0IGMgMjguNSA5MjQgbCAyOC41IDkzNy4zOTkgbCA3NC4yOTkgOTM3LjM5OSBsCjgyLjk2NiA5MzcuMzk5IDkwLjU5OSA5MzUuNTQ5IDk3LjIgOTMxLjg1IGMgMTAzLjc5OSA5MjguMTQ5IDEwOC45MTYgOTIyLjkzMyAxMTIuNTQ5IDkxNi4yIGMKMTE2LjE4MyA5MDkuNDY2IDExOCA5MDEuNjY2IDExOCA4OTIuNzk5IGMgMTE4IDg5Mi43OTkgbCAxMTggODg0IDExNi4xODMgODc2LjI1IDExMi41NDkgODY5LjU0OSBjCjEwOC45MTYgODYyLjg1IDEwMy43OTkgODU3LjY0OSA5Ny4yIDg1My45NSBjIDkwLjU5OSA4NTAuMjUgODIuOTY2IDg0OC4zOTkgNzQuMjk5IDg0OC4zOTkgYwoyOC41IDg0OC4zOTkgbCAyOC41IDg2MS43OTkgbCBoCjE4IDkzNy4zOTkgbQozMi4zOTkgOTM3LjM5OSBsIDMyLjM5OSA3OTIgbCAxOCA3OTIgbCAxOCA5MzcuMzk5IGwgaApmClEKZW5kc3RyZWFtCmVuZG9iagoKMjI2IDAgb2JqCjw8L0xlbmd0aCAxNzA+PgpzdHJlYW0KNTE0IDAgZDAKcSAxMCAwIDAgMTAgMCAtNzkyMCBjbQoxOSA5MzcuMzk5IG0KMzMuMzk5IDkzNy4zOTkgbCAzMy4zOTkgOTIzIGwgMTkgOTIzIGwgMTkgOTM3LjM5OSBsIGgKMTkgODk1Ljc5OSBtCjMzLjM5OSA4OTUuNzk5IGwgMzMuMzk5IDc5MiBsIDE5IDc5MiBsIDE5IDg5NS43OTkgbCBoCmYKUQplbmRzdHJlYW0KZW5kb2JqCgoyMjcgMCBvYmoKPDwvTGVuZ3RoIDEwMjU+PgpzdHJlYW0KMTAyMCAwIGQwCnEgMTAgMCAwIDEwIDAgLTc5MjAgY20KMzIuODk5IDc5NS41IG0KMjYuMjMzIDc5OC44MzMgMjEuMjUgODAzLjgzMyAxNy45NDkgODEwLjUgYyAxNC42NSA4MTcuMTY2IDEzIDgyNS41MzMgMTMgODM1LjYgYwoxMyA4NTIuNyBsIDEzIDg2Mi42MzMgMTQuNjY2IDg3MC44OTkgMTggODc3LjUgYyAyMS4zMzMgODg0LjEgMjYuMzE2IDg4OS4wNDkgMzIuOTUgODkyLjM1IGMKMzkuNTgzIDg5NS42NDkgNDcuODk5IDg5Ny4yOTkgNTcuODk5IDg5Ny4yOTkgYyA2My41NjYgODk3LjI5OSA2OC43MzMgODk2LjY4MyA3My40IDg5NS40NSBjCjc4LjA2NiA4OTQuMjE2IDgyLjIzMyA4OTIuMzgzIDg1LjkgODg5Ljk1IGMgODkuNTY2IDg4Ny41MTYgOTIuNzY2IDg4NC40MzMgOTUuNSA4ODAuNyBjCjk1LjUgODgwLjcgbCA4NC43OTkgODcxLjIgbCA4NC43OTkgODcxLjIgbCA4MS4yNjYgODc1LjQ2NiA3Ny4yODMgODc4LjY0OSA3Mi44NDkgODgwLjc1IGMKNjguNDE2IDg4Mi44NSA2My41MzMgODgzLjg5OSA1OC4yIDg4My44OTkgYyA0Ny44NjYgODgzLjg5OSA0MC4xNDkgODgxLjMxNiAzNS4wNDkgODc2LjE0OSBjCjI5Ljk0OSA4NzAuOTgzIDI3LjM5OSA4NjMuMTY2IDI3LjM5OSA4NTIuNyBjIDI3LjM5OSA4MzUuNiBsIDI3LjM5OSA4MjUgMjkuOTY2IDgxNy4wNjYgMzUuMSA4MTEuNzk5IGMKNDAuMjMzIDgwNi41MzMgNDcuOTMzIDgwMy44OTkgNTguMiA4MDMuODk5IGMgNjMuODY2IDgwMy44OTkgNjkuMDE2IDgwNC44OTkgNzMuNjUgODA2Ljg5OSBjCjc4LjI4MyA4MDguODk5IDgyLjQ2NiA4MTEuOTMzIDg2LjIgODE2IGMgODYuMiA4MTYgbCA5NS41IDgwNi43OTkgbAo5NS41IDgwNi43OTkgbCA5Mi43NjYgODAzLjEzMyA4OS41NjYgODAwLjEgODUuOSA3OTcuNyBjIDgyLjIzMyA3OTUuMjk5IDc4LjA2NiA3OTMuNSA3My40IDc5Mi4yOTkgYwo2OC43MzMgNzkxLjEgNjMuNTY2IDc5MC41IDU3Ljg5OSA3OTAuNSBjIDQ3Ljg5OSA3OTAuNSAzOS41NjYgNzkyLjE2NiAzMi44OTkgNzk1LjUgYwpoCmYKUQplbmRzdHJlYW0KZW5kb2JqCgoyMjggMCBvYmoKPDwvTGVuZ3RoIDE4NTc+PgpzdHJlYW0KMTI2MSAwIGQwCnEgMTAgMCAwIDEwIDAgLTc5MjAgY20KNDEuNzk5IDc5Mi41IG0KMzUuNTMzIDc5My44MzMgMjkuNjgzIDc5NS44MzMgMjQuMjUgNzk4LjUgYyAxOC44MTYgODAxLjE2NiAxMy43MzMgODA0LjUgOSA4MDguNSBjCjkgODA4LjUgbCAxNy42OTkgODE5Ljg5OSBsIDE3LjY5OSA4MTkuODk5IGwgMjMuNzY2IDgxNC41NjYgMzAuNDY2IDgxMC41NjYgMzcuNzk5IDgwNy44OTkgYwo0NS4xMzMgODA1LjIzMyA1My4xIDgwMy44OTkgNjEuNyA4MDMuODk5IGMgNzQuMTY2IDgwMy44OTkgODMuODE2IDgwNi4zNjYgOTAuNjUgODExLjI5OSBjCjk3LjQ4MyA4MTYuMjMzIDEwMC45IDgyMy4xNjYgMTAwLjkgODMyLjEgYyAxMDAuOSA4MzIuMiBsIDEwMC45IDgzNy43MzMgOTkuNDE2IDg0Mi4xNjYgOTYuNDUgODQ1LjUgYwo5My40ODMgODQ4LjgzMyA4OS42NSA4NTEuMzMzIDg0Ljk1IDg1MyBjIDgwLjI1IDg1NC42NjYgNzQuMiA4NTYuMiA2Ni43OTkgODU3LjYgYwo2Ni41OTkgODU3LjY2NiA2Ni4zODMgODU3LjcxNiA2Ni4xNSA4NTcuNzUgYyA2NS45MTYgODU3Ljc4MyA2NS42NjYgODU3LjgzMyA2NS40IDg1Ny44OTkgYwo2Mi41IDg1OC41IGwgNTIuMjk5IDg2MC40MzMgNDQuMTMzIDg2Mi40NSAzOCA4NjQuNTQ5IGMgMzEuODY2IDg2Ni42NDkgMjYuNjQ5IDg3MC4yMTYgMjIuMzUgODc1LjI1IGMKMTguMDUgODgwLjI4MyAxNS45IDg4Ny4yNjYgMTUuOSA4OTYuMiBjIDE1LjkgODk2LjI5OSBsIDE1LjkgOTA1LjI5OSAxNy45MTYgOTEyLjk4MyAyMS45NDkgOTE5LjM1IGMKMjUuOTgzIDkyNS43MTYgMzEuODY2IDkzMC41NjYgMzkuNiA5MzMuODk5IGMgNDcuMzMzIDkzNy4yMzMgNTYuNjMzIDkzOC44OTkgNjcuNSA5MzguODk5IGMKNzIuNjMzIDkzOC44OTkgNzcuNzE2IDkzOC4zMzMgODIuNzUgOTM3LjIgYyA4Ny43ODMgOTM2LjA2NiA5Mi43NSA5MzQuMzgzIDk3LjY1IDkzMi4xNDkgYwoxMDIuNTQ5IDkyOS45MTYgMTA3LjQgOTI3LjEgMTEyLjIgOTIzLjcgYyAxMTIuMiA5MjMuNyBsIDEwMy43IDkxMi4zOTkgbAoxMDMuNyA5MTIuMzk5IGwgOTcuNDMzIDkxNi43OTkgOTEuMjk5IDkyMC4wODMgODUuMjk5IDkyMi4yNSBjIDc5LjI5OSA5MjQuNDE2IDczLjM2NiA5MjUuNSA2Ny41IDkyNS41IGMKNTUuNjMzIDkyNS41IDQ2LjQzMyA5MjMgMzkuODk5IDkxOCBjIDMzLjM2NiA5MTMgMzAuMSA5MDUuOTY2IDMwLjEgODk2Ljg5OSBjCjMwLjEgODk2Ljc5OSBsIDMwLjEgODkxLjMzMyAzMS43MzMgODg3LjAxNiAzNSA4ODMuODUgYyAzOC4yNjYgODgwLjY4MyA0Mi4zMTYgODc4LjMzMyA0Ny4xNDkgODc2Ljc5OSBjCjUxLjk4MyA4NzUuMjY2IDU4LjYgODczLjY2NiA2NyA4NzIgYyA2Ny4yNjYgODcxLjkzMyA2Ny41NDkgODcxLjg2NiA2Ny44NDkgODcxLjc5OSBjCjY4LjE1IDg3MS43MzMgNjguNDY2IDg3MS42NjYgNjguNzk5IDg3MS42IGMgNjkuMiA4NzEuNTMzIDY5LjU4MyA4NzEuNDUgNjkuOTUgODcxLjM1IGMKNzAuMzE2IDg3MS4yNSA3MC43IDg3MS4xNjYgNzEuMDk5IDg3MS4xIGMgODAuMjMzIDg2OS4yMzMgODcuODMzIDg2Ny4xIDkzLjkgODY0LjcgYwo5OS45NjYgODYyLjI5OSAxMDUuMDE2IDg1OC41NDkgMTA5LjA0OSA4NTMuNDUgYyAxMTMuMDgzIDg0OC4zNSAxMTUuMDk5IDg0MS40NjYgMTE1LjA5OSA4MzIuNzk5IGMKMTE1LjA5OSA4MzIuNiBsIDExNS4wOTkgODIzLjczMyAxMTMgODE2LjE0OSAxMDguNzk5IDgwOS44NSBjIDEwNC41OTkgODAzLjU0OSA5OC41MTYgNzk4Ljc1IDkwLjU0OSA3OTUuNDUgYwo4Mi41ODMgNzkyLjE0OSA3Mi45NjYgNzkwLjUgNjEuNyA3OTAuNSBjIDU0LjcgNzkwLjUgNDguMDY2IDc5MS4xNjYgNDEuNzk5IDc5Mi41IGMKaApmClEKZW5kc3RyZWFtCmVuZG9iagoKMjI5IDAgb2JqCjw8L0xlbmd0aCA4Mjc+PgpzdHJlYW0KMTMzNSAwIGQwCnEgMTAgMCAwIDEwIDAgLTc5MjAgY20KMjYuODk5IDg2Ni44OTkgbQo3Ni41IDg2Ni44OTkgbCA4MS45IDg2Ni44OTkgODYuNjUgODY4LjA4MyA5MC43NSA4NzAuNDUgYwo5NC44NDkgODcyLjgxNiA5OC4wMTYgODc2LjE2NiAxMDAuMjUgODgwLjUgYyAxMDIuNDgzIDg4NC44MzMgMTAzLjYzMyA4ODkuODMzIDEwMy43IDg5NS41IGMKMTAzLjcgODk1LjUgbCAxMDMuNyA5MDEuMTY2IDEwMi41ODMgOTA2LjE2NiAxMDAuMzQ5IDkxMC41IGMgOTguMTE2IDkxNC44MzMgOTQuOTUgOTE4LjE4MyA5MC44NDkgOTIwLjU0OSBjCjg2Ljc1IDkyMi45MTYgODEuOTY2IDkyNC4xIDc2LjUgOTI0LjEgYyAyNi44OTkgOTI0LjEgbCAyNi44OTkgOTM3LjUgbAo3NS43IDkzNy41IGwgODQuMDk5IDkzNy41IDkxLjQ4MyA5MzUuNzY2IDk3Ljg0OSA5MzIuMjk5IGMgMTA0LjIxNiA5MjguODMzIDEwOS4xNSA5MjMuOTE2IDExMi42NSA5MTcuNTQ5IGMKMTE2LjE1IDkxMS4xODMgMTE3LjkgOTAzLjgzMyAxMTcuOSA4OTUuNSBjIDExNy45IDg5NS41IGwgMTE3LjkgODg3LjE2NiAxMTYuMTUgODc5LjgxNiAxMTIuNjUgODczLjQ1IGMKMTA5LjE1IDg2Ny4wODMgMTA0LjIgODYyLjE2NiA5Ny43OTkgODU4LjcgYyA5MS40IDg1NS4yMzMgODQuMDMzIDg1My41IDc1LjcgODUzLjUgYwoyNi44OTkgODUzLjUgbCAyNi44OTkgODY2Ljg5OSBsIGgKMTggOTM3LjUgbQozMi4zOTkgOTM3LjUgbCAzMi4zOTkgNzkyIGwgMTggNzkyIGwgMTggOTM3LjUgbCBoCjczLjUgODU4IG0KODYuNzk5IDg2Mi42IGwgMTI0IDc5MiBsIDEwNi43OTkgNzkyIGwgNzMuNSA4NTggbCBoCmYKUQplbmRzdHJlYW0KZW5kb2JqCgoyMzAgMCBvYmoKPDwvTGVuZ3RoIDIzMD4+CnN0cmVhbQoxMTQ1IDAgZDAKcSAxMCAwIDAgMTAgMCAtNzkyMCBjbQoxOCA5MzcuMzk5IG0KMzIuMzk5IDkzNy4zOTkgbCAzMi4zOTkgNzkyIGwgMTggNzkyIGwgMTggOTM3LjM5OSBsIGgKMjggODY5LjYgbQo5OC41IDg2OS42IGwgOTguNSA4NTYuMiBsIDI4IDg1Ni4yIGwgMjggODY5LjYgbCBoCjI4IDkzNy4zOTkgbQoxMDkuNSA5MzcuMzk5IGwgMTA5LjUgOTI0IGwgMjggOTI0IGwgMjggOTM3LjM5OSBsIGgKZgpRCmVuZHN0cmVhbQplbmRvYmoKCjIzMSAwIG9iago8PC9MZW5ndGggMTQzOD4+CnN0cmVhbQoxMTA0IDAgZDAKcSAxMCAwIDAgMTAgMCAtNzkyMCBjbQoyOS44IDc1NC4xNDkgbQoyMy42NjYgNzU3LjA0OSAxOC44OTkgNzYxLjEzMyAxNS41IDc2Ni4zOTkgYyAxNS41IDc2Ni4zOTkgbAoyNS4zIDc3NS4yIGwgMjUuMyA3NzUuMiBsIDI4LjQzMyA3NzEuMTMzIDMyLjIgNzY3Ljk4MyAzNi42IDc2NS43NSBjCjQxIDc2My41MTYgNDUuNjMzIDc2Mi4zOTkgNTAuNSA3NjIuMzk5IGMgNjAuMTY2IDc2Mi4zOTkgNjcuNjY2IDc2NS4wODMgNzMgNzcwLjQ1IGMKNzguMzMzIDc3NS44MTYgODEgNzgzLjM2NiA4MSA3OTMuMSBjIDgxIDg5NS43OTkgbCA5NS40IDg5NS43OTkgbCA5NS40IDc5NS4xIGwKOTUuNCA3ODUuNTY2IDkzLjY1IDc3Ny4zOTkgOTAuMTUgNzcwLjYgYyA4Ni42NSA3NjMuNzk5IDgxLjU2NiA3NTguNjMzIDc0LjkgNzU1LjEgYwo2OC4yMzMgNzUxLjU2NiA2MC4yIDc0OS43OTkgNTAuNzk5IDc0OS43OTkgYyA0Mi45MzMgNzQ5Ljc5OSAzNS45MzMgNzUxLjI1IDI5LjggNzU0LjE0OSBjCmgKMjkuNSA3OTUuNDUgbQoyNC4xIDc5OC43NSAyMCA4MDMuNTMzIDE3LjE5OSA4MDkuNzk5IGMgMTQuNCA4MTYuMDY2IDEzIDgyMy42IDEzIDgzMi4zOTkgYwoxMyA4NTUgbCAxMyA4NjMuOTMzIDE0LjM2NiA4NzEuNTY2IDE3LjEgODc3Ljg5OSBjIDE5LjgzMyA4ODQuMjMzIDIzLjgxNiA4ODkuMDQ5IDI5LjA1IDg5Mi4zNSBjCjM0LjI4MyA4OTUuNjQ5IDQwLjU2NiA4OTcuMjk5IDQ3Ljg5OSA4OTcuMjk5IGMgNTUuODMzIDg5Ny4yOTkgNjIuNzgzIDg5NS44MTYgNjguNzUgODkyLjg1IGMKNzQuNzE2IDg4OS44ODMgNzkuNSA4ODUuMDMzIDgzLjA5OSA4NzguMjk5IGMgODEgODU4LjI5OSBsIDgxIDg2Mi44MzMgNzkuOTUgODY3LjEzMyA3Ny44NDkgODcxLjIgYwo3NS43NSA4NzUuMjY2IDcyLjcgODc4LjU2NiA2OC43IDg4MS4xIGMgNjQuNyA4ODMuNjMzIDYwIDg4NC44OTkgNTQuNiA4ODQuODk5IGMKNDUuOTMzIDg4NC44OTkgMzkuMjMzIDg4Mi4yODMgMzQuNSA4NzcuMDQ5IGMgMjkuNzY2IDg3MS44MTYgMjcuMzk5IDg2NC40MzMgMjcuMzk5IDg1NC44OTkgYwoyNy4zOTkgODMyLjM5OSBsIDI3LjM5OSA4MjMuMDY2IDI5Ljc2NiA4MTUuODE2IDM0LjUgODEwLjY0OSBjIDM5LjIzMyA4MDUuNDgzIDQ1LjkzMyA4MDIuODk5IDU0LjYgODAyLjg5OSBjCjU5LjkzMyA4MDIuODk5IDY0LjU5OSA4MDQuMiA2OC41OTkgODA2Ljc5OSBjIDcyLjU5OSA4MDkuMzk5IDc1LjY2NiA4MTIuNzgzIDc3Ljc5OSA4MTYuOTUgYwo3OS45MzMgODIxLjExNiA4MSA4MjUuNDY2IDgxIDgzMCBjIDgyLjQgODA4LjI5OSBsIDc5Ljc5OSA4MDEuOTY2IDc1LjY2NiA3OTcuNDE2IDcwIDc5NC42NDkgYwo2NC4zMzMgNzkxLjg4MyA1Ny4yOTkgNzkwLjUgNDguODk5IDc5MC41IGMgNDEuMzY2IDc5MC41IDM0Ljg5OSA3OTIuMTQ5IDI5LjUgNzk1LjQ1IGMKaApmClEKZW5kc3RyZWFtCmVuZG9iagoKMjMyIDAgb2JqCjw8L0xlbmd0aCA1MDc+PgpzdHJlYW0KMTE0NCAwIGQwCnEgMTAgMCAwIDEwIDAgLTc5MjAgY20KMTYgOTM3LjM5OSBtCjMwLjM5OSA5MzcuMzk5IGwgMzAuMzk5IDc5MiBsIDE2IDc5MiBsIDE2IDkzNy4zOTkgbCBoCjg1IDg1NC44OTkgbQo4NSA4NjQuMSA4Mi41ODMgODcxLjIzMyA3Ny43NSA4NzYuMjk5IGMgNzIuOTE2IDg4MS4zNjYgNjYuMDk5IDg4My44OTkgNTcuMjk5IDg4My44OTkgYwo0OC43NjYgODgzLjg5OSA0Mi4xNDkgODgxLjY0OSAzNy40NSA4NzcuMTQ5IGMgMzIuNzUgODcyLjY0OSAzMC4zOTkgODY2LjI2NiAzMC4zOTkgODU4IGMKMjguMyA4NzggbCAzMS45NjYgODg0Ljc5OSAzNi44MzMgODg5LjcxNiA0Mi44OTkgODkyLjc1IGMgNDguOTY2IDg5NS43ODMgNTYgODk3LjI5OSA2NCA4OTcuMjk5IGMKNzUuMjY2IDg5Ny4yOTkgODMuOTgzIDg5My42MTYgOTAuMTUgODg2LjI1IGMgOTYuMzE2IDg3OC44ODMgOTkuNCA4NjguNDY2IDk5LjQgODU1IGMKOTkuNCA3OTIgbCA4NSA3OTIgbCA4NSA4NTQuODk5IGwgaApmClEKZW5kc3RyZWFtCmVuZG9iagoKMjMzIDAgb2JqCjw8L0xlbmd0aCAzNjk+PgpzdHJlYW0KNjY4IDAgZDAKcSAxMCAwIDAgMTAgMCAtNzkyMCBjbQoyNC41NSA3OTguNDUgbQoyMC42NDkgODAzLjA4MyAxOC42OTkgODA5LjkzMyAxOC42OTkgODE5IGMgMTguNjk5IDkyNiBsCjMzLjEgOTI2IGwgMzMuMSA4MTguNzk5IGwgMzMuMSA4MTQuMzMzIDM0LjEgODEwLjg5OSAzNi4xIDgwOC41IGMgMzguMSA4MDYuMSA0MS4wNjYgODA0Ljg5OSA0NSA4MDQuODk5IGMKNTQuNzk5IDgwNC44OTkgbCA1NC43OTkgNzkxLjUgbCA0MyA3OTEuNSBsIDM0LjYgNzkxLjUgMjguNDQ5IDc5My44MTYgMjQuNTUgNzk4LjQ1IGMKaAo4IDg5NS43OTkgbQo1NC43OTkgODk1Ljc5OSBsIDU0Ljc5OSA4ODMuMzk5IGwgOCA4ODMuMzk5IGwgOCA4OTUuNzk5IGwKaApmClEKZW5kc3RyZWFtCmVuZG9iagoKMjM0IDAgb2JqCjw8L0xlbmd0aCA2NTQ+PgpzdHJlYW0KMTM0NCAwIGQwCnEgMTAgMCAwIDEwIDAgLTc5MjAgY20KMzEuOCA4MDUuMzk5IG0KNjQuNyA4MDUuMzk5IGwgNzguMTY2IDgwNS4zOTkgODguMjUgODA4LjU0OSA5NC45NSA4MTQuODUgYwoxMDEuNjUgODIxLjE0OSAxMDUgODMwLjYzMyAxMDUgODQzLjI5OSBjIDEwNSA4ODYuMSBsIDEwNSA4OTguNzY2IDEwMS42NSA5MDguMjUgOTQuOTUgOTE0LjU0OSBjCjg4LjI1IDkyMC44NSA3OC4xNjYgOTI0IDY0LjcgOTI0IGMgMzEuOCA5MjQgbCAzMS44IDkzNy4zOTkgbCA2NC4wOTkgOTM3LjM5OSBsCjc2LjQzMyA5MzcuMzk5IDg2LjcgOTM1LjQ4MyA5NC45IDkzMS42NDkgYyAxMDMuMDk5IDkyNy44MTYgMTA5LjIzMyA5MjIuMDMzIDExMy4yOTkgOTE0LjI5OSBjCjExNy4zNjYgOTA2LjU2NiAxMTkuNCA4OTYuODk5IDExOS40IDg4NS4yOTkgYyAxMTkuNCA4NDQuMSBsIDExOS40IDgzMi41IDExNy4zNDkgODIyLjg1IDExMy4yNSA4MTUuMTQ5IGMKMTA5LjE1IDgwNy40NSAxMDMgODAxLjY2NiA5NC43OTkgNzk3Ljc5OSBjIDg2LjU5OSA3OTMuOTMzIDc2LjMzMyA3OTIgNjQgNzkyIGMKMzEuOCA3OTIgbCAzMS44IDgwNS4zOTkgbCBoCjE4IDkzNy4zOTkgbQozMi4zOTkgOTM3LjM5OSBsIDMyLjM5OSA3OTIgbCAxOCA3OTIgbCAxOCA5MzcuMzk5IGwgaApmClEKZW5kc3RyZWFtCmVuZG9iagoKMjM1IDAgb2JqCjw8L0xlbmd0aCAxMDM+PgpzdHJlYW0KNTY0IDAgZDAKcSAxMCAwIDAgMTAgMCAtNzkyMCBjbQozNS4zOTkgNzkyIG0KMjEgNzkyIGwgMjEgOTM3LjM5OSBsIDM1LjM5OSA5MzcuMzk5IGwgMzUuMzk5IDc5MiBsIGgKZgpRCmVuZHN0cmVhbQplbmRvYmoKCjIzNiAwIG9iago8PC9MZW5ndGggMjIzPj4Kc3RyZWFtCjEzMjYgMCBkMApxIDEwIDAgMCAxMCAwIC03OTIwIGNtCjU3LjYgOTM3LjM5OSBtCjc1IDkzNy4zOTkgbCAxMjguNTk5IDc5MiBsIDExMi41OTkgNzkyIGwgNjYuMjk5IDkyMi4yOTkgbAoyMCA3OTIgbCA0IDc5MiBsIDU3LjYgOTM3LjM5OSBsIGgKMjguNjk5IDg0MC43IG0KMTA1LjIgODQwLjcgbCAxMDUuMiA4MjcuMjk5IGwgMjguNjk5IDgyNy4yOTkgbCAyOC42OTkgODQwLjcgbApoCmYKUQplbmRzdHJlYW0KZW5kb2JqCgoyMzcgMCBvYmoKPDwvTGVuZ3RoIDEwMzE+PgpzdHJlYW0KMTc1NCAwIGQwCnEgMTAgMCAwIDEwIDAgLTc5MjAgY20KMTQ2IDg1NC44OTkgbQoxNDYgODY0LjEgMTQzLjggODcxLjIzMyAxMzkuNCA4NzYuMjk5IGMgMTM1IDg4MS4zNjYgMTI4LjggODgzLjg5OSAxMjAuNzk5IDg4My44OTkgYwoxMTIuNzMzIDg4My44OTkgMTA2LjQ4MyA4ODEuNDMzIDEwMi4wNDkgODc2LjUgYyA5Ny42MTYgODcxLjU2NiA5NS40IDg2NC42MzMgOTUuNCA4NTUuNyBjCjg5LjI5OSA4NzAuNyBsIDkyLjYzMyA4NzkuMjk5IDk3LjI2NiA4ODUuODgzIDEwMy4yIDg5MC40NSBjIDEwOS4xMzMgODk1LjAxNiAxMTYuMjY2IDg5Ny4yOTkgMTI0LjU5OSA4OTcuMjk5IGMKMTMyLjEzMyA4OTcuMjk5IDEzOC41ODMgODk1LjY0OSAxNDMuOTQ5IDg5Mi4zNSBjIDE0OS4zMTYgODg5LjA0OSAxNTMuNCA4ODQuMjMzIDE1Ni4xOTkgODc3Ljg5OSBjCjE1OSA4NzEuNTY2IDE2MC40IDg2My45MzMgMTYwLjQgODU1IGMgMTYwLjQgNzkyIGwgMTQ2IDc5MiBsIDE0NiA4NTQuODk5IGwKaAoxNiA4OTUuNzk5IG0KMzAuMzk5IDg5NS43OTkgbCAzMC4zOTkgNzkyIGwgMTYgNzkyIGwgMTYgODk1Ljc5OSBsIGgKODEgODU0Ljg5OSBtCjgxIDg2NC4xIDc4LjgxNiA4NzEuMjMzIDc0LjQ1IDg3Ni4yOTkgYyA3MC4wODMgODgxLjM2NiA2My44NjYgODgzLjg5OSA1NS43OTkgODgzLjg5OSBjCjQ3LjczMyA4ODMuODk5IDQxLjQ4MyA4ODEuNjE2IDM3LjA0OSA4NzcuMDQ5IGMgMzIuNjE2IDg3Mi40ODMgMzAuMzk5IDg2Ni4wMzMgMzAuMzk5IDg1Ny43IGMKMjguMyA4NzcuNyBsIDMxLjc2NiA4ODQuNjMzIDM2LjI5OSA4ODkuNjMzIDQxLjg5OSA4OTIuNyBjIDQ3LjUgODk1Ljc2NiA1NC4wMzMgODk3LjI5OSA2MS41IDg5Ny4yOTkgYwo2OC42MzMgODk3LjI5OSA3NC43NSA4OTUuNjQ5IDc5Ljg0OSA4OTIuMzUgYyA4NC45NSA4ODkuMDQ5IDg4LjgxNiA4ODQuMjMzIDkxLjQ1IDg3Ny44OTkgYwo5NC4wODMgODcxLjU2NiA5NS40IDg2My45MzMgOTUuNCA4NTUgYyA5NS40IDc5MiBsIDgxIDc5MiBsIDgxIDg1NC44OTkgbApoCmYKUQplbmRzdHJlYW0KZW5kb2JqCgoyMzggMCBvYmoKPDwvTGVuZ3RoIDE4MzY+PgpzdHJlYW0KMTA2MiAwIGQwCnEgMTAgMCAwIDEwIDAgLTc5MjAgY20KMzUuMzk5IDc5Mi4xNDkgbQozMC4xMzMgNzkzLjI1IDI1LjIxNiA3OTQuODY2IDIwLjY0OSA3OTcgYyAxNi4wODMgNzk5LjEzMyAxMi4wMzMgODAxLjcgOC41IDgwNC43IGMKOC41IDgwNC43IGwgMTYuOCA4MTQuNzk5IGwgMTYuOCA4MTQuNzk5IGwgMjIuNDY2IDgxMSAyOC4zMzMgODA4LjA0OSAzNC4zOTkgODA1Ljk1IGMKNDAuNDY2IDgwMy44NSA0Ni4yMzMgODAyLjc5OSA1MS43IDgwMi43OTkgYyA2MS42MzMgODAyLjc5OSA2OS4zMTYgODA0LjUgNzQuNzUgODA3Ljg5OSBjCjgwLjE4MyA4MTEuMjk5IDgyLjkgODE2LjEgODIuOSA4MjIuMjk5IGMgODIuOSA4MjYuODMzIDgxLjU4MyA4MzAuMjMzIDc4Ljk1IDgzMi41IGMKNzYuMzE2IDgzNC43NjYgNzMgODM2LjI5OSA2OSA4MzcuMSBjIDY1IDgzNy44OTkgNTkuNDMzIDgzOC41NjYgNTIuMjk5IDgzOS4xIGMKNTEuNjMzIDgzOS4xNjYgNTAuOTUgODM5LjIxNiA1MC4yNSA4MzkuMjUgYyA0OS41NDkgODM5LjI4MyA0OC44NjYgODM5LjMzMyA0OC4yIDgzOS4zOTkgYwo0Ny45MzMgODM5LjM5OSA0Ny42NjYgODM5LjQxNiA0Ny4zOTkgODM5LjQ1IGMgNDcuMTMzIDgzOS40ODMgNDYuODY2IDgzOS41IDQ2LjYgODM5LjUgYwozOS43MzMgODQwLjE2NiAzNCA4NDEuMTY2IDI5LjM5OSA4NDIuNSBjIDI0LjggODQzLjgzMyAyMC45NDkgODQ2LjMzMyAxNy44NSA4NTAgYwoxNC43NSA4NTMuNjY2IDEzLjE5OSA4NTguOTY2IDEzLjE5OSA4NjUuODk5IGMgMTMuMTk5IDg3Mi41NjYgMTQuODE2IDg3OC4yMzMgMTguMDUgODgyLjg5OSBjCjIxLjI4MyA4ODcuNTY2IDI2LjAxNiA4OTEuMTMzIDMyLjI1IDg5My42IGMgMzguNDgzIDg5Ni4wNjYgNDUuOTY2IDg5Ny4yOTkgNTQuNyA4OTcuMjk5IGMKNTkuMjMzIDg5Ny4yOTkgNjMuNzY2IDg5Ni44NSA2OC4yOTkgODk1Ljk1IGMgNzIuODMzIDg5NS4wNDkgNzcuMTgzIDg5My43NSA4MS4zNDkgODkyLjA0OSBjCjg1LjUxNiA4OTAuMzUgODkuMzMzIDg4OC4yOTkgOTIuNzk5IDg4NS44OTkgYyA5Mi43OTkgODg1Ljg5OSBsIDg0LjUgODc2IGwKODQuNSA4NzYgbCA3OS41NjYgODc4Ljg2NiA3NC40MzMgODgxLjA4MyA2OS4wOTkgODgyLjY0OSBjIDYzLjc2NiA4ODQuMjE2IDU4Ljc2NiA4ODUgNTQuMSA4ODUgYwo0NS4zNjYgODg1IDM4LjYgODgzLjM2NiAzMy43OTkgODgwLjEgYyAyOSA4NzYuODMzIDI2LjYgODcyLjIzMyAyNi42IDg2Ni4yOTkgYwoyNi42IDg2Mi4xNjYgMjcuODk5IDg1OS4wODMgMzAuNSA4NTcuMDQ5IGMgMzMuMSA4NTUuMDE2IDM2LjM4MyA4NTMuNjY2IDQwLjM1IDg1MyBjCjQ0LjMxNiA4NTIuMzMzIDQ5Ljc2NiA4NTEuNzk5IDU2LjcgODUxLjM5OSBjIDU2Ljk2NiA4NTEuMzk5IDU3LjI1IDg1MS4zODMgNTcuNTQ5IDg1MS4zNSBjCjU3Ljg1IDg1MS4zMTYgNTguMTMzIDg1MS4yOTkgNTguMzk5IDg1MS4yOTkgYyA1OC42IDg1MS4yOTkgNTguNzk5IDg1MS4yOTkgNTkgODUxLjI5OSBjCjU5LjIgODUxLjI5OSA1OS4zOTkgODUxLjI2NiA1OS42IDg1MS4yIGMgNjYuODY2IDg1MC43OTkgNzMuMDQ5IDg0OS44OTkgNzguMTUgODQ4LjUgYwo4My4yNSA4NDcuMSA4Ny41MzMgODQ0LjMzMyA5MSA4NDAuMiBjIDk0LjQ2NiA4MzYuMDY2IDk2LjIgODMwLjEgOTYuMiA4MjIuMjk5IGMKOTYuMiA4MTUuNTY2IDk0LjQ2NiA4MDkuODMzIDkxIDgwNS4xIGMgODcuNTMzIDgwMC4zNjYgODIuNDY2IDc5Ni43NSA3NS43OTkgNzk0LjI1IGMKNjkuMTMzIDc5MS43NSA2MS4xIDc5MC41IDUxLjcgNzkwLjUgYyA0Ni4xIDc5MC41IDQwLjY2NiA3OTEuMDQ5IDM1LjM5OSA3OTIuMTQ5IGMKaApmClEKZW5kc3RyZWFtCmVuZG9iagoKMjM5IDAgb2JqCjw8L0xlbmd0aCAxODE+PgpzdHJlYW0KMTE3NCAwIGQwCnEgMTAgMCAwIDEwIDAgLTc5MjAgY20KMTggOTM3LjM5OSBtCjMyLjM5OSA5MzcuMzk5IGwgMzIuMzk5IDc5MiBsIDE4IDc5MiBsIDE4IDkzNy4zOTkgbCBoCjI4LjE5OSA4MDUuMzk5IG0KMTExLjQgODA1LjM5OSBsIDExMS40IDc5MiBsIDI4LjE5OSA3OTIgbCAyOC4xOTkgODA1LjM5OSBsCmgKZgpRCmVuZHN0cmVhbQplbmRvYmoKCjI0MCAwIG9iago8PC9MZW5ndGggMTA0OD4+CnN0cmVhbQoxMTE0IDAgZDAKcSAxMCAwIDAgMTAgMCAtNzkyMCBjbQo0MS4zOTkgNzk0LjY0OSBtCjM1LjczMyA3OTcuNDE2IDMxLjYgODAxLjk2NiAyOSA4MDguMjk5IGMgMzAuMzk5IDgzMCBsCjMwLjM5OSA4MjUuNDY2IDMxLjQ2NiA4MjEuMTE2IDMzLjYgODE2Ljk1IGMgMzUuNzMzIDgxMi43ODMgMzguNzk5IDgwOS4zOTkgNDIuNzk5IDgwNi43OTkgYwo0Ni43OTkgODA0LjIgNTEuNDY2IDgwMi44OTkgNTYuNzk5IDgwMi44OTkgYyA2NS40NjYgODAyLjg5OSA3Mi4xNjYgODA1LjQ4MyA3Ni45IDgxMC42NDkgYwo4MS42MzMgODE1LjgxNiA4NCA4MjMuMDY2IDg0IDgzMi4zOTkgYyA4NCA4NTQuODk5IGwgODQgODY0LjQzMyA4MS42MzMgODcxLjgxNiA3Ni45IDg3Ny4wNDkgYwo3Mi4xNjYgODgyLjI4MyA2NS40NjYgODg0Ljg5OSA1Ni43OTkgODg0Ljg5OSBjIDUxLjQ2NiA4ODQuODk5IDQ2Ljc5OSA4ODMuNjE2IDQyLjc5OSA4ODEuMDQ5IGMKMzguNzk5IDg3OC40ODMgMzUuNzMzIDg3NS4xNjYgMzMuNiA4NzEuMSBjIDMxLjQ2NiA4NjcuMDMzIDMwLjM5OSA4NjIuNzY2IDMwLjM5OSA4NTguMjk5IGMKMjguMyA4NzguMjk5IGwgMzEuODk5IDg4NS4wMzMgMzYuNjgzIDg4OS44ODMgNDIuNjQ5IDg5Mi44NSBjIDQ4LjYxNiA4OTUuODE2IDU1LjU2NiA4OTcuMjk5IDYzLjUgODk3LjI5OSBjCjcwLjgzMyA4OTcuMjk5IDc3LjExNiA4OTUuNjQ5IDgyLjM0OSA4OTIuMzUgYyA4Ny41ODMgODg5LjA0OSA5MS41NjYgODg0LjIzMyA5NC4yOTkgODc3Ljg5OSBjCjk3LjAzMyA4NzEuNTY2IDk4LjQgODYzLjkzMyA5OC40IDg1NSBjIDk4LjQgODMyLjM5OSBsIDk4LjQgODIzLjYgOTcgODE2LjA2NiA5NC4yIDgwOS43OTkgYwo5MS40IDgwMy41MzMgODcuMjk5IDc5OC43NSA4MS45IDc5NS40NSBjIDc2LjUgNzkyLjE0OSA3MC4wMzMgNzkwLjUgNjIuNSA3OTAuNSBjCjU0LjEgNzkwLjUgNDcuMDY2IDc5MS44ODMgNDEuMzk5IDc5NC42NDkgYyBoCjE2IDkzNy4zOTkgbQozMC4zOTkgOTM3LjM5OSBsIDMwLjM5OSA3OTIgbCAxNiA3OTIgbCAxNiA5MzcuMzk5IGwgaApmClEKZW5kc3RyZWFtCmVuZG9iagoKMjQxIDAgb2JqCjw8L0xlbmd0aCA1MzE+PgpzdHJlYW0KMTEzOSAwIGQwCnEgMTAgMCAwIDEwIDAgLTc5MjAgY20KODQuNTk5IDg5NS43OTkgbQo5OC45IDg5NS43OTkgbCA5OC45IDc5MiBsIDg0LjU5OSA3OTIgbCA4NC41OTkgODk1Ljc5OSBsCmgKMzAuMzk5IDgzMi43IG0KMzAuMzk5IDgyMy41NjYgMzIuNzY2IDgxNi40ODMgMzcuNSA4MTEuNDUgYyA0Mi4yMzMgODA2LjQxNiA0OC45MzMgODAzLjg5OSA1Ny42IDgwMy44OTkgYwo2Ni4yIDgwMy44OTkgNzIuODQ5IDgwNi4yIDc3LjU0OSA4MTAuNzk5IGMgODIuMjUgODE1LjM5OSA4NC41OTkgODIxLjg5OSA4NC41OTkgODMwLjI5OSBjCjg2IDgwOC42IGwgODMuNDY2IDgwMy40NjYgNzkuMjgzIDc5OS4xNjYgNzMuNDUgNzk1LjcgYyA2Ny42MTYgNzkyLjIzMyA2MC40MzMgNzkwLjUgNTEuODk5IDc5MC41IGMKNDAuNDMzIDc5MC41IDMxLjU4MyA3OTQuMTgzIDI1LjM1IDgwMS41NDkgYyAxOS4xMTYgODA4LjkxNiAxNiA4MTkuMjk5IDE2IDgzMi43IGMKMTYgODk1Ljc5OSBsIDMwLjM5OSA4OTUuNzk5IGwgMzAuMzk5IDgzMi43IGwgaApmClEKZW5kc3RyZWFtCmVuZG9iagoKMjQyIDAgb2JqCjw8L0xlbmd0aCA5Pj4Kc3RyZWFtCjU1MCAwIGQwCmVuZHN0cmVhbQplbmRvYmoKCjI0MyAwIG9iago8PC9MZW5ndGggMTY4Pj4Kc3RyZWFtCjk4NiAwIGQwCnEgMTAgMCAwIDEwIDAgLTc5MjAgY20KNDIuMSA5MzEuNSBtCjU2LjUgOTMxLjUgbCA1Ni41IDc5MiBsIDQyLjEgNzkyIGwgNDIuMSA5MzEuNSBsIGgKLTIgOTM3LjM5OSBtCjEwMC41OTkgOTM3LjM5OSBsIDEwMC41OTkgOTI0IGwgLTIgOTI0IGwgLTIgOTM3LjM5OSBsCmgKZgpRCmVuZHN0cmVhbQplbmRvYmoKCjI0NCAwIG9iago8PC9MZW5ndGggMTUxPj4Kc3RyZWFtCjEyMDIgMCBkMApxIDEwIDAgMCAxMCAwIC03OTIwIGNtCjMgOTM3LjM5OSBtCjE4LjE5OSA5MzcuMzk5IGwgNjAuMSA4MTIuMzk5IGwgMTAyIDkzNy4zOTkgbCAxMTcuMiA5MzcuMzk5IGwKNjYuNzk5IDc5MiBsIDUzLjM5OSA3OTIgbCAzIDkzNy4zOTkgbCBoCmYKUQplbmRzdHJlYW0KZW5kb2JqCgoyNDUgMCBvYmoKPDwvTGVuZ3RoIDEwNTY+PgpzdHJlYW0KMTExNCAwIGQwCnEgMTAgMCAwIDEwIDAgLTc5MjAgY20KMTYgODk1Ljc5OSBtCjMwLjM5OSA4OTUuNzk5IGwgMzAuMzk5IDc0OS43OTkgbCAxNiA3NDkuNzk5IGwgMTYgODk1Ljc5OSBsCmgKNDEuMzk5IDc5NC42NDkgbQozNS43MzMgNzk3LjQxNiAzMS42IDgwMS45NjYgMjkgODA4LjI5OSBjIDMwLjM5OSA4MzAgbAozMC4zOTkgODI1LjQ2NiAzMS40NjYgODIxLjExNiAzMy42IDgxNi45NSBjIDM1LjczMyA4MTIuNzgzIDM4Ljc5OSA4MDkuMzk5IDQyLjc5OSA4MDYuNzk5IGMKNDYuNzk5IDgwNC4yIDUxLjQ2NiA4MDIuODk5IDU2Ljc5OSA4MDIuODk5IGMgNjUuNDY2IDgwMi44OTkgNzIuMTY2IDgwNS40ODMgNzYuOSA4MTAuNjQ5IGMKODEuNjMzIDgxNS44MTYgODQgODIzLjA2NiA4NCA4MzIuMzk5IGMgODQgODU0Ljg5OSBsIDg0IDg2NC40MzMgODEuNjMzIDg3MS44MTYgNzYuOSA4NzcuMDQ5IGMKNzIuMTY2IDg4Mi4yODMgNjUuNDY2IDg4NC44OTkgNTYuNzk5IDg4NC44OTkgYyA1MS40NjYgODg0Ljg5OSA0Ni43OTkgODgzLjYxNiA0Mi43OTkgODgxLjA0OSBjCjM4Ljc5OSA4NzguNDgzIDM1LjczMyA4NzUuMTY2IDMzLjYgODcxLjEgYyAzMS40NjYgODY3LjAzMyAzMC4zOTkgODYyLjc2NiAzMC4zOTkgODU4LjI5OSBjCjI4LjMgODc4LjI5OSBsIDMxLjg5OSA4ODUuMDMzIDM2LjY4MyA4ODkuODgzIDQyLjY0OSA4OTIuODUgYyA0OC42MTYgODk1LjgxNiA1NS41NjYgODk3LjI5OSA2My41IDg5Ny4yOTkgYwo3MC44MzMgODk3LjI5OSA3Ny4xMTYgODk1LjY0OSA4Mi4zNDkgODkyLjM1IGMgODcuNTgzIDg4OS4wNDkgOTEuNTY2IDg4NC4yMzMgOTQuMjk5IDg3Ny44OTkgYwo5Ny4wMzMgODcxLjU2NiA5OC40IDg2My45MzMgOTguNCA4NTUgYyA5OC40IDgzMi4zOTkgbCA5OC40IDgyMy42IDk3IDgxNi4wNjYgOTQuMiA4MDkuNzk5IGMKOTEuNCA4MDMuNTMzIDg3LjI5OSA3OTguNzUgODEuOSA3OTUuNDUgYyA3Ni41IDc5Mi4xNDkgNzAuMDMzIDc5MC41IDYyLjUgNzkwLjUgYwo1NC4xIDc5MC41IDQ3LjA2NiA3OTEuODgzIDQxLjM5OSA3OTQuNjQ5IGMgaApmClEKZW5kc3RyZWFtCmVuZG9iagoKMjQ2IDAgb2JqCjw8L0xlbmd0aCAyNzQ+PgpzdHJlYW0KMTA1OSAwIGQwCnEgMTAgMCAwIDEwIDAgLTc5MjAgY20KNDguMjk5IDg0MSBtCjYuNTk5IDg5NS43OTkgbCAyMi44IDg5NS43OTkgbCA1Ni43OTkgODQ5LjIgbCA5OS40IDc5MiBsCjgzLjI5OSA3OTIgbCA0OC4yOTkgODQxIGwgaAo0Ny43IDg0OS4yOTkgbQo1NS43IDgzNy4zOTkgbCAyMi4xIDc5MiBsIDYgNzkyIGwgNDcuNyA4NDkuMjk5IGwgaAo1MSA4NTAuNiBtCjgxLjU5OSA4OTUuNzk5IGwgOTcuNzk5IDg5NS43OTkgbCA1OC41IDgzOS43OTkgbCA1MSA4NTAuNiBsCmgKZgpRCmVuZHN0cmVhbQplbmRvYmoKCjI0NyAwIG9iago8PC9MZW5ndGggMzc0Pj4Kc3RyZWFtCjY0OSAwIGQwCnEgMTAgMCAwIDEwIDAgLTc5MjAgY20KMTkgOTA5Ljg5OSBtCjE5IDkxOS4xIDIwLjk4MyA5MjUuOTgzIDI0Ljk0OSA5MzAuNTQ5IGMgMjguOTE2IDkzNS4xMTYgMzQuODk5IDkzNy4zOTkgNDIuODk5IDkzNy4zOTkgYwo1OS44OTkgOTM3LjM5OSBsIDU5Ljg5OSA5MjQgbCA0NS4yOTkgOTI0IGwgNDEuMjk5IDkyNCAzOC4zMTYgOTIyLjg1IDM2LjM1IDkyMC41NDkgYwozNC4zODMgOTE4LjI1IDMzLjM5OSA5MTQuNzY2IDMzLjM5OSA5MTAuMSBjIDMzLjM5OSA3OTIgbCAxOSA3OTIgbCAxOSA5MDkuODk5IGwKaAo4IDg5NS43OTkgbQo1OS44OTkgODk1Ljc5OSBsIDU5Ljg5OSA4ODMuMzk5IGwgOCA4ODMuMzk5IGwgOCA4OTUuNzk5IGwKaApmClEKZW5kc3RyZWFtCmVuZG9iagoKMjQ5IDAgb2JqCjw8Pj4KZW5kb2JqCgoyNDggMCBvYmoKPDwvRm9udCAyNDkgMCBSCi9Qcm9jU2V0Wy9QREYvVGV4dF0KPj4KZW5kb2JqCgoyNTAgMCBvYmoKPDwvRjEgMjE0IDAgUgo+PgplbmRvYmoKCjI1MSAwIG9iago8PC9Gb250IDI1MCAwIFIKL1Byb2NTZXRbL1BERi9UZXh0XQo+PgplbmRvYmoKCjEgMCBvYmoKPDwvVHlwZS9QYWdlL1BhcmVudCAyMTEgMCBSL1Jlc291cmNlcyAyNTEgMCBSL01lZGlhQm94WzAgMCA2MTIgNzkyXS9TdHJ1Y3RQYXJlbnRzIDAKL0NvbnRlbnRzIDIgMCBSPj4KZW5kb2JqCgoyNTIgMCBvYmoKPDwvQ291bnQgMS9GaXJzdCAyNTMgMCBSL0xhc3QgMjUzIDAgUgo+PgplbmRvYmoKCjI1MyAwIG9iago8PC9Db3VudCAwL1RpdGxlPEZFRkYwMDUwMDA2MTAwNjcwMDY1MDAyMDAwMzE+Ci9EZXN0WzEgMCBSL1hZWiAwIDc5MiAwXS9QYXJlbnQgMjUyIDAgUj4+CmVuZG9iagoKMjU0IDAgb2JqCjw8L1R5cGUvTWV0YWRhdGEvU3VidHlwZS9YTUwvTGVuZ3RoIDQ5MDQ+PgpzdHJlYW0KPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyI+CiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnBkZnVhaWQ9Imh0dHA6Ly93d3cuYWlpbS5vcmcvcGRmdWEvbnMvaWQvIj4KICAgPHBkZnVhaWQ6cGFydD4xPC9wZGZ1YWlkOnBhcnQ+CiAgPC9yZGY6RGVzY3JpcHRpb24+CiAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6cGRmPSJodHRwOi8vbnMuYWRvYmUuY29tL3BkZi8xLjMvIj4KICAgPHBkZjpQcm9kdWNlcj5MaWJyZU9mZmljZSA3LjU8L3BkZjpQcm9kdWNlcj4KICA8L3JkZjpEZXNjcmlwdGlvbj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iPgogICA8eG1wOkNyZWF0b3JUb29sPkRyYXc8L3htcDpDcmVhdG9yVG9vbD4KICAgPHhtcDpDcmVhdGVEYXRlPjIwMjQtMDgtMDJUMTQ6MTI6MDUtMDQ6MDA8L3htcDpDcmVhdGVEYXRlPgogIDwvcmRmOkRlc2NyaXB0aW9uPgogPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/PgoKZW5kc3RyZWFtCmVuZG9iagoKNyAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvUAovUCA2IDAgUgovUGcgMSAwIFIKL0tbMSBdCj4+CmVuZG9iagoKMjU2IDAgb2JqCjw8L08vTGF5b3V0Ci9QbGFjZW1lbnQvSW5saW5lCj4+CmVuZG9iagoKMjU3IDAgb2JqCjw8L08vVGFibGUKL1Njb3BlL0NvbHVtbgo+PgplbmRvYmoKCjYgMCBvYmoKPDwvVHlwZS9TdHJ1Y3RFbGVtCi9TL1RICi9QIDUgMCBSCi9QZyAxIDAgUgovQSBbIDI1NiAwIFIgMjU3IDAgUiBdCi9LWzAgNyAwIFIgXQo+PgplbmRvYmoKCjkgMCBvYmoKPDwvVHlwZS9TdHJ1Y3RFbGVtCi9TL1AKL1AgOCAwIFIKL1BnIDEgMCBSCj4+CmVuZG9iagoKMjU4IDAgb2JqCjw8L08vTGF5b3V0Ci9QbGFjZW1lbnQvSW5saW5lCj4+CmVuZG9iagoKMjU5IDAgb2JqCjw8L08vVGFibGUKL1Njb3BlL0NvbHVtbgo+PgplbmRvYmoKCjggMCBvYmoKPDwvVHlwZS9TdHJ1Y3RFbGVtCi9TL1RICi9QIDUgMCBSCi9QZyAxIDAgUgovQSBbIDI1OCAwIFIgMjU5IDAgUiBdCi9LWzIgOSAwIFIgXQo+PgplbmRvYmoKCjExIDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9QCi9QIDEwIDAgUgovUGcgMSAwIFIKPj4KZW5kb2JqCgoyNjAgMCBvYmoKPDwvTy9MYXlvdXQKL1BsYWNlbWVudC9JbmxpbmUKPj4KZW5kb2JqCgoyNjEgMCBvYmoKPDwvTy9UYWJsZQovU2NvcGUvQ29sdW1uCj4+CmVuZG9iagoKMTAgMCBvYmoKPDwvVHlwZS9TdHJ1Y3RFbGVtCi9TL1RICi9QIDUgMCBSCi9QZyAxIDAgUgovQSBbIDI2MCAwIFIgMjYxIDAgUiBdCi9LWzMgMTEgMCBSIF0KPj4KZW5kb2JqCgoyNjIgMCBvYmoKPDwvTy9MYXlvdXQKL1BsYWNlbWVudC9CbG9jawo+PgplbmRvYmoKCjUgMCBvYmoKPDwvVHlwZS9TdHJ1Y3RFbGVtCi9TL1RSCi9QIDQgMCBSCi9QZyAxIDAgUgovQSAyNjIgMCBSCi9LWzYgMCBSIDggMCBSIDEwIDAgUiBdCj4+CmVuZG9iagoKMTQgMCBvYmoKPDwvVHlwZS9TdHJ1Y3RFbGVtCi9TL1AKL1AgMTMgMCBSCi9QZyAxIDAgUgovS1s1IF0KPj4KZW5kb2JqCgoyNjMgMCBvYmoKPDwvTy9MYXlvdXQKL1BsYWNlbWVudC9JbmxpbmUKPj4KZW5kb2JqCgoxMyAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvVEQKL1AgMTIgMCBSCi9QZyAxIDAgUgovQSAyNjMgMCBSCi9LWzQgMTQgMCBSIF0KPj4KZW5kb2JqCgoxNiAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvUAovUCAxNSAwIFIKL1BnIDEgMCBSCj4+CmVuZG9iagoKMjY0IDAgb2JqCjw8L08vTGF5b3V0Ci9QbGFjZW1lbnQvSW5saW5lCj4+CmVuZG9iagoKMTUgMCBvYmoKPDwvVHlwZS9TdHJ1Y3RFbGVtCi9TL1RECi9QIDEyIDAgUgovUGcgMSAwIFIKL0EgMjY0IDAgUgovS1s2IDE2IDAgUiBdCj4+CmVuZG9iagoKMTggMCBvYmoKPDwvVHlwZS9TdHJ1Y3RFbGVtCi9TL1AKL1AgMTcgMCBSCi9QZyAxIDAgUgo+PgplbmRvYmoKCjI2NSAwIG9iago8PC9PL0xheW91dAovUGxhY2VtZW50L0lubGluZQo+PgplbmRvYmoKCjE3IDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9URAovUCAxMiAwIFIKL1BnIDEgMCBSCi9BIDI2NSAwIFIKL0tbNyAxOCAwIFIgXQo+PgplbmRvYmoKCjI2NiAwIG9iago8PC9PL0xheW91dAovUGxhY2VtZW50L0Jsb2NrCj4+CmVuZG9iagoKMTIgMCBvYmoKPDwvVHlwZS9TdHJ1Y3RFbGVtCi9TL1RSCi9QIDQgMCBSCi9QZyAxIDAgUgovQSAyNjYgMCBSCi9LWzEzIDAgUiAxNSAwIFIgMTcgMCBSIF0KPj4KZW5kb2JqCgoyMSAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvUAovUCAyMCAwIFIKL1BnIDEgMCBSCi9LWzkgXQo+PgplbmRvYmoKCjI2NyAwIG9iago8PC9PL0xheW91dAovUGxhY2VtZW50L0lubGluZQo+PgplbmRvYmoKCjIwIDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9URAovUCAxOSAwIFIKL1BnIDEgMCBSCi9BIDI2NyAwIFIKL0tbOCAyMSAwIFIgXQo+PgplbmRvYmoKCjIzIDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9QCi9QIDIyIDAgUgovUGcgMSAwIFIKPj4KZW5kb2JqCgoyNjggMCBvYmoKPDwvTy9MYXlvdXQKL1BsYWNlbWVudC9JbmxpbmUKPj4KZW5kb2JqCgoyMiAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvVEQKL1AgMTkgMCBSCi9QZyAxIDAgUgovQSAyNjggMCBSCi9LWzEwIDIzIDAgUiBdCj4+CmVuZG9iagoKMjUgMCBvYmoKPDwvVHlwZS9TdHJ1Y3RFbGVtCi9TL1AKL1AgMjQgMCBSCi9QZyAxIDAgUgo+PgplbmRvYmoKCjI2OSAwIG9iago8PC9PL0xheW91dAovUGxhY2VtZW50L0lubGluZQo+PgplbmRvYmoKCjI0IDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9URAovUCAxOSAwIFIKL1BnIDEgMCBSCi9BIDI2OSAwIFIKL0tbMTEgMjUgMCBSIF0KPj4KZW5kb2JqCgoyNzAgMCBvYmoKPDwvTy9MYXlvdXQKL1BsYWNlbWVudC9CbG9jawo+PgplbmRvYmoKCjE5IDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9UUgovUCA0IDAgUgovUGcgMSAwIFIKL0EgMjcwIDAgUgovS1syMCAwIFIgMjIgMCBSIDI0IDAgUiBdCj4+CmVuZG9iagoKMjggMCBvYmoKPDwvVHlwZS9TdHJ1Y3RFbGVtCi9TL1AKL1AgMjcgMCBSCi9QZyAxIDAgUgovS1sxMyBdCj4+CmVuZG9iagoKMjcxIDAgb2JqCjw8L08vTGF5b3V0Ci9QbGFjZW1lbnQvSW5saW5lCj4+CmVuZG9iagoKMjcgMCBvYmoKPDwvVHlwZS9TdHJ1Y3RFbGVtCi9TL1RECi9QIDI2IDAgUgovUGcgMSAwIFIKL0EgMjcxIDAgUgovS1sxMiAyOCAwIFIgXQo+PgplbmRvYmoKCjMwIDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9QCi9QIDI5IDAgUgovUGcgMSAwIFIKPj4KZW5kb2JqCgoyNzIgMCBvYmoKPDwvTy9MYXlvdXQKL1BsYWNlbWVudC9JbmxpbmUKPj4KZW5kb2JqCgoyOSAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvVEQKL1AgMjYgMCBSCi9QZyAxIDAgUgovQSAyNzIgMCBSCi9LWzE0IDMwIDAgUiBdCj4+CmVuZG9iagoKMzIgMCBvYmoKPDwvVHlwZS9TdHJ1Y3RFbGVtCi9TL1AKL1AgMzEgMCBSCi9QZyAxIDAgUgo+PgplbmRvYmoKCjI3MyAwIG9iago8PC9PL0xheW91dAovUGxhY2VtZW50L0lubGluZQo+PgplbmRvYmoKCjMxIDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9URAovUCAyNiAwIFIKL1BnIDEgMCBSCi9BIDI3MyAwIFIKL0tbMTUgMzIgMCBSIF0KPj4KZW5kb2JqCgoyNzQgMCBvYmoKPDwvTy9MYXlvdXQKL1BsYWNlbWVudC9CbG9jawo+PgplbmRvYmoKCjI2IDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9UUgovUCA0IDAgUgovUGcgMSAwIFIKL0EgMjc0IDAgUgovS1syNyAwIFIgMjkgMCBSIDMxIDAgUiBdCj4+CmVuZG9iagoKMzUgMCBvYmoKPDwvVHlwZS9TdHJ1Y3RFbGVtCi9TL1AKL1AgMzQgMCBSCi9QZyAxIDAgUgo+PgplbmRvYmoKCjI3NSAwIG9iago8PC9PL0xheW91dAovUGxhY2VtZW50L0lubGluZQo+PgplbmRvYmoKCjM0IDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9URAovUCAzMyAwIFIKL1BnIDEgMCBSCi9BIDI3NSAwIFIKL0tbMTYgMzUgMCBSIF0KPj4KZW5kb2JqCgozNyAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvUAovUCAzNiAwIFIKL1BnIDEgMCBSCj4+CmVuZG9iagoKMjc2IDAgb2JqCjw8L08vTGF5b3V0Ci9QbGFjZW1lbnQvSW5saW5lCj4+CmVuZG9iagoKMzYgMCBvYmoKPDwvVHlwZS9TdHJ1Y3RFbGVtCi9TL1RECi9QIDMzIDAgUgovUGcgMSAwIFIKL0EgMjc2IDAgUgovS1sxNyAzNyAwIFIgXQo+PgplbmRvYmoKCjM5IDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9QCi9QIDM4IDAgUgovUGcgMSAwIFIKPj4KZW5kb2JqCgoyNzcgMCBvYmoKPDwvTy9MYXlvdXQKL1BsYWNlbWVudC9JbmxpbmUKPj4KZW5kb2JqCgozOCAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvVEQKL1AgMzMgMCBSCi9QZyAxIDAgUgovQSAyNzcgMCBSCi9LWzE4IDM5IDAgUiBdCj4+CmVuZG9iagoKMjc4IDAgb2JqCjw8L08vTGF5b3V0Ci9QbGFjZW1lbnQvQmxvY2sKPj4KZW5kb2JqCgozMyAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvVFIKL1AgNCAwIFIKL1BnIDEgMCBSCi9BIDI3OCAwIFIKL0tbMzQgMCBSIDM2IDAgUiAzOCAwIFIgXQo+PgplbmRvYmoKCjQyIDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9QCi9QIDQxIDAgUgovUGcgMSAwIFIKL0tbMjAgXQo+PgplbmRvYmoKCjI3OSAwIG9iago8PC9PL0xheW91dAovUGxhY2VtZW50L0lubGluZQo+PgplbmRvYmoKCjQxIDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9URAovUCA0MCAwIFIKL1BnIDEgMCBSCi9BIDI3OSAwIFIKL0tbMTkgNDIgMCBSIF0KPj4KZW5kb2JqCgo0NCAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvUAovUCA0MyAwIFIKL1BnIDEgMCBSCj4+CmVuZG9iagoKMjgwIDAgb2JqCjw8L08vTGF5b3V0Ci9QbGFjZW1lbnQvSW5saW5lCj4+CmVuZG9iagoKNDMgMCBvYmoKPDwvVHlwZS9TdHJ1Y3RFbGVtCi9TL1RECi9QIDQwIDAgUgovUGcgMSAwIFIKL0EgMjgwIDAgUgovS1syMSA0NCAwIFIgXQo+PgplbmRvYmoKCjQ2IDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9QCi9QIDQ1IDAgUgovUGcgMSAwIFIKPj4KZW5kb2JqCgoyODEgMCBvYmoKPDwvTy9MYXlvdXQKL1BsYWNlbWVudC9JbmxpbmUKPj4KZW5kb2JqCgo0NSAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvVEQKL1AgNDAgMCBSCi9QZyAxIDAgUgovQSAyODEgMCBSCi9LWzIyIDQ2IDAgUiBdCj4+CmVuZG9iagoKMjgyIDAgb2JqCjw8L08vTGF5b3V0Ci9QbGFjZW1lbnQvQmxvY2sKPj4KZW5kb2JqCgo0MCAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvVFIKL1AgNCAwIFIKL1BnIDEgMCBSCi9BIDI4MiAwIFIKL0tbNDEgMCBSIDQzIDAgUiA0NSAwIFIgXQo+PgplbmRvYmoKCjQ5IDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9QCi9QIDQ4IDAgUgovUGcgMSAwIFIKL0tbMjQgXQo+PgplbmRvYmoKCjI4MyAwIG9iago8PC9PL0xheW91dAovUGxhY2VtZW50L0lubGluZQo+PgplbmRvYmoKCjQ4IDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9URAovUCA0NyAwIFIKL1BnIDEgMCBSCi9BIDI4MyAwIFIKL0tbMjMgNDkgMCBSIF0KPj4KZW5kb2JqCgo1MSAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvUAovUCA1MCAwIFIKL1BnIDEgMCBSCj4+CmVuZG9iagoKMjg0IDAgb2JqCjw8L08vTGF5b3V0Ci9QbGFjZW1lbnQvSW5saW5lCj4+CmVuZG9iagoKNTAgMCBvYmoKPDwvVHlwZS9TdHJ1Y3RFbGVtCi9TL1RECi9QIDQ3IDAgUgovUGcgMSAwIFIKL0EgMjg0IDAgUgovS1syNSA1MSAwIFIgXQo+PgplbmRvYmoKCjUzIDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9QCi9QIDUyIDAgUgovUGcgMSAwIFIKPj4KZW5kb2JqCgoyODUgMCBvYmoKPDwvTy9MYXlvdXQKL1BsYWNlbWVudC9JbmxpbmUKPj4KZW5kb2JqCgo1MiAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvVEQKL1AgNDcgMCBSCi9QZyAxIDAgUgovQSAyODUgMCBSCi9LWzI2IDUzIDAgUiBdCj4+CmVuZG9iagoKMjg2IDAgb2JqCjw8L08vTGF5b3V0Ci9QbGFjZW1lbnQvQmxvY2sKPj4KZW5kb2JqCgo0NyAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvVFIKL1AgNCAwIFIKL1BnIDEgMCBSCi9BIDI4NiAwIFIKL0tbNDggMCBSIDUwIDAgUiA1MiAwIFIgXQo+PgplbmRvYmoKCjU2IDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9QCi9QIDU1IDAgUgovUGcgMSAwIFIKL0tbMjggXQo+PgplbmRvYmoKCjI4NyAwIG9iago8PC9PL0xheW91dAovUGxhY2VtZW50L0lubGluZQo+PgplbmRvYmoKCjU1IDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9URAovUCA1NCAwIFIKL1BnIDEgMCBSCi9BIDI4NyAwIFIKL0tbMjcgNTYgMCBSIF0KPj4KZW5kb2JqCgo1OCAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvUAovUCA1NyAwIFIKL1BnIDEgMCBSCj4+CmVuZG9iagoKMjg4IDAgb2JqCjw8L08vTGF5b3V0Ci9QbGFjZW1lbnQvSW5saW5lCj4+CmVuZG9iagoKNTcgMCBvYmoKPDwvVHlwZS9TdHJ1Y3RFbGVtCi9TL1RECi9QIDU0IDAgUgovUGcgMSAwIFIKL0EgMjg4IDAgUgovS1syOSA1OCAwIFIgXQo+PgplbmRvYmoKCjYwIDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9QCi9QIDU5IDAgUgovUGcgMSAwIFIKPj4KZW5kb2JqCgoyODkgMCBvYmoKPDwvTy9MYXlvdXQKL1BsYWNlbWVudC9JbmxpbmUKPj4KZW5kb2JqCgo1OSAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvVEQKL1AgNTQgMCBSCi9QZyAxIDAgUgovQSAyODkgMCBSCi9LWzMwIDYwIDAgUiBdCj4+CmVuZG9iagoKMjkwIDAgb2JqCjw8L08vTGF5b3V0Ci9QbGFjZW1lbnQvQmxvY2sKPj4KZW5kb2JqCgo1NCAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvVFIKL1AgNCAwIFIKL1BnIDEgMCBSCi9BIDI5MCAwIFIKL0tbNTUgMCBSIDU3IDAgUiA1OSAwIFIgXQo+PgplbmRvYmoKCjYzIDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9QCi9QIDYyIDAgUgovUGcgMSAwIFIKL0tbMzIgXQo+PgplbmRvYmoKCjI5MSAwIG9iago8PC9PL0xheW91dAovUGxhY2VtZW50L0lubGluZQo+PgplbmRvYmoKCjYyIDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9URAovUCA2MSAwIFIKL1BnIDEgMCBSCi9BIDI5MSAwIFIKL0tbMzEgNjMgMCBSIF0KPj4KZW5kb2JqCgo2NSAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvUAovUCA2NCAwIFIKL1BnIDEgMCBSCj4+CmVuZG9iagoKMjkyIDAgb2JqCjw8L08vTGF5b3V0Ci9QbGFjZW1lbnQvSW5saW5lCj4+CmVuZG9iagoKNjQgMCBvYmoKPDwvVHlwZS9TdHJ1Y3RFbGVtCi9TL1RECi9QIDYxIDAgUgovUGcgMSAwIFIKL0EgMjkyIDAgUgovS1szMyA2NSAwIFIgXQo+PgplbmRvYmoKCjY3IDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9QCi9QIDY2IDAgUgovUGcgMSAwIFIKPj4KZW5kb2JqCgoyOTMgMCBvYmoKPDwvTy9MYXlvdXQKL1BsYWNlbWVudC9JbmxpbmUKPj4KZW5kb2JqCgo2NiAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvVEQKL1AgNjEgMCBSCi9QZyAxIDAgUgovQSAyOTMgMCBSCi9LWzM0IDY3IDAgUiBdCj4+CmVuZG9iagoKMjk0IDAgb2JqCjw8L08vTGF5b3V0Ci9QbGFjZW1lbnQvQmxvY2sKPj4KZW5kb2JqCgo2MSAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvVFIKL1AgNCAwIFIKL1BnIDEgMCBSCi9BIDI5NCAwIFIKL0tbNjIgMCBSIDY0IDAgUiA2NiAwIFIgXQo+PgplbmRvYmoKCjcwIDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9QCi9QIDY5IDAgUgovUGcgMSAwIFIKL0tbMzYgXQo+PgplbmRvYmoKCjI5NSAwIG9iago8PC9PL0xheW91dAovUGxhY2VtZW50L0lubGluZQo+PgplbmRvYmoKCjY5IDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9URAovUCA2OCAwIFIKL1BnIDEgMCBSCi9BIDI5NSAwIFIKL0tbMzUgNzAgMCBSIF0KPj4KZW5kb2JqCgo3MiAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvUAovUCA3MSAwIFIKL1BnIDEgMCBSCj4+CmVuZG9iagoKMjk2IDAgb2JqCjw8L08vTGF5b3V0Ci9QbGFjZW1lbnQvSW5saW5lCj4+CmVuZG9iagoKNzEgMCBvYmoKPDwvVHlwZS9TdHJ1Y3RFbGVtCi9TL1RECi9QIDY4IDAgUgovUGcgMSAwIFIKL0EgMjk2IDAgUgovS1szNyA3MiAwIFIgXQo+PgplbmRvYmoKCjc0IDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9QCi9QIDczIDAgUgovUGcgMSAwIFIKPj4KZW5kb2JqCgoyOTcgMCBvYmoKPDwvTy9MYXlvdXQKL1BsYWNlbWVudC9JbmxpbmUKPj4KZW5kb2JqCgo3MyAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvVEQKL1AgNjggMCBSCi9QZyAxIDAgUgovQSAyOTcgMCBSCi9LWzM4IDc0IDAgUiBdCj4+CmVuZG9iagoKMjk4IDAgb2JqCjw8L08vTGF5b3V0Ci9QbGFjZW1lbnQvQmxvY2sKPj4KZW5kb2JqCgo2OCAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvVFIKL1AgNCAwIFIKL1BnIDEgMCBSCi9BIDI5OCAwIFIKL0tbNjkgMCBSIDcxIDAgUiA3MyAwIFIgXQo+PgplbmRvYmoKCjc3IDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9QCi9QIDc2IDAgUgovUGcgMSAwIFIKL0tbNDAgXQo+PgplbmRvYmoKCjI5OSAwIG9iago8PC9PL0xheW91dAovUGxhY2VtZW50L0lubGluZQo+PgplbmRvYmoKCjc2IDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9URAovUCA3NSAwIFIKL1BnIDEgMCBSCi9BIDI5OSAwIFIKL0tbMzkgNzcgMCBSIF0KPj4KZW5kb2JqCgo3OSAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvUAovUCA3OCAwIFIKL1BnIDEgMCBSCj4+CmVuZG9iagoKMzAwIDAgb2JqCjw8L08vTGF5b3V0Ci9QbGFjZW1lbnQvSW5saW5lCj4+CmVuZG9iagoKNzggMCBvYmoKPDwvVHlwZS9TdHJ1Y3RFbGVtCi9TL1RECi9QIDc1IDAgUgovUGcgMSAwIFIKL0EgMzAwIDAgUgovS1s0MSA3OSAwIFIgXQo+PgplbmRvYmoKCjgxIDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9QCi9QIDgwIDAgUgovUGcgMSAwIFIKPj4KZW5kb2JqCgozMDEgMCBvYmoKPDwvTy9MYXlvdXQKL1BsYWNlbWVudC9JbmxpbmUKPj4KZW5kb2JqCgo4MCAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvVEQKL1AgNzUgMCBSCi9QZyAxIDAgUgovQSAzMDEgMCBSCi9LWzQyIDgxIDAgUiBdCj4+CmVuZG9iagoKMzAyIDAgb2JqCjw8L08vTGF5b3V0Ci9QbGFjZW1lbnQvQmxvY2sKPj4KZW5kb2JqCgo3NSAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvVFIKL1AgNCAwIFIKL1BnIDEgMCBSCi9BIDMwMiAwIFIKL0tbNzYgMCBSIDc4IDAgUiA4MCAwIFIgXQo+PgplbmRvYmoKCjg0IDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9QCi9QIDgzIDAgUgovUGcgMSAwIFIKL0tbNDQgXQo+PgplbmRvYmoKCjMwMyAwIG9iago8PC9PL0xheW91dAovUGxhY2VtZW50L0lubGluZQo+PgplbmRvYmoKCjgzIDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9URAovUCA4MiAwIFIKL1BnIDEgMCBSCi9BIDMwMyAwIFIKL0tbNDMgODQgMCBSIF0KPj4KZW5kb2JqCgo4NiAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvUAovUCA4NSAwIFIKL1BnIDEgMCBSCj4+CmVuZG9iagoKMzA0IDAgb2JqCjw8L08vTGF5b3V0Ci9QbGFjZW1lbnQvSW5saW5lCj4+CmVuZG9iagoKODUgMCBvYmoKPDwvVHlwZS9TdHJ1Y3RFbGVtCi9TL1RECi9QIDgyIDAgUgovUGcgMSAwIFIKL0EgMzA0IDAgUgovS1s0NSA4NiAwIFIgXQo+PgplbmRvYmoKCjg4IDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9QCi9QIDg3IDAgUgovUGcgMSAwIFIKPj4KZW5kb2JqCgozMDUgMCBvYmoKPDwvTy9MYXlvdXQKL1BsYWNlbWVudC9JbmxpbmUKPj4KZW5kb2JqCgo4NyAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvVEQKL1AgODIgMCBSCi9QZyAxIDAgUgovQSAzMDUgMCBSCi9LWzQ2IDg4IDAgUiBdCj4+CmVuZG9iagoKMzA2IDAgb2JqCjw8L08vTGF5b3V0Ci9QbGFjZW1lbnQvQmxvY2sKPj4KZW5kb2JqCgo4MiAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvVFIKL1AgNCAwIFIKL1BnIDEgMCBSCi9BIDMwNiAwIFIKL0tbODMgMCBSIDg1IDAgUiA4NyAwIFIgXQo+PgplbmRvYmoKCjkxIDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9QCi9QIDkwIDAgUgovUGcgMSAwIFIKL0tbNDggXQo+PgplbmRvYmoKCjMwNyAwIG9iago8PC9PL0xheW91dAovUGxhY2VtZW50L0lubGluZQo+PgplbmRvYmoKCjkwIDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9URAovUCA4OSAwIFIKL1BnIDEgMCBSCi9BIDMwNyAwIFIKL0tbNDcgOTEgMCBSIF0KPj4KZW5kb2JqCgo5MyAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvUAovUCA5MiAwIFIKL1BnIDEgMCBSCj4+CmVuZG9iagoKMzA4IDAgb2JqCjw8L08vTGF5b3V0Ci9QbGFjZW1lbnQvSW5saW5lCj4+CmVuZG9iagoKOTIgMCBvYmoKPDwvVHlwZS9TdHJ1Y3RFbGVtCi9TL1RECi9QIDg5IDAgUgovUGcgMSAwIFIKL0EgMzA4IDAgUgovS1s0OSA5MyAwIFIgXQo+PgplbmRvYmoKCjk1IDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9QCi9QIDk0IDAgUgovUGcgMSAwIFIKPj4KZW5kb2JqCgozMDkgMCBvYmoKPDwvTy9MYXlvdXQKL1BsYWNlbWVudC9JbmxpbmUKPj4KZW5kb2JqCgo5NCAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvVEQKL1AgODkgMCBSCi9QZyAxIDAgUgovQSAzMDkgMCBSCi9LWzUwIDk1IDAgUiBdCj4+CmVuZG9iagoKMzEwIDAgb2JqCjw8L08vTGF5b3V0Ci9QbGFjZW1lbnQvQmxvY2sKPj4KZW5kb2JqCgo4OSAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvVFIKL1AgNCAwIFIKL1BnIDEgMCBSCi9BIDMxMCAwIFIKL0tbOTAgMCBSIDkyIDAgUiA5NCAwIFIgXQo+PgplbmRvYmoKCjk4IDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9QCi9QIDk3IDAgUgovUGcgMSAwIFIKPj4KZW5kb2JqCgozMTEgMCBvYmoKPDwvTy9MYXlvdXQKL1BsYWNlbWVudC9JbmxpbmUKPj4KZW5kb2JqCgo5NyAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvVEQKL1AgOTYgMCBSCi9QZyAxIDAgUgovQSAzMTEgMCBSCi9LWzUxIDk4IDAgUiBdCj4+CmVuZG9iagoKMTAwIDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9QCi9QIDk5IDAgUgovUGcgMSAwIFIKPj4KZW5kb2JqCgozMTIgMCBvYmoKPDwvTy9MYXlvdXQKL1BsYWNlbWVudC9JbmxpbmUKPj4KZW5kb2JqCgo5OSAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvVEQKL1AgOTYgMCBSCi9QZyAxIDAgUgovQSAzMTIgMCBSCi9LWzUyIDEwMCAwIFIgXQo+PgplbmRvYmoKCjEwMiAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvUAovUCAxMDEgMCBSCi9QZyAxIDAgUgo+PgplbmRvYmoKCjMxMyAwIG9iago8PC9PL0xheW91dAovUGxhY2VtZW50L0lubGluZQo+PgplbmRvYmoKCjEwMSAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvVEQKL1AgOTYgMCBSCi9QZyAxIDAgUgovQSAzMTMgMCBSCi9LWzUzIDEwMiAwIFIgXQo+PgplbmRvYmoKCjMxNCAwIG9iago8PC9PL0xheW91dAovUGxhY2VtZW50L0Jsb2NrCj4+CmVuZG9iagoKOTYgMCBvYmoKPDwvVHlwZS9TdHJ1Y3RFbGVtCi9TL1RSCi9QIDQgMCBSCi9QZyAxIDAgUgovQSAzMTQgMCBSCi9LWzk3IDAgUiA5OSAwIFIgMTAxIDAgUiBdCj4+CmVuZG9iagoKMTA1IDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9QCi9QIDEwNCAwIFIKL1BnIDEgMCBSCi9LWzU1IF0KPj4KZW5kb2JqCgozMTUgMCBvYmoKPDwvTy9MYXlvdXQKL1BsYWNlbWVudC9JbmxpbmUKPj4KZW5kb2JqCgoxMDQgMCBvYmoKPDwvVHlwZS9TdHJ1Y3RFbGVtCi9TL1RECi9QIDEwMyAwIFIKL1BnIDEgMCBSCi9BIDMxNSAwIFIKL0tbNTQgMTA1IDAgUiBdCj4+CmVuZG9iagoKMTA3IDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9QCi9QIDEwNiAwIFIKL1BnIDEgMCBSCj4+CmVuZG9iagoKMzE2IDAgb2JqCjw8L08vTGF5b3V0Ci9QbGFjZW1lbnQvSW5saW5lCj4+CmVuZG9iagoKMTA2IDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9URAovUCAxMDMgMCBSCi9QZyAxIDAgUgovQSAzMTYgMCBSCi9LWzU2IDEwNyAwIFIgXQo+PgplbmRvYmoKCjEwOSAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvUAovUCAxMDggMCBSCi9QZyAxIDAgUgo+PgplbmRvYmoKCjMxNyAwIG9iago8PC9PL0xheW91dAovUGxhY2VtZW50L0lubGluZQo+PgplbmRvYmoKCjEwOCAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvVEQKL1AgMTAzIDAgUgovUGcgMSAwIFIKL0EgMzE3IDAgUgovS1s1NyAxMDkgMCBSIF0KPj4KZW5kb2JqCgozMTggMCBvYmoKPDwvTy9MYXlvdXQKL1BsYWNlbWVudC9CbG9jawo+PgplbmRvYmoKCjEwMyAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvVFIKL1AgNCAwIFIKL1BnIDEgMCBSCi9BIDMxOCAwIFIKL0tbMTA0IDAgUiAxMDYgMCBSIDEwOCAwIFIgXQo+PgplbmRvYmoKCjExMiAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvUAovUCAxMTEgMCBSCi9QZyAxIDAgUgo+PgplbmRvYmoKCjMxOSAwIG9iago8PC9PL0xheW91dAovUGxhY2VtZW50L0lubGluZQo+PgplbmRvYmoKCjExMSAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvVEQKL1AgMTEwIDAgUgovUGcgMSAwIFIKL0EgMzE5IDAgUgovS1s1OCAxMTIgMCBSIF0KPj4KZW5kb2JqCgoxMTQgMCBvYmoKPDwvVHlwZS9TdHJ1Y3RFbGVtCi9TL1AKL1AgMTEzIDAgUgovUGcgMSAwIFIKPj4KZW5kb2JqCgozMjAgMCBvYmoKPDwvTy9MYXlvdXQKL1BsYWNlbWVudC9JbmxpbmUKPj4KZW5kb2JqCgoxMTMgMCBvYmoKPDwvVHlwZS9TdHJ1Y3RFbGVtCi9TL1RECi9QIDExMCAwIFIKL1BnIDEgMCBSCi9BIDMyMCAwIFIKL0tbNTkgMTE0IDAgUiBdCj4+CmVuZG9iagoKMTE2IDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9QCi9QIDExNSAwIFIKL1BnIDEgMCBSCj4+CmVuZG9iagoKMzIxIDAgb2JqCjw8L08vTGF5b3V0Ci9QbGFjZW1lbnQvSW5saW5lCj4+CmVuZG9iagoKMTE1IDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9URAovUCAxMTAgMCBSCi9QZyAxIDAgUgovQSAzMjEgMCBSCi9LWzYwIDExNiAwIFIgXQo+PgplbmRvYmoKCjMyMiAwIG9iago8PC9PL0xheW91dAovUGxhY2VtZW50L0Jsb2NrCj4+CmVuZG9iagoKMTEwIDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9UUgovUCA0IDAgUgovUGcgMSAwIFIKL0EgMzIyIDAgUgovS1sxMTEgMCBSIDExMyAwIFIgMTE1IDAgUiBdCj4+CmVuZG9iagoKMTE5IDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9QCi9QIDExOCAwIFIKL1BnIDEgMCBSCj4+CmVuZG9iagoKMzIzIDAgb2JqCjw8L08vTGF5b3V0Ci9QbGFjZW1lbnQvSW5saW5lCj4+CmVuZG9iagoKMTE4IDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9URAovUCAxMTcgMCBSCi9QZyAxIDAgUgovQSAzMjMgMCBSCi9LWzYxIDExOSAwIFIgXQo+PgplbmRvYmoKCjEyMSAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvUAovUCAxMjAgMCBSCi9QZyAxIDAgUgo+PgplbmRvYmoKCjMyNCAwIG9iago8PC9PL0xheW91dAovUGxhY2VtZW50L0lubGluZQo+PgplbmRvYmoKCjEyMCAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvVEQKL1AgMTE3IDAgUgovUGcgMSAwIFIKL0EgMzI0IDAgUgovS1s2MiAxMjEgMCBSIF0KPj4KZW5kb2JqCgoxMjMgMCBvYmoKPDwvVHlwZS9TdHJ1Y3RFbGVtCi9TL1AKL1AgMTIyIDAgUgovUGcgMSAwIFIKPj4KZW5kb2JqCgozMjUgMCBvYmoKPDwvTy9MYXlvdXQKL1BsYWNlbWVudC9JbmxpbmUKPj4KZW5kb2JqCgoxMjIgMCBvYmoKPDwvVHlwZS9TdHJ1Y3RFbGVtCi9TL1RECi9QIDExNyAwIFIKL1BnIDEgMCBSCi9BIDMyNSAwIFIKL0tbNjMgMTIzIDAgUiBdCj4+CmVuZG9iagoKMzI2IDAgb2JqCjw8L08vTGF5b3V0Ci9QbGFjZW1lbnQvQmxvY2sKPj4KZW5kb2JqCgoxMTcgMCBvYmoKPDwvVHlwZS9TdHJ1Y3RFbGVtCi9TL1RSCi9QIDQgMCBSCi9QZyAxIDAgUgovQSAzMjYgMCBSCi9LWzExOCAwIFIgMTIwIDAgUiAxMjIgMCBSIF0KPj4KZW5kb2JqCgoxMjYgMCBvYmoKPDwvVHlwZS9TdHJ1Y3RFbGVtCi9TL1AKL1AgMTI1IDAgUgovUGcgMSAwIFIKL0tbNjUgXQo+PgplbmRvYmoKCjMyNyAwIG9iago8PC9PL0xheW91dAovUGxhY2VtZW50L0lubGluZQo+PgplbmRvYmoKCjEyNSAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvVEQKL1AgMTI0IDAgUgovUGcgMSAwIFIKL0EgMzI3IDAgUgovS1s2NCAxMjYgMCBSIF0KPj4KZW5kb2JqCgoxMjggMCBvYmoKPDwvVHlwZS9TdHJ1Y3RFbGVtCi9TL1AKL1AgMTI3IDAgUgovUGcgMSAwIFIKPj4KZW5kb2JqCgozMjggMCBvYmoKPDwvTy9MYXlvdXQKL1BsYWNlbWVudC9JbmxpbmUKPj4KZW5kb2JqCgoxMjcgMCBvYmoKPDwvVHlwZS9TdHJ1Y3RFbGVtCi9TL1RECi9QIDEyNCAwIFIKL1BnIDEgMCBSCi9BIDMyOCAwIFIKL0tbNjYgMTI4IDAgUiBdCj4+CmVuZG9iagoKMTMwIDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9QCi9QIDEyOSAwIFIKL1BnIDEgMCBSCj4+CmVuZG9iagoKMzI5IDAgb2JqCjw8L08vTGF5b3V0Ci9QbGFjZW1lbnQvSW5saW5lCj4+CmVuZG9iagoKMTI5IDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9URAovUCAxMjQgMCBSCi9QZyAxIDAgUgovQSAzMjkgMCBSCi9LWzY3IDEzMCAwIFIgXQo+PgplbmRvYmoKCjMzMCAwIG9iago8PC9PL0xheW91dAovUGxhY2VtZW50L0Jsb2NrCj4+CmVuZG9iagoKMTI0IDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9UUgovUCA0IDAgUgovUGcgMSAwIFIKL0EgMzMwIDAgUgovS1sxMjUgMCBSIDEyNyAwIFIgMTI5IDAgUiBdCj4+CmVuZG9iagoKMTMzIDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9QCi9QIDEzMiAwIFIKL1BnIDEgMCBSCi9LWzY5IF0KPj4KZW5kb2JqCgozMzEgMCBvYmoKPDwvTy9MYXlvdXQKL1BsYWNlbWVudC9JbmxpbmUKPj4KZW5kb2JqCgoxMzIgMCBvYmoKPDwvVHlwZS9TdHJ1Y3RFbGVtCi9TL1RECi9QIDEzMSAwIFIKL1BnIDEgMCBSCi9BIDMzMSAwIFIKL0tbNjggMTMzIDAgUiBdCj4+CmVuZG9iagoKMTM1IDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9QCi9QIDEzNCAwIFIKL1BnIDEgMCBSCj4+CmVuZG9iagoKMzMyIDAgb2JqCjw8L08vTGF5b3V0Ci9QbGFjZW1lbnQvSW5saW5lCj4+CmVuZG9iagoKMTM0IDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9URAovUCAxMzEgMCBSCi9QZyAxIDAgUgovQSAzMzIgMCBSCi9LWzcwIDEzNSAwIFIgXQo+PgplbmRvYmoKCjEzNyAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvUAovUCAxMzYgMCBSCi9QZyAxIDAgUgo+PgplbmRvYmoKCjMzMyAwIG9iago8PC9PL0xheW91dAovUGxhY2VtZW50L0lubGluZQo+PgplbmRvYmoKCjEzNiAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvVEQKL1AgMTMxIDAgUgovUGcgMSAwIFIKL0EgMzMzIDAgUgovS1s3MSAxMzcgMCBSIF0KPj4KZW5kb2JqCgozMzQgMCBvYmoKPDwvTy9MYXlvdXQKL1BsYWNlbWVudC9CbG9jawo+PgplbmRvYmoKCjEzMSAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvVFIKL1AgNCAwIFIKL1BnIDEgMCBSCi9BIDMzNCAwIFIKL0tbMTMyIDAgUiAxMzQgMCBSIDEzNiAwIFIgXQo+PgplbmRvYmoKCjE0MCAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvUAovUCAxMzkgMCBSCi9QZyAxIDAgUgovS1s3MyBdCj4+CmVuZG9iagoKMzM1IDAgb2JqCjw8L08vTGF5b3V0Ci9QbGFjZW1lbnQvSW5saW5lCj4+CmVuZG9iagoKMTM5IDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9URAovUCAxMzggMCBSCi9QZyAxIDAgUgovQSAzMzUgMCBSCi9LWzcyIDE0MCAwIFIgXQo+PgplbmRvYmoKCjE0MiAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvUAovUCAxNDEgMCBSCi9QZyAxIDAgUgo+PgplbmRvYmoKCjMzNiAwIG9iago8PC9PL0xheW91dAovUGxhY2VtZW50L0lubGluZQo+PgplbmRvYmoKCjE0MSAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvVEQKL1AgMTM4IDAgUgovUGcgMSAwIFIKL0EgMzM2IDAgUgovS1s3NCAxNDIgMCBSIF0KPj4KZW5kb2JqCgoxNDQgMCBvYmoKPDwvVHlwZS9TdHJ1Y3RFbGVtCi9TL1AKL1AgMTQzIDAgUgovUGcgMSAwIFIKPj4KZW5kb2JqCgozMzcgMCBvYmoKPDwvTy9MYXlvdXQKL1BsYWNlbWVudC9JbmxpbmUKPj4KZW5kb2JqCgoxNDMgMCBvYmoKPDwvVHlwZS9TdHJ1Y3RFbGVtCi9TL1RECi9QIDEzOCAwIFIKL1BnIDEgMCBSCi9BIDMzNyAwIFIKL0tbNzUgMTQ0IDAgUiBdCj4+CmVuZG9iagoKMzM4IDAgb2JqCjw8L08vTGF5b3V0Ci9QbGFjZW1lbnQvQmxvY2sKPj4KZW5kb2JqCgoxMzggMCBvYmoKPDwvVHlwZS9TdHJ1Y3RFbGVtCi9TL1RSCi9QIDQgMCBSCi9QZyAxIDAgUgovQSAzMzggMCBSCi9LWzEzOSAwIFIgMTQxIDAgUiAxNDMgMCBSIF0KPj4KZW5kb2JqCgoxNDcgMCBvYmoKPDwvVHlwZS9TdHJ1Y3RFbGVtCi9TL1AKL1AgMTQ2IDAgUgovUGcgMSAwIFIKL0tbNzcgXQo+PgplbmRvYmoKCjMzOSAwIG9iago8PC9PL0xheW91dAovUGxhY2VtZW50L0lubGluZQo+PgplbmRvYmoKCjE0NiAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvVEQKL1AgMTQ1IDAgUgovUGcgMSAwIFIKL0EgMzM5IDAgUgovS1s3NiAxNDcgMCBSIF0KPj4KZW5kb2JqCgoxNDkgMCBvYmoKPDwvVHlwZS9TdHJ1Y3RFbGVtCi9TL1AKL1AgMTQ4IDAgUgovUGcgMSAwIFIKPj4KZW5kb2JqCgozNDAgMCBvYmoKPDwvTy9MYXlvdXQKL1BsYWNlbWVudC9JbmxpbmUKPj4KZW5kb2JqCgoxNDggMCBvYmoKPDwvVHlwZS9TdHJ1Y3RFbGVtCi9TL1RECi9QIDE0NSAwIFIKL1BnIDEgMCBSCi9BIDM0MCAwIFIKL0tbNzggMTQ5IDAgUiBdCj4+CmVuZG9iagoKMTUxIDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9QCi9QIDE1MCAwIFIKL1BnIDEgMCBSCj4+CmVuZG9iagoKMzQxIDAgb2JqCjw8L08vTGF5b3V0Ci9QbGFjZW1lbnQvSW5saW5lCj4+CmVuZG9iagoKMTUwIDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9URAovUCAxNDUgMCBSCi9QZyAxIDAgUgovQSAzNDEgMCBSCi9LWzc5IDE1MSAwIFIgXQo+PgplbmRvYmoKCjM0MiAwIG9iago8PC9PL0xheW91dAovUGxhY2VtZW50L0Jsb2NrCj4+CmVuZG9iagoKMTQ1IDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9UUgovUCA0IDAgUgovUGcgMSAwIFIKL0EgMzQyIDAgUgovS1sxNDYgMCBSIDE0OCAwIFIgMTUwIDAgUiBdCj4+CmVuZG9iagoKMTU0IDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9QCi9QIDE1MyAwIFIKL1BnIDEgMCBSCi9LWzgxIF0KPj4KZW5kb2JqCgozNDMgMCBvYmoKPDwvTy9MYXlvdXQKL1BsYWNlbWVudC9JbmxpbmUKPj4KZW5kb2JqCgoxNTMgMCBvYmoKPDwvVHlwZS9TdHJ1Y3RFbGVtCi9TL1RECi9QIDE1MiAwIFIKL1BnIDEgMCBSCi9BIDM0MyAwIFIKL0tbODAgMTU0IDAgUiBdCj4+CmVuZG9iagoKMTU2IDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9QCi9QIDE1NSAwIFIKL1BnIDEgMCBSCj4+CmVuZG9iagoKMzQ0IDAgb2JqCjw8L08vTGF5b3V0Ci9QbGFjZW1lbnQvSW5saW5lCj4+CmVuZG9iagoKMTU1IDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9URAovUCAxNTIgMCBSCi9QZyAxIDAgUgovQSAzNDQgMCBSCi9LWzgyIDE1NiAwIFIgXQo+PgplbmRvYmoKCjE1OCAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvUAovUCAxNTcgMCBSCi9QZyAxIDAgUgo+PgplbmRvYmoKCjM0NSAwIG9iago8PC9PL0xheW91dAovUGxhY2VtZW50L0lubGluZQo+PgplbmRvYmoKCjE1NyAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvVEQKL1AgMTUyIDAgUgovUGcgMSAwIFIKL0EgMzQ1IDAgUgovS1s4MyAxNTggMCBSIF0KPj4KZW5kb2JqCgozNDYgMCBvYmoKPDwvTy9MYXlvdXQKL1BsYWNlbWVudC9CbG9jawo+PgplbmRvYmoKCjE1MiAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvVFIKL1AgNCAwIFIKL1BnIDEgMCBSCi9BIDM0NiAwIFIKL0tbMTUzIDAgUiAxNTUgMCBSIDE1NyAwIFIgXQo+PgplbmRvYmoKCjE2MSAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvUAovUCAxNjAgMCBSCi9QZyAxIDAgUgovS1s4NSBdCj4+CmVuZG9iagoKMzQ3IDAgb2JqCjw8L08vTGF5b3V0Ci9QbGFjZW1lbnQvSW5saW5lCj4+CmVuZG9iagoKMTYwIDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9URAovUCAxNTkgMCBSCi9QZyAxIDAgUgovQSAzNDcgMCBSCi9LWzg0IDE2MSAwIFIgXQo+PgplbmRvYmoKCjE2MyAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvUAovUCAxNjIgMCBSCi9QZyAxIDAgUgo+PgplbmRvYmoKCjM0OCAwIG9iago8PC9PL0xheW91dAovUGxhY2VtZW50L0lubGluZQo+PgplbmRvYmoKCjE2MiAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvVEQKL1AgMTU5IDAgUgovUGcgMSAwIFIKL0EgMzQ4IDAgUgovS1s4NiAxNjMgMCBSIF0KPj4KZW5kb2JqCgoxNjUgMCBvYmoKPDwvVHlwZS9TdHJ1Y3RFbGVtCi9TL1AKL1AgMTY0IDAgUgovUGcgMSAwIFIKPj4KZW5kb2JqCgozNDkgMCBvYmoKPDwvTy9MYXlvdXQKL1BsYWNlbWVudC9JbmxpbmUKPj4KZW5kb2JqCgoxNjQgMCBvYmoKPDwvVHlwZS9TdHJ1Y3RFbGVtCi9TL1RECi9QIDE1OSAwIFIKL1BnIDEgMCBSCi9BIDM0OSAwIFIKL0tbODcgMTY1IDAgUiBdCj4+CmVuZG9iagoKMzUwIDAgb2JqCjw8L08vTGF5b3V0Ci9QbGFjZW1lbnQvQmxvY2sKPj4KZW5kb2JqCgoxNTkgMCBvYmoKPDwvVHlwZS9TdHJ1Y3RFbGVtCi9TL1RSCi9QIDQgMCBSCi9QZyAxIDAgUgovQSAzNTAgMCBSCi9LWzE2MCAwIFIgMTYyIDAgUiAxNjQgMCBSIF0KPj4KZW5kb2JqCgoxNjggMCBvYmoKPDwvVHlwZS9TdHJ1Y3RFbGVtCi9TL1AKL1AgMTY3IDAgUgovUGcgMSAwIFIKPj4KZW5kb2JqCgozNTEgMCBvYmoKPDwvTy9MYXlvdXQKL1BsYWNlbWVudC9JbmxpbmUKPj4KZW5kb2JqCgoxNjcgMCBvYmoKPDwvVHlwZS9TdHJ1Y3RFbGVtCi9TL1RECi9QIDE2NiAwIFIKL1BnIDEgMCBSCi9BIDM1MSAwIFIKL0tbODggMTY4IDAgUiBdCj4+CmVuZG9iagoKMTcwIDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9QCi9QIDE2OSAwIFIKL1BnIDEgMCBSCj4+CmVuZG9iagoKMzUyIDAgb2JqCjw8L08vTGF5b3V0Ci9QbGFjZW1lbnQvSW5saW5lCj4+CmVuZG9iagoKMTY5IDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9URAovUCAxNjYgMCBSCi9QZyAxIDAgUgovQSAzNTIgMCBSCi9LWzg5IDE3MCAwIFIgXQo+PgplbmRvYmoKCjE3MiAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvUAovUCAxNzEgMCBSCi9QZyAxIDAgUgo+PgplbmRvYmoKCjM1MyAwIG9iago8PC9PL0xheW91dAovUGxhY2VtZW50L0lubGluZQo+PgplbmRvYmoKCjE3MSAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvVEQKL1AgMTY2IDAgUgovUGcgMSAwIFIKL0EgMzUzIDAgUgovS1s5MCAxNzIgMCBSIF0KPj4KZW5kb2JqCgozNTQgMCBvYmoKPDwvTy9MYXlvdXQKL1BsYWNlbWVudC9CbG9jawo+PgplbmRvYmoKCjE2NiAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvVFIKL1AgNCAwIFIKL1BnIDEgMCBSCi9BIDM1NCAwIFIKL0tbMTY3IDAgUiAxNjkgMCBSIDE3MSAwIFIgXQo+PgplbmRvYmoKCjE3NSAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvUAovUCAxNzQgMCBSCi9QZyAxIDAgUgovS1s5MiBdCj4+CmVuZG9iagoKMzU1IDAgb2JqCjw8L08vTGF5b3V0Ci9QbGFjZW1lbnQvSW5saW5lCj4+CmVuZG9iagoKMTc0IDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9URAovUCAxNzMgMCBSCi9QZyAxIDAgUgovQSAzNTUgMCBSCi9LWzkxIDE3NSAwIFIgXQo+PgplbmRvYmoKCjE3NyAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvUAovUCAxNzYgMCBSCi9QZyAxIDAgUgo+PgplbmRvYmoKCjM1NiAwIG9iago8PC9PL0xheW91dAovUGxhY2VtZW50L0lubGluZQo+PgplbmRvYmoKCjE3NiAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvVEQKL1AgMTczIDAgUgovUGcgMSAwIFIKL0EgMzU2IDAgUgovS1s5MyAxNzcgMCBSIF0KPj4KZW5kb2JqCgoxNzkgMCBvYmoKPDwvVHlwZS9TdHJ1Y3RFbGVtCi9TL1AKL1AgMTc4IDAgUgovUGcgMSAwIFIKPj4KZW5kb2JqCgozNTcgMCBvYmoKPDwvTy9MYXlvdXQKL1BsYWNlbWVudC9JbmxpbmUKPj4KZW5kb2JqCgoxNzggMCBvYmoKPDwvVHlwZS9TdHJ1Y3RFbGVtCi9TL1RECi9QIDE3MyAwIFIKL1BnIDEgMCBSCi9BIDM1NyAwIFIKL0tbOTQgMTc5IDAgUiBdCj4+CmVuZG9iagoKMzU4IDAgb2JqCjw8L08vTGF5b3V0Ci9QbGFjZW1lbnQvQmxvY2sKPj4KZW5kb2JqCgoxNzMgMCBvYmoKPDwvVHlwZS9TdHJ1Y3RFbGVtCi9TL1RSCi9QIDQgMCBSCi9QZyAxIDAgUgovQSAzNTggMCBSCi9LWzE3NCAwIFIgMTc2IDAgUiAxNzggMCBSIF0KPj4KZW5kb2JqCgoxODIgMCBvYmoKPDwvVHlwZS9TdHJ1Y3RFbGVtCi9TL1AKL1AgMTgxIDAgUgovUGcgMSAwIFIKL0tbOTYgXQo+PgplbmRvYmoKCjM1OSAwIG9iago8PC9PL0xheW91dAovUGxhY2VtZW50L0lubGluZQo+PgplbmRvYmoKCjE4MSAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvVEQKL1AgMTgwIDAgUgovUGcgMSAwIFIKL0EgMzU5IDAgUgovS1s5NSAxODIgMCBSIF0KPj4KZW5kb2JqCgoxODQgMCBvYmoKPDwvVHlwZS9TdHJ1Y3RFbGVtCi9TL1AKL1AgMTgzIDAgUgovUGcgMSAwIFIKPj4KZW5kb2JqCgozNjAgMCBvYmoKPDwvTy9MYXlvdXQKL1BsYWNlbWVudC9JbmxpbmUKPj4KZW5kb2JqCgoxODMgMCBvYmoKPDwvVHlwZS9TdHJ1Y3RFbGVtCi9TL1RECi9QIDE4MCAwIFIKL1BnIDEgMCBSCi9BIDM2MCAwIFIKL0tbOTcgMTg0IDAgUiBdCj4+CmVuZG9iagoKMTg2IDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9QCi9QIDE4NSAwIFIKL1BnIDEgMCBSCj4+CmVuZG9iagoKMzYxIDAgb2JqCjw8L08vTGF5b3V0Ci9QbGFjZW1lbnQvSW5saW5lCj4+CmVuZG9iagoKMTg1IDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9URAovUCAxODAgMCBSCi9QZyAxIDAgUgovQSAzNjEgMCBSCi9LWzk4IDE4NiAwIFIgXQo+PgplbmRvYmoKCjM2MiAwIG9iago8PC9PL0xheW91dAovUGxhY2VtZW50L0Jsb2NrCj4+CmVuZG9iagoKMTgwIDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9UUgovUCA0IDAgUgovUGcgMSAwIFIKL0EgMzYyIDAgUgovS1sxODEgMCBSIDE4MyAwIFIgMTg1IDAgUiBdCj4+CmVuZG9iagoKMTg5IDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9QCi9QIDE4OCAwIFIKL1BnIDEgMCBSCi9LWzEwMCBdCj4+CmVuZG9iagoKMzYzIDAgb2JqCjw8L08vTGF5b3V0Ci9QbGFjZW1lbnQvSW5saW5lCj4+CmVuZG9iagoKMTg4IDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9URAovUCAxODcgMCBSCi9QZyAxIDAgUgovQSAzNjMgMCBSCi9LWzk5IDE4OSAwIFIgXQo+PgplbmRvYmoKCjE5MSAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvUAovUCAxOTAgMCBSCi9QZyAxIDAgUgo+PgplbmRvYmoKCjM2NCAwIG9iago8PC9PL0xheW91dAovUGxhY2VtZW50L0lubGluZQo+PgplbmRvYmoKCjE5MCAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvVEQKL1AgMTg3IDAgUgovUGcgMSAwIFIKL0EgMzY0IDAgUgovS1sxMDEgMTkxIDAgUiBdCj4+CmVuZG9iagoKMTkzIDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9QCi9QIDE5MiAwIFIKL1BnIDEgMCBSCj4+CmVuZG9iagoKMzY1IDAgb2JqCjw8L08vTGF5b3V0Ci9QbGFjZW1lbnQvSW5saW5lCj4+CmVuZG9iagoKMTkyIDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9URAovUCAxODcgMCBSCi9QZyAxIDAgUgovQSAzNjUgMCBSCi9LWzEwMiAxOTMgMCBSIF0KPj4KZW5kb2JqCgozNjYgMCBvYmoKPDwvTy9MYXlvdXQKL1BsYWNlbWVudC9CbG9jawo+PgplbmRvYmoKCjE4NyAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvVFIKL1AgNCAwIFIKL1BnIDEgMCBSCi9BIDM2NiAwIFIKL0tbMTg4IDAgUiAxOTAgMCBSIDE5MiAwIFIgXQo+PgplbmRvYmoKCjE5NiAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvUAovUCAxOTUgMCBSCi9QZyAxIDAgUgo+PgplbmRvYmoKCjM2NyAwIG9iago8PC9PL0xheW91dAovUGxhY2VtZW50L0lubGluZQo+PgplbmRvYmoKCjE5NSAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvVEQKL1AgMTk0IDAgUgovUGcgMSAwIFIKL0EgMzY3IDAgUgovS1sxMDMgMTk2IDAgUiBdCj4+CmVuZG9iagoKMTk4IDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9QCi9QIDE5NyAwIFIKL1BnIDEgMCBSCj4+CmVuZG9iagoKMzY4IDAgb2JqCjw8L08vTGF5b3V0Ci9QbGFjZW1lbnQvSW5saW5lCj4+CmVuZG9iagoKMTk3IDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9URAovUCAxOTQgMCBSCi9QZyAxIDAgUgovQSAzNjggMCBSCi9LWzEwNCAxOTggMCBSIF0KPj4KZW5kb2JqCgoyMDAgMCBvYmoKPDwvVHlwZS9TdHJ1Y3RFbGVtCi9TL1AKL1AgMTk5IDAgUgovUGcgMSAwIFIKPj4KZW5kb2JqCgozNjkgMCBvYmoKPDwvTy9MYXlvdXQKL1BsYWNlbWVudC9JbmxpbmUKPj4KZW5kb2JqCgoxOTkgMCBvYmoKPDwvVHlwZS9TdHJ1Y3RFbGVtCi9TL1RECi9QIDE5NCAwIFIKL1BnIDEgMCBSCi9BIDM2OSAwIFIKL0tbMTA1IDIwMCAwIFIgXQo+PgplbmRvYmoKCjM3MCAwIG9iago8PC9PL0xheW91dAovUGxhY2VtZW50L0Jsb2NrCj4+CmVuZG9iagoKMTk0IDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9UUgovUCA0IDAgUgovUGcgMSAwIFIKL0EgMzcwIDAgUgovS1sxOTUgMCBSIDE5NyAwIFIgMTk5IDAgUiBdCj4+CmVuZG9iagoKMzcxIDAgb2JqCjw8L08vTGF5b3V0Ci9QbGFjZW1lbnQvQmxvY2sKL0JCb3hbMTM5LjI2NiAxNDguMTEgNDY4LjM5NyA2NzYuNjNdCj4+CmVuZG9iagoKNCAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvVGFibGUKL1AgMjU1IDAgUgovUGcgMSAwIFIKL0EgMzcxIDAgUgovS1s1IDAgUiAxMiAwIFIgMTkgMCBSIDI2IDAgUiAzMyAwIFIgNDAgMCBSIDQ3IDAgUiA1NCAwIFIgNjEgMCBSIDY4IDAgUiA3NSAwIFIgODIgMCBSIDg5IDAgUiA5NiAwIFIgMTAzIDAgUiAxMTAgMCBSCjExNyAwIFIgMTI0IDAgUiAxMzEgMCBSIDEzOCAwIFIgMTQ1IDAgUiAxNTIgMCBSIDE1OSAwIFIgMTY2IDAgUiAxNzMgMCBSIDE4MCAwIFIgMTg3IDAgUiAxOTQgMCBSIDEwNiBdCj4+CmVuZG9iagoKMzcyIDAgb2JqCjw8L08vTGF5b3V0Ci9QbGFjZW1lbnQvQmxvY2sKL0JCb3hbMTQyLjQxMyAyMDYuMzkxIDQ2Ny40OSAyMDYuNTMzXQo+PgplbmRvYmoKCjIwMSAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvRmlndXJlCi9QIDI1NSAwIFIKL1BnIDEgMCBSCi9BIDM3MiAwIFIKL0tbMTA3IF0KPj4KZW5kb2JqCgozNzMgMCBvYmoKPDwvTy9MYXlvdXQKL1BsYWNlbWVudC9CbG9jawovQkJveFsxNDIuODM4IDY1Ny4yNjkgNDY3LjkxNSA2NTcuNDExXQo+PgplbmRvYmoKCjIwMiAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvRmlndXJlCi9QIDI1NSAwIFIKL1BnIDEgMCBSCi9BIDM3MyAwIFIKL0tbMTA4IF0KPj4KZW5kb2JqCgozNzQgMCBvYmoKPDwvTy9MYXlvdXQKL1BsYWNlbWVudC9CbG9jawovQkJveFsxNDMuNTc1IDU2My42NjkgNDY4LjY1MiA1NjMuODExXQo+PgplbmRvYmoKCjIwMyAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvRmlndXJlCi9QIDI1NSAwIFIKL1BnIDEgMCBSCi9BIDM3NCAwIFIKL0tbMTA5IF0KPj4KZW5kb2JqCgozNzUgMCBvYmoKPDwvTy9MYXlvdXQKL1BsYWNlbWVudC9CbG9jawovQkJveFsxNDMuMjA2IDM5OC40MDkgNDY4LjI4MyAzOTguNTUxXQo+PgplbmRvYmoKCjIwNCAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvRmlndXJlCi9QIDI1NSAwIFIKL1BnIDEgMCBSCi9BIDM3NSAwIFIKL0tbMTEwIF0KPj4KZW5kb2JqCgozNzYgMCBvYmoKPDwvTy9MYXlvdXQKL1BsYWNlbWVudC9CbG9jawovQkJveFsxNDMuNTc1IDMzNC42MyA0NjguNjUyIDMzNC43NzJdCj4+CmVuZG9iagoKMjA1IDAgb2JqCjw8L1R5cGUvU3RydWN0RWxlbQovUy9GaWd1cmUKL1AgMjU1IDAgUgovUGcgMSAwIFIKL0EgMzc2IDAgUgovS1sxMTEgXQo+PgplbmRvYmoKCjIwNyAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvUAovUCAyMDYgMCBSCi9QZyAxIDAgUgovS1sxMTIgXQo+PgplbmRvYmoKCjIwNiAwIG9iago8PC9UeXBlL1N0cnVjdEVsZW0KL1MvRGl2Ci9QIDI1NSAwIFIKL1BnIDEgMCBSCi9LWzIwNyAwIFIgXQo+PgplbmRvYmoKCjM3NyAwIG9iago8PC9PL0xheW91dAovUGxhY2VtZW50L0Jsb2NrCi9CQm94WzE0MS4zMDcgMTMwLjYyIDQ2Ni4zODQgMTMwLjc2Ml0KPj4KZW5kb2JqCgoyMDggMCBvYmoKPDwvVHlwZS9TdHJ1Y3RFbGVtCi9TL0ZpZ3VyZQovUCAyNTUgMCBSCi9QZyAxIDAgUgovQSAzNzcgMCBSCi9LWzExMyBdCj4+CmVuZG9iagoKMjU1IDAgb2JqCjw8L1R5cGUvU3RydWN0VHJlZVJvb3QKL1BhcmVudFRyZWUgMzc4IDAgUgovS1s0IDAgUiAyMDEgMCBSIDIwMiAwIFIgMjAzIDAgUiAyMDQgMCBSIDIwNSAwIFIgMjA2IDAgUiAyMDggMCBSIF0KPj4KZW5kb2JqCgozNzggMCBvYmoKPDwvTnVtc1sKMCBbIDYgMCBSIDcgMCBSIDggMCBSIDEwIDAgUiAxMyAwIFIgMTQgMCBSIDE1IDAgUiAxNyAwIFIgMjAgMCBSIDIxIDAgUgoyMiAwIFIgMjQgMCBSIDI3IDAgUiAyOCAwIFIgMjkgMCBSIDMxIDAgUiAzNCAwIFIgMzYgMCBSIDM4IDAgUiA0MSAwIFIKNDIgMCBSIDQzIDAgUiA0NSAwIFIgNDggMCBSIDQ5IDAgUiA1MCAwIFIgNTIgMCBSIDU1IDAgUiA1NiAwIFIgNTcgMCBSCjU5IDAgUiA2MiAwIFIgNjMgMCBSIDY0IDAgUiA2NiAwIFIgNjkgMCBSIDcwIDAgUiA3MSAwIFIgNzMgMCBSIDc2IDAgUgo3NyAwIFIgNzggMCBSIDgwIDAgUiA4MyAwIFIgODQgMCBSIDg1IDAgUiA4NyAwIFIgOTAgMCBSIDkxIDAgUiA5MiAwIFIKOTQgMCBSIDk3IDAgUiA5OSAwIFIgMTAxIDAgUiAxMDQgMCBSIDEwNSAwIFIgMTA2IDAgUiAxMDggMCBSIDExMSAwIFIgMTEzIDAgUgoxMTUgMCBSIDExOCAwIFIgMTIwIDAgUiAxMjIgMCBSIDEyNSAwIFIgMTI2IDAgUiAxMjcgMCBSIDEyOSAwIFIgMTMyIDAgUiAxMzMgMCBSCjEzNCAwIFIgMTM2IDAgUiAxMzkgMCBSIDE0MCAwIFIgMTQxIDAgUiAxNDMgMCBSIDE0NiAwIFIgMTQ3IDAgUiAxNDggMCBSIDE1MCAwIFIKMTUzIDAgUiAxNTQgMCBSIDE1NSAwIFIgMTU3IDAgUiAxNjAgMCBSIDE2MSAwIFIgMTYyIDAgUiAxNjQgMCBSIDE2NyAwIFIgMTY5IDAgUgoxNzEgMCBSIDE3NCAwIFIgMTc1IDAgUiAxNzYgMCBSIDE3OCAwIFIgMTgxIDAgUiAxODIgMCBSIDE4MyAwIFIgMTg1IDAgUiAxODggMCBSCjE4OSAwIFIgMTkwIDAgUiAxOTIgMCBSIDE5NSAwIFIgMTk3IDAgUiAxOTkgMCBSIDQgMCBSIDIwMSAwIFIgMjAyIDAgUiAyMDMgMCBSCjIwNCAwIFIgMjA1IDAgUiAyMDcgMCBSIDIwOCAwIFIgXQpdPj4KZW5kb2JqCgoyMTEgMCBvYmoKPDwvVHlwZS9QYWdlcwovUmVzb3VyY2VzIDI1MSAwIFIKL01lZGlhQm94WyAwIDAgNjEyIDc5MiBdCi9LaWRzWyAxIDAgUiBdCi9Db3VudCAxPj4KZW5kb2JqCgozNzkgMCBvYmoKPDwvVHlwZS9DYXRhbG9nL1BhZ2VzIDIxMSAwIFIKL09wZW5BY3Rpb25bMSAwIFIgL1hZWiBudWxsIG51bGwgMF0KL091dGxpbmVzIDI1MiAwIFIKL1N0cnVjdFRyZWVSb290IDI1NSAwIFIKL0xhbmcoZW4tQ0EpCi9NYXJrSW5mbzw8L01hcmtlZCB0cnVlPj4KL01ldGFkYXRhIDI1NCAwIFI+PgplbmRvYmoKCjM4MCAwIG9iago8PC9DcmVhdG9yPEZFRkYwMDQ0MDA3MjAwNjEwMDc3PgovUHJvZHVjZXI8RkVGRjAwNEMwMDY5MDA2MjAwNzIwMDY1MDA0RjAwNjYwMDY2MDA2OTAwNjMwMDY1MDAyMDAwMzcwMDJFMDAzNT4KL0NyZWF0aW9uRGF0ZShEOjIwMjQwODAyMTQxMjA1LTA0JzAwJyk+PgplbmRvYmoKCnhyZWYKMCAzODEKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDQ4NjM3IDAwMDAwIG4gCjAwMDAwMDAwMTkgMDAwMDAgbiAKMDAwMDAwMjg0MyAwMDAwMCBuIAowMDAwMDc2MTI4IDAwMDAwIG4gCjAwMDAwNTQ3MzkgMDAwMDAgbiAKMDAwMDA1NDA3MCAwMDAwMCBuIAowMDAwMDUzOTA0IDAwMDAwIG4gCjAwMDAwNTQzMjggMDAwMDAgbiAKMDAwMDA1NDE2OSAwMDAwMCBuIAowMDAwMDU0NTg4IDAwMDAwIG4gCjAwMDAwNTQ0MjcgMDAwMDAgbiAKMDAwMDA1NTUwOSAwMDAwMCBuIAowMDAwMDU0OTU5IDAwMDAwIG4gCjAwMDAwNTQ4MzcgMDAwMDAgbiAKMDAwMDA1NTE2NCAwMDAwMCBuIAowMDAwMDU1MDQ5IDAwMDAwIG4gCjAwMDAwNTUzNjkgMDAwMDAgbiAKMDAwMDA1NTI1NCAwMDAwMCBuIAowMDAwMDU2Mjg0IDAwMDAwIG4gCjAwMDAwNTU3MzIgMDAwMDAgbiAKMDAwMDA1NTYxMCAwMDAwMCBuIAowMDAwMDU1OTM3IDAwMDAwIG4gCjAwMDAwNTU4MjIgMDAwMDAgbiAKMDAwMDA1NjE0MyAwMDAwMCBuIAowMDAwMDU2MDI4IDAwMDAwIG4gCjAwMDAwNTcwNjEgMDAwMDAgbiAKMDAwMDA1NjUwOCAwMDAwMCBuIAowMDAwMDU2Mzg1IDAwMDAwIG4gCjAwMDAwNTY3MTQgMDAwMDAgbiAKMDAwMDA1NjU5OSAwMDAwMCBuIAowMDAwMDU2OTIwIDAwMDAwIG4gCjAwMDAwNTY4MDUgMDAwMDAgbiAKMDAwMDA1NzgzMCAwMDAwMCBuIAowMDAwMDU3Mjc3IDAwMDAwIG4gCjAwMDAwNTcxNjIgMDAwMDAgbiAKMDAwMDA1NzQ4MyAwMDAwMCBuIAowMDAwMDU3MzY4IDAwMDAwIG4gCjAwMDAwNTc2ODkgMDAwMDAgbiAKMDAwMDA1NzU3NCAwMDAwMCBuIAowMDAwMDU4NjA3IDAwMDAwIG4gCjAwMDAwNTgwNTQgMDAwMDAgbiAKMDAwMDA1NzkzMSAwMDAwMCBuIAowMDAwMDU4MjYwIDAwMDAwIG4gCjAwMDAwNTgxNDUgMDAwMDAgbiAKMDAwMDA1ODQ2NiAwMDAwMCBuIAowMDAwMDU4MzUxIDAwMDAwIG4gCjAwMDAwNTkzODQgMDAwMDAgbiAKMDAwMDA1ODgzMSAwMDAwMCBuIAowMDAwMDU4NzA4IDAwMDAwIG4gCjAwMDAwNTkwMzcgMDAwMDAgbiAKMDAwMDA1ODkyMiAwMDAwMCBuIAowMDAwMDU5MjQzIDAwMDAwIG4gCjAwMDAwNTkxMjggMDAwMDAgbiAKMDAwMDA2MDE2MSAwMDAwMCBuIAowMDAwMDU5NjA4IDAwMDAwIG4gCjAwMDAwNTk0ODUgMDAwMDAgbiAKMDAwMDA1OTgxNCAwMDAwMCBuIAowMDAwMDU5Njk5IDAwMDAwIG4gCjAwMDAwNjAwMjAgMDAwMDAgbiAKMDAwMDA1OTkwNSAwMDAwMCBuIAowMDAwMDYwOTM4IDAwMDAwIG4gCjAwMDAwNjAzODUgMDAwMDAgbiAKMDAwMDA2MDI2MiAwMDAwMCBuIAowMDAwMDYwNTkxIDAwMDAwIG4gCjAwMDAwNjA0NzYgMDAwMDAgbiAKMDAwMDA2MDc5NyAwMDAwMCBuIAowMDAwMDYwNjgyIDAwMDAwIG4gCjAwMDAwNjE3MTUgMDAwMDAgbiAKMDAwMDA2MTE2MiAwMDAwMCBuIAowMDAwMDYxMDM5IDAwMDAwIG4gCjAwMDAwNjEzNjggMDAwMDAgbiAKMDAwMDA2MTI1MyAwMDAwMCBuIAowMDAwMDYxNTc0IDAwMDAwIG4gCjAwMDAwNjE0NTkgMDAwMDAgbiAKMDAwMDA2MjQ5MiAwMDAwMCBuIAowMDAwMDYxOTM5IDAwMDAwIG4gCjAwMDAwNjE4MTYgMDAwMDAgbiAKMDAwMDA2MjE0NSAwMDAwMCBuIAowMDAwMDYyMDMwIDAwMDAwIG4gCjAwMDAwNjIzNTEgMDAwMDAgbiAKMDAwMDA2MjIzNiAwMDAwMCBuIAowMDAwMDYzMjY5IDAwMDAwIG4gCjAwMDAwNjI3MTYgMDAwMDAgbiAKMDAwMDA2MjU5MyAwMDAwMCBuIAowMDAwMDYyOTIyIDAwMDAwIG4gCjAwMDAwNjI4MDcgMDAwMDAgbiAKMDAwMDA2MzEyOCAwMDAwMCBuIAowMDAwMDYzMDEzIDAwMDAwIG4gCjAwMDAwNjQwNDYgMDAwMDAgbiAKMDAwMDA2MzQ5MyAwMDAwMCBuIAowMDAwMDYzMzcwIDAwMDAwIG4gCjAwMDAwNjM2OTkgMDAwMDAgbiAKMDAwMDA2MzU4NCAwMDAwMCBuIAowMDAwMDYzOTA1IDAwMDAwIG4gCjAwMDAwNjM3OTAgMDAwMDAgbiAKMDAwMDA2NDgyMSAwMDAwMCBuIAowMDAwMDY0MjYyIDAwMDAwIG4gCjAwMDAwNjQxNDcgMDAwMDAgbiAKMDAwMDA2NDQ2OSAwMDAwMCBuIAowMDAwMDY0MzUzIDAwMDAwIG4gCjAwMDAwNjQ2NzggMDAwMDAgbiAKMDAwMDA2NDU2MSAwMDAwMCBuIAowMDAwMDY1NjE0IDAwMDAwIG4gCjAwMDAwNjUwNDggMDAwMDAgbiAKMDAwMDA2NDkyMyAwMDAwMCBuIAowMDAwMDY1MjU5IDAwMDAwIG4gCjAwMDAwNjUxNDIgMDAwMDAgbiAKMDAwMDA2NTQ3MCAwMDAwMCBuIAowMDAwMDY1MzUzIDAwMDAwIG4gCjAwMDAwNjY0MDIgMDAwMDAgbiAKMDAwMDA2NTgzNiAwMDAwMCBuIAowMDAwMDY1NzE5IDAwMDAwIG4gCjAwMDAwNjYwNDcgMDAwMDAgbiAKMDAwMDA2NTkzMCAwMDAwMCBuIAowMDAwMDY2MjU4IDAwMDAwIG4gCjAwMDAwNjYxNDEgMDAwMDAgbiAKMDAwMDA2NzE5MCAwMDAwMCBuIAowMDAwMDY2NjI0IDAwMDAwIG4gCjAwMDAwNjY1MDcgMDAwMDAgbiAKMDAwMDA2NjgzNSAwMDAwMCBuIAowMDAwMDY2NzE4IDAwMDAwIG4gCjAwMDAwNjcwNDYgMDAwMDAgbiAKMDAwMDA2NjkyOSAwMDAwMCBuIAowMDAwMDY3OTg2IDAwMDAwIG4gCjAwMDAwNjc0MjAgMDAwMDAgbiAKMDAwMDA2NzI5NSAwMDAwMCBuIAowMDAwMDY3NjMxIDAwMDAwIG4gCjAwMDAwNjc1MTQgMDAwMDAgbiAKMDAwMDA2Nzg0MiAwMDAwMCBuIAowMDAwMDY3NzI1IDAwMDAwIG4gCjAwMDAwNjg3ODIgMDAwMDAgbiAKMDAwMDA2ODIxNiAwMDAwMCBuIAowMDAwMDY4MDkxIDAwMDAwIG4gCjAwMDAwNjg0MjcgMDAwMDAgbiAKMDAwMDA2ODMxMCAwMDAwMCBuIAowMDAwMDY4NjM4IDAwMDAwIG4gCjAwMDAwNjg1MjEgMDAwMDAgbiAKMDAwMDA2OTU3OCAwMDAwMCBuIAowMDAwMDY5MDEyIDAwMDAwIG4gCjAwMDAwNjg4ODcgMDAwMDAgbiAKMDAwMDA2OTIyMyAwMDAwMCBuIAowMDAwMDY5MTA2IDAwMDAwIG4gCjAwMDAwNjk0MzQgMDAwMDAgbiAKMDAwMDA2OTMxNyAwMDAwMCBuIAowMDAwMDcwMzc0IDAwMDAwIG4gCjAwMDAwNjk4MDggMDAwMDAgbiAKMDAwMDA2OTY4MyAwMDAwMCBuIAowMDAwMDcwMDE5IDAwMDAwIG4gCjAwMDAwNjk5MDIgMDAwMDAgbiAKMDAwMDA3MDIzMCAwMDAwMCBuIAowMDAwMDcwMTEzIDAwMDAwIG4gCjAwMDAwNzExNzAgMDAwMDAgbiAKMDAwMDA3MDYwNCAwMDAwMCBuIAowMDAwMDcwNDc5IDAwMDAwIG4gCjAwMDAwNzA4MTUgMDAwMDAgbiAKMDAwMDA3MDY5OCAwMDAwMCBuIAowMDAwMDcxMDI2IDAwMDAwIG4gCjAwMDAwNzA5MDkgMDAwMDAgbiAKMDAwMDA3MTk2NiAwMDAwMCBuIAowMDAwMDcxNDAwIDAwMDAwIG4gCjAwMDAwNzEyNzUgMDAwMDAgbiAKMDAwMDA3MTYxMSAwMDAwMCBuIAowMDAwMDcxNDk0IDAwMDAwIG4gCjAwMDAwNzE4MjIgMDAwMDAgbiAKMDAwMDA3MTcwNSAwMDAwMCBuIAowMDAwMDcyNzU0IDAwMDAwIG4gCjAwMDAwNzIxODggMDAwMDAgbiAKMDAwMDA3MjA3MSAwMDAwMCBuIAowMDAwMDcyMzk5IDAwMDAwIG4gCjAwMDAwNzIyODIgMDAwMDAgbiAKMDAwMDA3MjYxMCAwMDAwMCBuIAowMDAwMDcyNDkzIDAwMDAwIG4gCjAwMDAwNzM1NTAgMDAwMDAgbiAKMDAwMDA3Mjk4NCAwMDAwMCBuIAowMDAwMDcyODU5IDAwMDAwIG4gCjAwMDAwNzMxOTUgMDAwMDAgbiAKMDAwMDA3MzA3OCAwMDAwMCBuIAowMDAwMDczNDA2IDAwMDAwIG4gCjAwMDAwNzMyODkgMDAwMDAgbiAKMDAwMDA3NDM0NiAwMDAwMCBuIAowMDAwMDczNzgwIDAwMDAwIG4gCjAwMDAwNzM2NTUgMDAwMDAgbiAKMDAwMDA3Mzk5MSAwMDAwMCBuIAowMDAwMDczODc0IDAwMDAwIG4gCjAwMDAwNzQyMDIgMDAwMDAgbiAKMDAwMDA3NDA4NSAwMDAwMCBuIAowMDAwMDc1MTQ1IDAwMDAwIG4gCjAwMDAwNzQ1NzcgMDAwMDAgbiAKMDAwMDA3NDQ1MSAwMDAwMCBuIAowMDAwMDc0Nzg4IDAwMDAwIG4gCjAwMDAwNzQ2NzEgMDAwMDAgbiAKMDAwMDA3NTAwMCAwMDAwMCBuIAowMDAwMDc0ODgzIDAwMDAwIG4gCjAwMDAwNzU5MzYgMDAwMDAgbiAKMDAwMDA3NTM2NyAwMDAwMCBuIAowMDAwMDc1MjUwIDAwMDAwIG4gCjAwMDAwNzU1NzkgMDAwMDAgbiAKMDAwMDA3NTQ2MiAwMDAwMCBuIAowMDAwMDc1NzkxIDAwMDAwIG4gCjAwMDAwNzU2NzQgMDAwMDAgbiAKMDAwMDA3NjUxMyAwMDAwMCBuIAowMDAwMDc2NjkzIDAwMDAwIG4gCjAwMDAwNzY4NzMgMDAwMDAgbiAKMDAwMDA3NzA1MyAwMDAwMCBuIAowMDAwMDc3MjMyIDAwMDAwIG4gCjAwMDAwNzczOTggMDAwMDAgbiAKMDAwMDA3NzMyMyAwMDAwMCBuIAowMDAwMDc3NTY3IDAwMDAwIG4gCjAwMDAwMDI4NjQgMDAwMDAgbiAKMDAwMDAyMTkzNCAwMDAwMCBuIAowMDAwMDc4NjgwIDAwMDAwIG4gCjAwMDAwMjE5NTggMDAwMDAgbiAKMDAwMDAyMjEzNyAwMDAwMCBuIAowMDAwMDIyNTc3IDAwMDAwIG4gCjAwMDAwMjM4MDMgMDAwMDAgbiAKMDAwMDAyNDEyNiAwMDAwMCBuIAowMDAwMDI1MTY2IDAwMDAwIG4gCjAwMDAwMjYyNDEgMDAwMDAgbiAKMDAwMDAyNzI5OCAwMDAwMCBuIAowMDAwMDI3NjU5IDAwMDAwIG4gCjAwMDAwMjg5NTUgMDAwMDAgbiAKMDAwMDAyOTUxMyAwMDAwMCBuIAowMDAwMDMwNjcwIDAwMDAwIG4gCjAwMDAwMzEyMjggMDAwMDAgbiAKMDAwMDAzMjQ2OSAwMDAwMCBuIAowMDAwMDMzMjc2IDAwMDAwIG4gCjAwMDAwMzM0OTcgMDAwMDAgbiAKMDAwMDAzNDU3NCAwMDAwMCBuIAowMDAwMDM2NDgzIDAwMDAwIG4gCjAwMDAwMzczNjEgMDAwMDAgbiAKMDAwMDAzNzY0MiAwMDAwMCBuIAowMDAwMDM5MTMyIDAwMDAwIG4gCjAwMDAwMzk2OTAgMDAwMDAgbiAKMDAwMDA0MDExMCAwMDAwMCBuIAowMDAwMDQwODE1IDAwMDAwIG4gCjAwMDAwNDA5NjkgMDAwMDAgbiAKMDAwMDA0MTI0MyAwMDAwMCBuIAowMDAwMDQyMzI2IDAwMDAwIG4gCjAwMDAwNDQyMTQgMDAwMDAgbiAKMDAwMDA0NDQ0NiAwMDAwMCBuIAowMDAwMDQ1NTQ2IDAwMDAwIG4gCjAwMDAwNDYxMjggMDAwMDAgbiAKMDAwMDA0NjE4NiAwMDAwMCBuIAowMDAwMDQ2NDA1IDAwMDAwIG4gCjAwMDAwNDY2MDcgMDAwMDAgbiAKMDAwMDA0NzcxNSAwMDAwMCBuIAowMDAwMDQ4MDQwIDAwMDAwIG4gCjAwMDAwNDg0ODggMDAwMDAgbiAKMDAwMDA0ODQ2NSAwMDAwMCBuIAowMDAwMDQ4NTQ1IDAwMDAwIG4gCjAwMDAwNDg1ODAgMDAwMDAgbiAKMDAwMDA0ODc1NSAwMDAwMCBuIAowMDAwMDQ4ODE0IDAwMDAwIG4gCjAwMDAwNDg5MjEgMDAwMDAgbiAKMDAwMDA3NzY1OCAwMDAwMCBuIAowMDAwMDUzOTczIDAwMDAwIG4gCjAwMDAwNTQwMjQgMDAwMDAgbiAKMDAwMDA1NDIzMSAwMDAwMCBuIAowMDAwMDU0MjgyIDAwMDAwIG4gCjAwMDAwNTQ0OTEgMDAwMDAgbiAKMDAwMDA1NDU0MiAwMDAwMCBuIAowMDAwMDU0Njg5IDAwMDAwIG4gCjAwMDAwNTQ5MDggMDAwMDAgbiAKMDAwMDA1NTExMyAwMDAwMCBuIAowMDAwMDU1MzE4IDAwMDAwIG4gCjAwMDAwNTU0NTkgMDAwMDAgbiAKMDAwMDA1NTY4MSAwMDAwMCBuIAowMDAwMDU1ODg2IDAwMDAwIG4gCjAwMDAwNTYwOTIgMDAwMDAgbiAKMDAwMDA1NjIzNCAwMDAwMCBuIAowMDAwMDU2NDU3IDAwMDAwIG4gCjAwMDAwNTY2NjMgMDAwMDAgbiAKMDAwMDA1Njg2OSAwMDAwMCBuIAowMDAwMDU3MDExIDAwMDAwIG4gCjAwMDAwNTcyMjYgMDAwMDAgbiAKMDAwMDA1NzQzMiAwMDAwMCBuIAowMDAwMDU3NjM4IDAwMDAwIG4gCjAwMDAwNTc3ODAgMDAwMDAgbiAKMDAwMDA1ODAwMyAwMDAwMCBuIAowMDAwMDU4MjA5IDAwMDAwIG4gCjAwMDAwNTg0MTUgMDAwMDAgbiAKMDAwMDA1ODU1NyAwMDAwMCBuIAowMDAwMDU4NzgwIDAwMDAwIG4gCjAwMDAwNTg5ODYgMDAwMDAgbiAKMDAwMDA1OTE5MiAwMDAwMCBuIAowMDAwMDU5MzM0IDAwMDAwIG4gCjAwMDAwNTk1NTcgMDAwMDAgbiAKMDAwMDA1OTc2MyAwMDAwMCBuIAowMDAwMDU5OTY5IDAwMDAwIG4gCjAwMDAwNjAxMTEgMDAwMDAgbiAKMDAwMDA2MDMzNCAwMDAwMCBuIAowMDAwMDYwNTQwIDAwMDAwIG4gCjAwMDAwNjA3NDYgMDAwMDAgbiAKMDAwMDA2MDg4OCAwMDAwMCBuIAowMDAwMDYxMTExIDAwMDAwIG4gCjAwMDAwNjEzMTcgMDAwMDAgbiAKMDAwMDA2MTUyMyAwMDAwMCBuIAowMDAwMDYxNjY1IDAwMDAwIG4gCjAwMDAwNjE4ODggMDAwMDAgbiAKMDAwMDA2MjA5NCAwMDAwMCBuIAowMDAwMDYyMzAwIDAwMDAwIG4gCjAwMDAwNjI0NDIgMDAwMDAgbiAKMDAwMDA2MjY2NSAwMDAwMCBuIAowMDAwMDYyODcxIDAwMDAwIG4gCjAwMDAwNjMwNzcgMDAwMDAgbiAKMDAwMDA2MzIxOSAwMDAwMCBuIAowMDAwMDYzNDQyIDAwMDAwIG4gCjAwMDAwNjM2NDggMDAwMDAgbiAKMDAwMDA2Mzg1NCAwMDAwMCBuIAowMDAwMDYzOTk2IDAwMDAwIG4gCjAwMDAwNjQyMTEgMDAwMDAgbiAKMDAwMDA2NDQxOCAwMDAwMCBuIAowMDAwMDY0NjI3IDAwMDAwIG4gCjAwMDAwNjQ3NzEgMDAwMDAgbiAKMDAwMDA2NDk5NyAwMDAwMCBuIAowMDAwMDY1MjA4IDAwMDAwIG4gCjAwMDAwNjU0MTkgMDAwMDAgbiAKMDAwMDA2NTU2NCAwMDAwMCBuIAowMDAwMDY1Nzg1IDAwMDAwIG4gCjAwMDAwNjU5OTYgMDAwMDAgbiAKMDAwMDA2NjIwNyAwMDAwMCBuIAowMDAwMDY2MzUyIDAwMDAwIG4gCjAwMDAwNjY1NzMgMDAwMDAgbiAKMDAwMDA2Njc4NCAwMDAwMCBuIAowMDAwMDY2OTk1IDAwMDAwIG4gCjAwMDAwNjcxNDAgMDAwMDAgbiAKMDAwMDA2NzM2OSAwMDAwMCBuIAowMDAwMDY3NTgwIDAwMDAwIG4gCjAwMDAwNjc3OTEgMDAwMDAgbiAKMDAwMDA2NzkzNiAwMDAwMCBuIAowMDAwMDY4MTY1IDAwMDAwIG4gCjAwMDAwNjgzNzYgMDAwMDAgbiAKMDAwMDA2ODU4NyAwMDAwMCBuIAowMDAwMDY4NzMyIDAwMDAwIG4gCjAwMDAwNjg5NjEgMDAwMDAgbiAKMDAwMDA2OTE3MiAwMDAwMCBuIAowMDAwMDY5MzgzIDAwMDAwIG4gCjAwMDAwNjk1MjggMDAwMDAgbiAKMDAwMDA2OTc1NyAwMDAwMCBuIAowMDAwMDY5OTY4IDAwMDAwIG4gCjAwMDAwNzAxNzkgMDAwMDAgbiAKMDAwMDA3MDMyNCAwMDAwMCBuIAowMDAwMDcwNTUzIDAwMDAwIG4gCjAwMDAwNzA3NjQgMDAwMDAgbiAKMDAwMDA3MDk3NSAwMDAwMCBuIAowMDAwMDcxMTIwIDAwMDAwIG4gCjAwMDAwNzEzNDkgMDAwMDAgbiAKMDAwMDA3MTU2MCAwMDAwMCBuIAowMDAwMDcxNzcxIDAwMDAwIG4gCjAwMDAwNzE5MTYgMDAwMDAgbiAKMDAwMDA3MjEzNyAwMDAwMCBuIAowMDAwMDcyMzQ4IDAwMDAwIG4gCjAwMDAwNzI1NTkgMDAwMDAgbiAKMDAwMDA3MjcwNCAwMDAwMCBuIAowMDAwMDcyOTMzIDAwMDAwIG4gCjAwMDAwNzMxNDQgMDAwMDAgbiAKMDAwMDA3MzM1NSAwMDAwMCBuIAowMDAwMDczNTAwIDAwMDAwIG4gCjAwMDAwNzM3MjkgMDAwMDAgbiAKMDAwMDA3Mzk0MCAwMDAwMCBuIAowMDAwMDc0MTUxIDAwMDAwIG4gCjAwMDAwNzQyOTYgMDAwMDAgbiAKMDAwMDA3NDUyNiAwMDAwMCBuIAowMDAwMDc0NzM3IDAwMDAwIG4gCjAwMDAwNzQ5NDkgMDAwMDAgbiAKMDAwMDA3NTA5NSAwMDAwMCBuIAowMDAwMDc1MzE2IDAwMDAwIG4gCjAwMDAwNzU1MjggMDAwMDAgbiAKMDAwMDA3NTc0MCAwMDAwMCBuIAowMDAwMDc1ODg2IDAwMDAwIG4gCjAwMDAwNzYwNDEgMDAwMDAgbiAKMDAwMDA3NjQyNSAwMDAwMCBuIAowMDAwMDc2NjA0IDAwMDAwIG4gCjAwMDAwNzY3ODQgMDAwMDAgbiAKMDAwMDA3Njk2NCAwMDAwMCBuIAowMDAwMDc3MTQ0IDAwMDAwIG4gCjAwMDAwNzc0NzkgMDAwMDAgbiAKMDAwMDA3Nzc4OSAwMDAwMCBuIAowMDAwMDc4NzgyIDAwMDAwIG4gCjAwMDAwNzg5NjcgMDAwMDAgbiAKdHJhaWxlcgo8PC9TaXplIDM4MS9Sb290IDM3OSAwIFIKL0luZm8gMzgwIDAgUgovSUQgWyA8NEZERUU1ODA2MkM2NDlEQTFCNTZFMjJBNzY0MThGMzQ+Cjw0RkRFRTU4MDYyQzY0OURBMUI1NkUyMkE3NjQxOEYzND4gXQovRG9jQ2hlY2tzdW0gLzFGM0Y4OTREOTM0RTEwRUJDM0NERjRGQkI5ODlDRURECi9BZGRpdGlvbmFsU3RyZWFtcyBbL2FwcGxpY2F0aW9uIzJGdm5kIzJFb2FzaXMjMkVvcGVuZG9jdW1lbnQjMkVncmFwaGljcyAyMDkgMCBSCl0KPj4Kc3RhcnR4cmVmCjc5MTM1CiUlRU9GCg==",
      "pdfmeVersion": "4.0.0"
    };
    const inputs = [
      {
        "qrCode": data.qrCode,
        "brand": data.brand,
        "model": data.model,
        "color": data.color,
        "msrp": String(data.msrp),
        "freight": String(data.freight),
        "pdi": String(data.pdi),
        "admin": String(data.admin),
        "msrp copy 4": String(data.msrpcopy4),
        "msrp copy 5": String(data.msrpcopy5),
        "msrp copy 6": String(data.msrpcopy6),
        "weekly": data.weekly,
        "biweekly": data.biweekly,
        "monthly": data.monthly,
        "term": String(data.term),
        "iRate": String(data.iRate),
        "deposit": String(data.deposit),
        "tradeValue": String(data.tradeValue),
        "lien": String(data.lien),
        "total": String(data.total),
        "onTax": String(data.onTax),
        "firstName": data.firstName,
        "lastName": data.lastName,
        "phone": data.phone,
        "email": data.email,
        "address": data.address,
      }
    ];

    const plugins = { text, image, qrcode: barcodes.qrcode };

    console.log(inputs, data, template, 'inrecrip[t')

    const pdf = await generate({ template, plugins, inputs });

    // Node.js
    // fs.writeFileSync(path.join(__dirname, 'test.pdf'), pdf);

    // Browser
    //const blob = new Blob([pdf.buffer], { type: 'application/pdf' });
    // window.open(URL.createObjectURL(blob));
    if (typeof window !== "undefined") {
      // Running in the browser
      const blob = new Blob([pdf.buffer], { type: "application/pdf" });
      window.open(URL.createObjectURL(blob));
    } else {
      // Running in Node.js (server-side)
      fs.writeFileSync("test.pdf", pdf.buffer); // Save PDF to file
      console.log("PDF file generated successfully");
      // You can return a file path or other information if needed
      return "test.pdf";
    }
  }
  const runIt = RunIt()
  return runIt

  /**const designerRef = useRef<HTMLDivElement | null>(null);
  const designer = useRef<Designer | null>(null);
  const [templateData, setTemplate] = useState<Template | null>(null);
  const [userId, setUserId] = useState<string>('');
  let receiptTemplate
  switch (whichTemplate) {
    case 'Sales':
      receiptTemplate = salesQuote//lv6Template()//salesQuoteTemplate()
      break;
    case 'Parts':
      break;
    case 'Accessories':
      break;
    case 'Service':
      break;
  }
  console.log(inputs, receiptTemplate, whichTemplate, ' print receipt')

  useEffect(() => {
    let template: Template = receiptTemplate//bardCodeTemplate();
    setTemplate(template)
    try {
      const templateString = localStorage.getItem("template");
      const templateJson = templateString
        ? JSON.parse(templateString)
        : receiptTemplate//bardCodeTemplate();
      checkTemplate(templateJson);
      template = templateJson as Template;
    } catch {
      localStorage.removeItem("template");
    }

    getFontsData().then((font) => {
      if (designerRef.current) {
        designer.current = new Designer({
          domContainer: designerRef.current,
          template,
          options: { font },
          plugins: getPlugins(),
        });
        designer.current.onSaveTemplate(onSaveTemplate);
      }
    });
    return () => {
      if (designer.current) {
        designer.current.destroy();
      }
    };
  }, [designerRef]);

  const onSaveTemplate = async (template?: Template, financeId?: string) => {
    if (designer.current) {
      localStorage.setItem(
        "template",
        JSON.stringify(template || designer.current.getTemplate())
      );
      const templateData = template || designer.current.getTemplate();
      const templateName = window.prompt("Template Name") || "";
      const docName = templateName + financeId;
      const data = {
        userId: userId, // Assuming userId is defined in the scope
        doc: templateData,
        docName: docName,
        dept: "",
        fileName: templateName,
        category: "",
      };

      try {
        let url = window.location.href;
        let response;
        if (url === "http://localhost:3002/") {
          response = await fetch("http://localhost:5066/documents", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
        } else if (url === "https://third-kappa.vercel.app/") {
          response = await fetch("https://third-kappa.vercel.app/api/postDocuments", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
        }

        if (!response?.ok) {
          throw new Error(`HTTP error! status: ${response?.status}`);
        }
        console.log(data, 'data')
        const document = await response.json();
        console.log("Document saved:", document);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };


  async function GeneratePDFWInputs(
    inputs: any[],
    currentRef: Designer | Form | Viewer | null
  ) {
    if (!currentRef) {
      throw new Error('Invalid reference for PDF generation');
    }

    // Helper function to paginate the data
    const paginateData = (data: any[], itemsPerPage: number) => {
      const pages: any[][] = [];
      for (let i = 0; i < data.length; i += itemsPerPage) {
        pages.push(data.slice(i, i + itemsPerPage));
      }
      return pages;
    };

    // Number of entries per page
    const itemsPerPage = 30; // Adjust this number as needed

    const template = templateData
    const font = await getFontsData();

    try {
      const pages = paginateData(inputs, itemsPerPage);
      const pdfBuffers: Uint8Array[] = [];

      for (const pageData of pages) {
        const pdf = await generate({
          template,
          inputs: pageData,
          plugins: getPlugins(),
        });

        pdfBuffers.push(new Uint8Array(pdf.buffer));
      }

      // Combine all Uint8Arrays into one
      const combinedPdfBuffer = new Uint8Array(pdfBuffers.reduce((acc, buf) => acc.concat(Array.from(buf)), []));

      if (typeof window !== 'undefined') {
        // Browser environment
        const blob = new Blob([combinedPdfBuffer], { type: 'application/pdf' });
        window.open(URL.createObjectURL(blob));
      } else {
        // Node.js environment
        const fs = require('fs');
        fs.writeFileSync('test.pdf', Buffer.from(combinedPdfBuffer)); // Save PDF to file
        console.log('PDF file generated successfully');
        return 'test.pdf';
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      throw new Error('Failed to generate PDF');
    }
  }


  return (
    <div className=''>
      <p
        onClick={() => {
          GeneratePDFWInputs(inputs, templateData);
        }}>
        Print PDF
      </p>
    </div>
  );
  */
}
/**
 *       <header className='mb-3 items-center' style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginRight: 120, marginLeft: 50 }}>
      </header>
 *
 *     <div className="relative ml-2 mt-4">
          <Input id="file" type="file" className='hidden' name='file' onChange={handleFileChange} />
          <label htmlFor="file" className={`h-[37px] cursor-pointer border border-border rounded-md text-foreground bg-background px-4 py-2 inline-block w-[250px]
                    ${isFile2 === false ? 'border-primary' : 'border-[#3dff3d]'}`}  >
            <span className="mr-4">
              {isFile2 === false ? <p>Choose File</p> : <p>{selectedFile}</p>}
            </span>
          </label>
          <label className=" text-sm absolute left-3  rounded-full -top-3 px-2 bg-background transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-muted-foreground peer-focus:-top-3 peer-focus:text-muted-foreground">
            Change BasePDF
          </label>
        </div>
        <div className="relative ml-2 mt-4">
          <Input id="file" type="file" className='hidden' name='file' onChange={(e) => handleLoadTemplate(e, designer.current)} />
          <label htmlFor="file" className={`h-[37px] cursor-pointer border border-border rounded-md text-foreground bg-background px-4 py-2 inline-block w-[250px]
                    ${isFile === false ? 'border-primary' : 'border-[#3dff3d]'}`}  >
            <span className="mr-4">
              {isFile === false ? <p>Choose File</p> : <p>{selectedFile2}</p>}
            </span>
          </label>
          <label className=" text-sm absolute left-3  rounded-full -top-3 px-2 bg-background transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-muted-foreground peer-focus:-top-3 peer-focus:text-muted-foreground">
            Load Template
          </label>
        </div>
 *
 *         <Button
          className='mx-2' onClick={onDownloadTemplate}>
          Download Template
        </Button>
        <Button
          className='mx-2'
          onClick={() => onSaveTemplate(templates[0], financeId)}>
          Save Template
        </Button>
 *
 * <div ref={designerRef} style={{ width: '100%', height: `calc(100vh - ${headerHeight}px)` }} /> */
