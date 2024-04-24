export const userRoleBaseRidirect = (userRole) => {
  return new Promise((resolve, reject) => {
    let updateUserRole = "";
    switch (userRole) {
      case "ROLE_ADMIN":
        updateUserRole = "admin";
        break;
      case "ROLE_FINANCIAL_MANAGER":
        updateUserRole = "financial-manager";
        break;
      case "ROLE_LOGISTIC_HANDLER":
        updateUserRole = "logistic-handler";
        break;
      case "ROLE_INSTRUCTOR":
        updateUserRole = "instructor";
        break;
      case "ROLE_INVENTORY":
        updateUserRole = "inventory-manager";
        break;
      case "ROLE_SUPPORT":
        updateUserRole = "support-personnel";
        break;
      default:
        updateUserRole = "login";
    }
    resolve(updateUserRole);
  });
};
