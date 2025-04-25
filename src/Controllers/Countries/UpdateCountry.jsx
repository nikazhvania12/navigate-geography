import PackageJSON from '../../../package.json';

async function UpdateCountry(country, SetError) {
    const url = PackageJSON.API.BaseURL + PackageJSON.API.UpdateCountry;
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