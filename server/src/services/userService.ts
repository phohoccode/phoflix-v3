import connection from "../database/connect";

export const handleGetUserInfo = async (
  email: string,
  typeAccount: "credentials" | "google"
) => {
  try {
    const sqlGetUserInfo = `
      SELECT
        id, email, type_account, username, avatar, created_at, role, gender  
      FROM users 
      WHERE email = ? AND type_account = ?
    `;

    const [rows]: any = await connection.promise().query(sqlGetUserInfo, [
      email,
      typeAccount,
    ]);

    if ((rows as any)?.length === 0) {
      return {
        status: false,
        message: "Người dùng không tồn tại!",
        result: null,
      };
    }

    console.log(">>> rows", rows[0]);

    return {
      status: true,
      message: "Lấy thông tin người dùng thành công!",
      result: {
        id: rows[0]?.id,
        email: rows[0]?.email,
        typeAccount: rows[0]?.["type_account"],
        username: rows[0]?.username,
        avatar: rows[0]?.avatar,
        createdAt: rows[0]?.created_at,
        role: rows[0]?.role,
        gender: rows[0]?.gender,
      },
    };

  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "Lỗi server! Vui lòng thử lại sau.",
      result: null,
    };
  }
};
