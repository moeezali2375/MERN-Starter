const emailVerificationNotification = (user) => {
  const message = {
    subject: "Email Verfied",
    body: `<p>Dear ${user.name},</p>
      <p>Your email is verified. You can now continue using the app.</p>
      <p>Best regards,<br>Moeez Ali</p>`,
  };
  return message;
};
const changeEmailVerificationNotification = (user) => {
  const message = {
    subject: "Email Changed",
    body: `<p>Dear ${user.name},</p>
      <p>Your email was changed from ${user.email} to ${user.newEmail}.</p>
      <p>Best regards,<br>Moeez Ali</p>`,
  };
  return message;
};

const changePasswordNotification = (user) => {
  const message = {
    subject: "Password Changed",
    body: `<p>Dear ${user.name},</p>
      <p>Your password was changed.</p>
          <p>Best regards,<br>Moeez Ali</p>`,
  };
  return message;
};

module.exports = {
  emailVerificationNotification,
  changeEmailVerificationNotification,
  changePasswordNotification,
};
