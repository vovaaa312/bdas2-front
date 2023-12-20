import {StorageUserData} from "../model/response/StorageUserData.tsx";


class LocalStorageService{

    getUserFromLocalStorage = (): StorageUserData | null => {
        const log = localStorage.getItem("login");
        const role = localStorage.getItem("roleName");
        const pacIdStr = localStorage.getItem("pacId");
        const zamIdStr = localStorage.getItem("zamId");
        const pacId = pacIdStr ? parseInt(pacIdStr) : 0;
        const zamId = zamIdStr ? parseInt(zamIdStr) : 0;

        if (log && role) {
            const userData: StorageUserData = {
                login: log,
                roleName: role,
                pacientId: pacId,
                zamestnanecId: zamId
            };

            return userData;
        }

        return null;
    };
}

export default new LocalStorageService();