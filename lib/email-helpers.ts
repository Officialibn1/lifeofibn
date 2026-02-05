import transporter from "./nodemailer-config";
import { ProjectEnquiryForm } from "./schema/project-enquiry-form-schema";

export const sendNewserviceInquiryEmail = async ({
	name,
	email,
	phoneNumber,
	projectType,
	projectTimeLine,
	estimatedProjectBudget,
	projectDetails,
}: ProjectEnquiryForm) => {
	const body = `
    <!DOCTYPE html>
        <html>
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Service Request Received</title>
            <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #323d47; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa; }
            .container { background: #fff; border-radius: 8px; padding: 30px; box-shadow: 0 2px 10px rgba(50, 61, 71, 0.1); border: 1px solid #e9ecef; }
            .header { color: #323d47; font-size: 24px; font-weight: bold; margin-bottom: 20px; border-bottom: 3px solid #323d47; padding-bottom: 12px; }
            .field-label { font-weight: bold; color: #323d47; width: 120px; display: inline-block; }
            .field-value { color: #495057; margin-bottom: 12px; }
            .message-box { background: #f8f9fa; border-left: 4px solid #323d47; padding: 15px; margin: 15px 0; border-radius: 4px; }
            .footer { color: #6c757d; font-size: 14px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e9ecef; }
            .highlight { background: #e9ecef; padding: 15px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #323d47; }
            .action-box { background: #f8f9fa; padding: 20px; border-radius: 6px; margin: 25px 0; border: 1px solid #e9ecef; }
            .action-title { color: #323d47; font-weight: bold; margin-bottom: 10px; }
            .action-link { color: #323d47; text-decoration: none; font-weight: 500; }
            .action-link:hover { color: #212529; text-decoration: underline; }
            .icon { color: #323d47; margin-right: 8px; }
            </style>
        </head>

        <body>
            <div class="container">
                <div class="header">📋 New service Request Received</div>

                <div class="highlight">A new service inquiry has been submitted through your website. Here are the details:</div>


                <div class="field-value">
                    <span class="field-label">Name: </span>${name}
                </div>

                <div class="field-value">
                    <span class="field-label">Email: </span>
                    <a href="mailto:${email}" style="color: #323d47; text-decoration: none;">${email}</a>
                </div>

                <div class="field-value">
                    <span class="field-label">Phone: </span>
                    <a href="tel:${phoneNumber}" style="color: #323d47; text-decoration: none;">${phoneNumber}</a>
                </div>

                <div class="field-value">
                    <span class="field-label">Project Type: </span>
                    <a href="tel:${projectType}" style="color: #323d47; text-decoration: none;">${projectType}</a>
                </div>

                <div class="field-value">
                    <span class="field-label">Project Timeline: </span>
                    <a href="tel:${projectTimeLine}" style="color: #323d47; text-decoration: none;">${projectTimeLine}</a>
                </div>

                <div class="field-value">
                    <span class="field-label">Project Budget: </span>
                    <a href="tel:${estimatedProjectBudget}" style="color: #323d47; text-decoration: none;">${estimatedProjectBudget}</a>
                </div>


                ${
									projectDetails
										? `<div class="message-box">
                    <div style="font-weight: bold; color: #323d47; margin-bottom: 8px;">📝 Client Message:</div>
                    <div style="color: #495057; white-space: pre-line; line-height: 1.5;">${projectDetails}</div>
                </div>`
										: ""
								}


                <div class="action-box">
                    <div class="action-title">🚀 Quick Actions:</div>
                    <div style="margin-bottom: 8px;">
                        <span class="icon">✉️</span>
                        <a href="mailto:${email}" class="action-link">Reply via Email to ${name}</a>
                    </div>

                    <div>
                        <span class="icon">🏡</span>
                        <span>Project Type: <strong>${projectType}</strong></span>
                    </div>

                    <div>
                        <span class="icon">✉️</span>
                        <span>Project Timeline: <strong>${projectTimeLine}</strong></span>
                    </div>

                    <div>
                        <span class="icon">💵</span>
                        <span>Project Budget: <strong>${estimatedProjectBudget}</strong></span>
                    </div>
                </div>

                <div class="footer">
                    <p>This email was automatically generated from your website contact form.</p>
                    <p style="color: #868e96; font-size: 12px; margin-top: 10px;">
                        <strong>Submitted on:</strong> ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}
                    </p>
                </div>
            </div>
        </body>
        </html>`;

	const textVersion = `
  NEW service REQUEST RECEIVED\n\n

  A new service inquiry has been submitted through your website.\n\n

  Service: ${projectType}\n
  Name: ${name}\n
  Email: ${email}\n
  Phone: ${phoneNumber}\n
  Timeline: ${projectTimeLine}\n
  Budget: ${estimatedProjectBudget}\n
  ${projectDetails ? `Message: ${projectDetails}` : ""}\n

  ---
  This email was automatically generated from your website contact form.
  Sent on: ${new Date().toLocaleDateString()}
  `;

	const mailOptions = {
		secret: process.env.NODEMAILER_EMAIL as string,
		to: "officialibn001@gmail.com",
		subject: `New service request for ${projectType}`,
		text: textVersion,
		html: body,
	};

	await transporter.sendMail(mailOptions);
};
