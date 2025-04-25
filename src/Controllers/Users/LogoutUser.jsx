import PackageJSON from '../../../package.json'

async function LogoutUser() {
    const url = PackageJSON.API.BaseURL + PackageJSON.API.Logout;

    try {
        const response = await fetch(url, {
            method: 'GET',
            credentials: 'include',
        });
            
        if (!response.ok) return [];

        return true;
    }
    catch(e) {
        return [];
    }

}

export default LogoutUser;