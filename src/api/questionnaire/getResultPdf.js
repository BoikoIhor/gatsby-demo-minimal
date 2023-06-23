import { jsPDF } from "jspdf";
const fs = require('fs');

export default async function handler(req, res) {
    try {
        let formId = null;
        if (!req.body) {
            res.status(200).json(JSON.stringify("Empty required parameters."));
        }

        if (!Object.keys(req.body.customerData).length) {
            res.status(403).json(JSON.stringify("Please, authorize first."));
        }

        if (!req.body.answers) {
            res.status(403).json(JSON.stringify("Please, set all answers."));
        }

        if (req.body.answers[0]) {
            formId = req.body.answers[0];
            delete req.body.answers[0];
        }

        let pdfResult = req.body.answers

        /* Use jsPDF lib */
        const doc = new jsPDF();
        doc.setFont("helvetica", "normal");
        doc.setFontSize(7);
        if (req.body.customerData) {
            /* Customer Section */
            doc.text("First Name: " + req.body.customerData.first_name, 5, 5);
            doc.text("Last Name: " + req.body.customerData.last_name, 5, 8);
            doc.text("Email: " + req.body.customerData.email, 5, 11);
        }

        doc.setFontSize(12);
        doc.text("Questions", 5, 20);
        doc.setFontSize(7);

        let ind = 0;
        pdfResult.map((result, index) => {
            console.log('result', result);
            ind = ind + 1;
            if (index === 0) {
                doc.setFont("helvetica", "bold");
                doc.text( index + 1 + ". " + result.questionTitle, 5, 22 + (index + 1) * 5);
                doc.setFont("helvetica", "normal");
                doc.setTextColor(255, 165, 0);
                doc.text( result.answer,9, 29 + (index + 1) * 5);
                doc.setTextColor(0, 0, 0);
            } else {
                doc.setFont("helvetica", "bold");
                doc.text( index + 1 + ". " + result.questionTitle, 5, 22 + (index + 1) * 9);
                doc.setFont("helvetica", "normal");
                doc.text( result.answer,9, 26 + (index + 1) * 9);
            }
            if (ind === 27) {
                doc.addPage();
                ind = 0;
            }
        });
        const filename = "jNahl5iE_200_1687389920846.pdf";
        const fileUrl = '/questionnaire/' + filename;

        // fs.writeFile("/questionnaire/jNahl5iE_200_1687389920846.pdf", doc.output());
            // if(err) {
            //     res.status(500).json(JSON.stringify(err));
            // } else {
                res.status(200).json({ "questionnaire_file_url": fileUrl });
            // }
        // };
    } catch (error) {
        res.status(500);
        res.json(JSON.stringify(error));
    }
}
