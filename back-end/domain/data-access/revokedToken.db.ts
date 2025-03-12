import database from "../../util/database";

const revokeToken = async (token: string, reason: string): Promise<void> => {
  try {
    await database.revokedToken.create({
      data: {
        token,
        reason,
      },
    });
    console.log('Token successfully revoked');
  } catch (error) {
    console.error('Error revoking token', error);
  }
};

export default {
  revokeToken,
};
