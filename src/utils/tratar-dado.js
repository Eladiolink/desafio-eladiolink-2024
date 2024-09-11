class TratarDado {
    static normalizarString(str) {
        if (typeof str !== 'string') {
            throw new TypeError('O parâmetro deve ser uma string.');
        }

        const strNormalizada = str.normalize('NFD');

        const strSemAcentos = strNormalizada.replace(/[\u0300-\u036f]/g, '');

        const strLimpa = strSemAcentos.replace(/[^a-zA-Z0-9\s]/g, '');

        return strLimpa.toUpperCase();
    }
}

export { TratarDado as TratarDado }