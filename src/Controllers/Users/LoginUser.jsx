import PackageJSON from '../../../package.json'

async function LoginUser(email, password, setError) {
    var url = '';
    if(PackageJSON.API.DebugMode)
        url = PackageJSON.API.BaseURLDebug + PackageJSON.API.Login;
    else 
        url = PackageJSON.API.BaseURLProd + PackageJSON.API.Login;
    
    const model = {
        email: email,
        password: password
    }
    const modelJson = JSON.stringify(model);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: modelJson
        });

        const json = await response.json();

        if(response.status === 400 && json !== null && json.Error !== null) {
            setError(json.Error)
            return null;
        }
    
        if(!response.ok)
            return null;
    
        return json;
    }
    catch(e) {
        return [];
    }

}

export default LoginUser;