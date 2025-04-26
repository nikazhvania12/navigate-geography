import PackageJSON from '../../../package.json'

async function LogoutUser() {
    var url = '';
    if(PackageJSON.API.DebugMode)
        url = PackageJSON.API.BaseURLDebug + PackageJSON.API.Logout;
    else 
        url = PackageJSON.API.BaseURLProd + PackageJSON.API.Logout;

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