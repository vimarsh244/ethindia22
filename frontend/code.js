async function getTxs(chainId, address) {

    let u = 'https://nicerurl/api/ethIndia?id=' + chainId + '&address=' + address
    let response = await fetch(u)

    if (response.ok) { // if HTTP-status is 200-299
        var json = await response.json();
    } else {
        console.error("HTTP-Error: " + response.status);
    }

    console.log(json);

    $('#element-id-30-').text(json.noOfTxs); //number of transactions been done by the address
    $('#element-id-27-').text(json.gasFeeTotal); //spent on gas
    $('#element-id-28-').text(json.gasInUSD);
    $('#element-id-29-').text(json.gasFeeAvg);
    $('#element-id-31-').text(json.TxsFailed);
    $('#element-id-32-').text(json.gasForFailedTxs);
}

function main(chainIdSelected, address) {
    console.log('Getting transactions for this ' + address)
    // Detect chainId

    getTxs(chainIdSelected, address);
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });

    return vars;
}
