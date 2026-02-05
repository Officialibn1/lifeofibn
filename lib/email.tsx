import nodemailer from "nodemailer"

interface ContactEmailData {
  fullName: string
  email: string
  officialEmail?: string
  phoneNumber: string
  projectType: string
  projectBudget?: string
  projectTimeline?: string
  message: string
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
})

export async function sendContactEmail(data: ContactEmailData) {
  const {
    fullName,
    email,
    officialEmail,
    phoneNumber,
    projectType,
    projectBudget,
    projectTimeline,
    message,
  } = data

  const emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">New Contact Form Submission</h2>
      
      <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>Full Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${officialEmail ? `<p><strong>Official Email:</strong> ${officialEmail}</p>` : ""}
        <p><strong>Phone Number:</strong> ${phoneNumber}</p>
        <p><strong>Project Type:</strong> ${projectType}</p>
        ${projectBudget ? `<p><strong>Project Budget:</strong> ${projectBudget}</p>` : ""}
        ${projectTimeline ? `<p><strong>Project Timeline:</strong> ${projectTimeline}</p>` : ""}
      </div>

      <h3 style="color: #333;">Project Description</h3>
      <p style="white-space: pre-wrap; color: #666;">${message}</p>

      <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
      <p style="color: #999; font-size: 12px;">
        This email was sent from your portfolio contact form.
      </p>
    </div>
  `

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: process.env.ADMIN_EMAIL || process.env.GMAIL_USER,
    replyTo: email,
    subject: `New Project Inquiry from ${fullName} - ${projectType}`,
    html: emailHtml,
  }

  return transporter.sendMail(mailOptions)
}
