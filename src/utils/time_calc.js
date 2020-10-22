//funcao que pega duas datas distintas e calcula da quantidade de dias entre elas
function getDaysDifference(lastDate, dateNow){
    //presume que as datas venham em formato de string e converte ambas para Date
    const lastDateTimeStamp = (new Date(lastDate)).getTime();
    const nowTimeStamp = (new Date(dateNow)).getTime();

    const microSecondsDiff = Math.abs(lastDateTimeStamp - nowTimeStamp );
    const daysDiff = Math.floor(microSecondsDiff/(1000 * 60 * 60  * 24));

    return daysDiff
}

module.exports = {
    getDaysDifference,
}