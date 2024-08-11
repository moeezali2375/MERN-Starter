const cron = require("node-cron");
const User = require("../models/userModel");

cron.schedule("*/3 * * * *", async () => {
  console.log("Running a task every 3 minutes.");

  try {
    const now = new Date();

    //! Delete Unverified Users
    const unverifiedUsers = await User.find({
      verificationTokenExpires: { $lt: now },
    });

    if (unverifiedUsers.length > 0) {
      console.log(`Deleting ${unverifiedUsers.length} unverified users.`);
      const userIds = unverifiedUsers.map((u) => u._id);
      await User.deleteMany({ _id: { $in: userIds } });
    } else {
      console.log("No unverified users to delete.");
    }

    //! Delete Unverified Change Email Requests
    const unVerifiedChangeEmails = await User.find({
      newEmailExpires: { $lt: now },
    });

    if (unVerifiedChangeEmails.length > 0) {
      console.log(
        `Updating ${unVerifiedChangeEmails.length} uncompleted change email requests.`
      );
      for (const user of unVerifiedChangeEmails) {
        user.newEmail = undefined;
        user.newEmailExpires = undefined;
        user.newEmailToken = undefined;
        await user.save();
      }
    } else {
      console.log("No uncompleted change email requests to update.");
    }
  } catch (error) {
    console.error("Error in Cleanup Job:", error);
  }
});
