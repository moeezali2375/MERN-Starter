const emailVerificationMessage = (user) => {
  const message = {
    subject: "Email Verification",
    body: `
            <p>Dear ${user.name},</p>
            <p>Thank you for signing up. Your verification code is: <strong>${user.verificationToken}</strong></p><p>Your registration will expire 5 minutes after signing up, if not verified.</p>
            <p>Best regards,<br>Moeez Ali</p>`,
  };
  return message;
};

const changeEmailVerficationMessage = (user) => {
  const verificationUrl = `${process.env.CLIENT}/email/verify/${user.newEmailToken}`;
  const body = `<p>Dear ${user.name},</p>
    <p>Please verify your email by clicking the link below:</p><a href="${verificationUrl}">${verificationUrl}</a>
    <p>This email change request will expire after 5 minutes.</p>
    <p>Please make sure this link gets open in the browser you are logged in.</p>
    <p>Best regards,<br>Moeez Ali</p>`;
  const message = {
    subject: "Email Change Request",
    body: body,
  };
  return message;
};

module.exports = {
  emailVerificationMessage,
  changeEmailVerficationMessage,
};
