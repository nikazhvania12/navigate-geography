import PackageJSON from '../../../package.json'

async function GetCountriesFilter(SetError, name, waterSupplyFrom, resourcesFrom, populationFrom, waterSupplyTo, resourcesTo, populationTo) {

    const model = {
        name,
        waterSupplyFrom,
        resourcesFrom,
        populationFrom,
        waterSupplyTo,
        resourcesTo,
        populationTo
    }

    const json = JSON.stringify(model);
    const url = PackageJSON.API.BaseURL + PackageJSON.API.GetCountriesFilter;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: json
        })

        const jsonResp = await response.json();

        if(response.status === 400 && jsonResp !== null && jsonResp.Error !== null) {
            SetError(jsonResp.Error)
        }
    
        if(!response.ok) 
            return [];
    
        return jsonResp;
    }
    catch(e) {
        return [];
    }
}

export default GetCountriesFilter;