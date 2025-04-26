import PackageJSON from '../../../package.json'

async function GetCurrentUser(setError) {
    var url = '';
    if(PackageJSON.API.DebugMode)
        url = PackageJSON.API.BaseURLDebug + PackageJSON.API.currentUser;
    else 
        url = PackageJSON.API.BaseURLProd + PackageJSON.API.currentUser;

    const response = await fetch(url,  {
        method: "GET",
        credentials: 'include'
    })   

    const json = await response.json();

    if(response.status === 400 && json !== null && json.Error !== null) 
        setError(json.Error)

    if(!response.ok)
        return null;

    return json;
}

export default GetCurrentUser;