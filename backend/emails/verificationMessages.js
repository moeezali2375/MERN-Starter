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
  const baseUrl = `${req.protocol}://${req.get("host")}`;
  const verificationUrl = `${baseUrl}/email/verify/${user.newEmailToken}`;
  const body = `<p>Dear ${user.name},</p>
    <p>Please verify your email by clicking the link below:</p><a href="${verificationUrl}">${verificationUrl}</a>
    <p>This email change request will expire after 5 minutes.</p>
    <p>Please make sure this link gets open in the browser you are logged in.</p>
    <p>Best regards,<br>Moeez Ali</p>`;
  const message = {
    subject: "Email Change Verification",
    body: body,
  };
  return message;
};

const forgetPwdVerificationMessage = (user) => {
  const baseUrl = `${req.protocol}://${req.get("host")}`;
  const verificationUrl = `${baseUrl}/password/verify/${user.email}/${user.forgetPasswordToken}`;
  const body = `<p>Dear ${user.name},</p>
    <p>Please verify your request by clicking the link below:</p><a href="${verificationUrl}">Click Me.</a>
    <p>This request will expire after 5 minutes.</p>
    <p>Best regards,<br>Moeez Ali</p>`;
  const message = {
    subject: "Password Recovery",
    body: body,
  };
  return message;
};

module.exports = {
  emailVerificationMessage,
  changeEmailVerficationMessage,
  forgetPwdVerificationMessage,
};
