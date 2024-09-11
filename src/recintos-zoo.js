import { ObterDados } from './utils/obter-dados.js';
import { ValidarAnimal } from './validar-animal.js';

// import { ObterDados } from './utils/obter-dados';
// import { ValidarAnimal } from './validar-animal';

class RecintosZoo {

    analisaRecintos(animal, quantidade) {
        var res = {}

        const Recinto = ObterDados.pegarRecintos()

        const validar = new ValidarAnimal()

        if (quantidade < 1) {
            res.erro = "Quantidade inválida"
            return res
        }

        if (validar.animalEstaListado(animal)) {
            res.erro = "Animal inválido"
            return res
        }

        switch (animal) {
            case "LEAO":
                return validar.leao(quantidade);
            case "LEOPARDO":
                return validar.leopardo(quantidade);
            case "CROCODILO":
                return validar.crocodilo(quantidade);
            case "MACACO":
                return validar.macacos(quantidade);
            case "GAZELA":
                return validar.gazela(quantidade);
            case "HIPOPOTAMO":
                return validar.hipopotamo(quantidade);
        }
    }
}

export { RecintosZoo as RecintosZoo };
