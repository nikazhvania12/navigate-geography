import PackageJSON from '../../../package.json';

async function UpdateCountry(country, SetError) {
    var url = '';
    if(PackageJSON.API.DebugMode)
        url = PackageJSON.API.BaseURLDebug + PackageJSON.API.UpdateCountry;
    else 
        url = PackageJSON.API.BaseURLProd + PackageJSON.API.UpdateCountry;

    const jsonData = JSON.stringify(country);

    try {
        const resp = await fetch(url, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: jsonData
        })
    
        const jsonResp = await resp.json();
    
        if(resp.status === 400 && jsonResp !== null && jsonResp.Error !== null) {
            SetError(jsonResp.Error);
        }
    
        if(!resp.ok) 
            return false;
    
        return true;
    }
    catch(e) {
        return false;
    }
}

export default UpdateCountry;